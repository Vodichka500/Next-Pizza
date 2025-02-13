'use server'

import {cookies} from "next/headers";
import {prisma} from "../../prisma/prisma-client";
import {OrderStatus, Prisma} from "@prisma/client";
import {sendEmail} from "@/lib/send-email";
import SuggestionEmailTemplate from "@/components/emailTeamplates/suggestionEmailTeamplate";
import {CryptoCloudSDK} from "@/lib/JS-CC-SDK";
import Freecurrencyapi from '@everapi/freecurrencyapi-js';


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


