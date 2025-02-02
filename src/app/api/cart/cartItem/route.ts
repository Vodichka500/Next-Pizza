import {cookies} from "next/headers";
import {NextResponse} from "next/server";
import {prisma} from "../../../../../prisma/prisma-client";

export async function POST(req: Request){
    const token = (await cookies()).get("token")?.value

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" });
    }

    const cart = await prisma.cart.findFirst({ where: { token } });

    if (!cart) {
        return NextResponse.json({ error: "Cart not found" });
    }

    const {productVariationId, ingridients, quantity} = await req.json();
    const cartItem = await prisma.cartItem.create({
        data: {
            cartId: cart.id,
            productVariationId: productVariationId, // ID вариации продукта
            quantity: quantity,
            ingridients:{
                connect: ingridients // ID ингредиентов
            }
        },
        include: {
            ingridients: true,
        }
    })

    return NextResponse.json(cartItem);
}