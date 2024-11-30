import {NextResponse} from "next/server";
import {prisma} from "../../../../../prisma/prisma-client";

export async function GET(){
    const products = await prisma.product.findMany({
        take: 5,
        include: {
            ingridients: true,
            productVariations: true
        },
    })

    return NextResponse.json(products);
}