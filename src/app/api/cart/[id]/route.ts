import {NextRequest, NextResponse} from "next/server";
import {prisma} from "../../../../../prisma/prisma-client";
import {updateCartTotalAmount} from "@/lib/update-cart-total-amount";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }>}) {
    const reqId = (await params).id
    const id = Number(reqId)
    console.log("id: ", id)
    const token = req.cookies.get('token')?.value

    if (!token) {
        return NextResponse.json({ error: 'Cart token not found' });
    }

    if (isNaN(id)) {
        return NextResponse.json({ error: 'Invalid cart ID' });
    }

    const cart = await prisma.cart.findFirst({
        where: {
            id,
        },
        include: {
            cartItems: true
        }
    });

    return NextResponse.json(cart);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }>}) {
    const reqId = (await params).id
    const id = Number(reqId)
    const data = (await req.json()) as {quantity: number}
    const token = req.cookies.get('token')?.value

    if (!token) {
        return NextResponse.json({ error: 'Cart token not found' });
    }

    const cartItem = await prisma.cart.findFirst({
        where: {
            id,
        },
    });

    if (!cartItem) {
        return NextResponse.json({ error: 'Cart item not found' });
    }

    await prisma.cartItem.update({
        where: {
            id,
        },
        data: {
            quantity: data.quantity,
        },
    });

    const updatedUserCart = await updateCartTotalAmount(token);
    return NextResponse.json(updatedUserCart);
}
