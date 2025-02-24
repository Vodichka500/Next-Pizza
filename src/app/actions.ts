'use server'

import {cookies} from "next/headers";
import {prisma} from "../../prisma/prisma-client";
import {OrderStatus} from "@prisma/client";
import {sendEmail} from "@/lib/send-email";
import SuggestionEmailTemplate from "@/components/emailTeamplates/suggestionEmailTeamplate";
import {CryptoCloudSDK} from "@/lib/JS-CC-SDK";
//import Freecurrencyapi from '@everapi/freecurrencyapi-js';
import {compare, hashSync} from "bcrypt";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";
import {randomUUID} from "node:crypto";


interface OrderData {
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    comment?: string;
}
export async function createOrder(data : OrderData){

    const cryptoCloud = new CryptoCloudSDK(process.env.CRYPTO_CLOUD_API_KEY)
    console.log(cryptoCloud)

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

        // const freecurrencyapi = new Freecurrencyapi('fca_live_lCLegJOu6QtdEHuMpjUYbgxAuMhTHsoxLGEsgZPR');
        // const rate = await freecurrencyapi.latest({
        //     base_currency: 'RUB',
        //     currencies: 'USD'
        // })
        // console.log(rate.data.USD)
        //const createInvoice = await cryptoCloud.createInvoice({amount: cart.totalAmount * rate.data.USD, shop_id: "bZlGXdFVDrBbdr5O"})
        //console.log(createInvoice)


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
                paymentIntentId: randomUUID() //createInvoice.result.uuid,
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


        await sendEmail(SuggestionEmailTemplate(order, `/replaceingPaymentService?invoice_id=${order.paymentIntentId}`/* createInvoice.result.link */), data.email, 'Оплатите ваш заказ');

        return `/replaceingPaymentService?invoice_id=${order.paymentIntentId}` //createInvoice.result.link

    }catch (e){
        console.log('[CreateOrder] Server error', e);
    }
}

interface userData {
    name: string;
    email: string;
    password: string;
}
export async function registerUser(data : userData){

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

interface changePasswordData {
    oldPassword: string;
    newPassword: string;
}
export default async function changePassword(values : changePasswordData){
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user || !session.user.id) {
            throw new Error('Unauthorized');
        }

        const user = await prisma.user.findFirst({ where: { id: Number(session.user.id) } });

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

