'use server'

import {cookies} from "next/headers";
import {prisma} from "../../prisma/prisma-client";
import {OrderStatus, Prisma} from "@prisma/client";
import {sendEmail} from "@/lib/send-email";
import SuggestionEmailTemplate from "@/components/emailTeamplates/suggestionEmailTeamplate";
import {CryptoCloudSDK} from "@/lib/JS-CC-SDK";
import Freecurrencyapi from '@everapi/freecurrencyapi-js';
import {compare, hashSync} from "bcrypt";
import VerificationCodeTemplate from "@/components/emailTeamplates/verificationCodeTemplate";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";
import {redirect} from "next/navigation";
import Profile from "@/components/profile/Profile";


export async function createOrder(data){

    const cryptoCloud = new CryptoCloudSDK(process.env.CRYPTO_CLOUD_API_KEY)

    try {
        const token = (await cookies()).get("token")?.value;

        if (!token) {
            throw new Error("Unauthorized");
        }

        const cart = await prisma.cart.findFirst({
            where: {
                token: token
            },
            include: {
                cartItems: true
            },
        });


        if (!cart) {
            throw new Error("Cart not found");
        }

        if (cart?.totalAmount === 0) {
            throw new Error('Cart is empty');
        }

        const freecurrencyapi = new Freecurrencyapi('fca_live_lCLegJOu6QtdEHuMpjUYbgxAuMhTHsoxLGEsgZPR');
        const rate = await freecurrencyapi.latest({
            base_currency: 'RUB',
            currencies: 'USD'
        })

        const createInvoice = await cryptoCloud.createInvoice({amount: cart.totalAmount * rate.data.USD, shop_id: "bZlGXdFVDrBbdr5O"})
        console.log(createInvoice)


        const order = await prisma.order.create({
            data: {
                cartId: 1,
                totalAmount:cart.totalAmount,
                items: JSON.stringify(cart.cartItems),
                fulname: data.firstName + ' ' + data.lastName,
                address: data.address,
                email: data.email,
                comment: data.comment || "",
                status: OrderStatus.PENDING,
                paymentIntentId: createInvoice.result.uuid,
            }
        })


        await prisma.cartItem.deleteMany({
            where: {
                cartId: cart.id
            }
        });

        await prisma.cart.update({
            where: { id: cart.id },
            data: { totalAmount: 0 }
        });


        await sendEmail(SuggestionEmailTemplate(order, createInvoice.result.link), data.email, 'Оплатите ваш заказ');

        return createInvoice.result.link

    }catch (e){
        console.log('[CreateOrder] Server error', e);
    }
}


export async function registerUser(data){

    const user = await prisma.user.findFirst({
        where: {
            email: data.email,
        },
    });

    if (user) {
        return false;
    }

    const createdUser = await prisma.user.create({
        data: {
            fullname: data.name,
            email: data.email,
            password: hashSync(data.password, 10),
        },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
        data: {
            code,
            userId: createdUser.id,
        },
    });

    // await sendEmail(
    //     VerificationCodeTemplate({code}),
    //     createdUser.email,
    //     'Next Pizza / 📝 Подтверждение регистрации',
    // );

    return true;
}


export default async function changePassword(values){
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            throw new Error('Unauthorized');
        }

        const user = await prisma.user.findFirst({ where: { id: Number(session?.user.id) } });

        if (!user) {
            throw new Error('User not found');
        }

        const valid = await compare(values.oldPassword, user.password);
        if(valid){
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    password: hashSync(values.newPassword, 10),
                },
            });

            return true;
        } else {
            throw new Error('Invalid password');
        }
    } catch (e){
        console.log('[ChangePassword] Server error', e);
    }
}

