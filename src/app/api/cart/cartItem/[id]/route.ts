import {NextRequest, NextResponse} from "next/server";
import {prisma} from "../../../../../../prisma/prisma-client";
import {updateCartTotalAmount} from "@/lib/update-cart-total-amount";

export async function GET(req: NextRequest, {params}){
    const {id} = await params
    const cartItemId = parseInt(id);
    const token = req.cookies.get('token')?.value

    if (!token) {
        return NextResponse.json({ error: 'Cart token not found' });
    }

    const cartItem = await prisma.cartItem.findFirst({
        where: {
            id: cartItemId,
        },
    });

    return NextResponse.json(cartItem);
}

export async function PATCH(req: NextRequest, {params}){
    const {id} = await params
    const cartItemId = parseInt(id);
    const data = (await req.json()) as {quantity: number}
    const token = req.cookies.get('token')?.value

    if (!token) {
        return NextResponse.json({ error: 'Cart token not found' });
    }

    const cartItem = await prisma.cartItem.findFirst({
        where: {
            id: cartItemId,
        },
    });

    if (!cartItem) {
        return NextResponse.json({ error: 'Cart item not found' });
    }

    const res = await prisma.cartItem.update({
        where: {
            id: cartItemId,
        },
        data: {
            quantity: data.quantity,
        },
    });

    const updatedUserCart = await updateCartTotalAmount(token);
    return NextResponse.json(updatedUserCart);
}

export async function DELETE(req: NextRequest, {params}){
    const {id} = await params
    const cartItemId = parseInt(id);

    const token = req.cookies.get('token')?.value

    if (!token) {
        return NextResponse.json({ error: 'Cart token not found' });
    }

    const cartItem = await prisma.cartItem.findFirst({
        where: {
            id: cartItemId,
        },
    });

    if (!cartItem) {
        return NextResponse.json({ error: 'Cart item not found' });
    }

    const res = await prisma.cartItem.delete({
        where: {
            id: cartItemId,
        },
    });

    const updatedUserCart = await updateCartTotalAmount(token);
    return NextResponse.json(updatedUserCart);
}