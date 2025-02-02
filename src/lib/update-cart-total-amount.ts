import {prisma} from "../../prisma/prisma-client";
import {calcCartItemTotalPrice} from "@/lib/calc-item-total-price";

export async function updateCartTotalAmount(token) {
    const userCart = await prisma.cart.findFirst({
        where: {
            token,
        },
        include: {
            cartItems: {
                orderBy: {
                    createdAt: 'desc',
                },
                include: {
                    productVariation: true,
                    ingridients: true,
                },
            },
        },
    });


    if (!userCart) {
        return;
    }

    const totalAmount = userCart.cartItems.reduce((acc, item) => {
        return acc + calcCartItemTotalPrice(item);
    }, 0);

    return await prisma.cart.update({
        where: {
            id: userCart.id,
        },
        data: {
            totalAmount,
        },
    });
}