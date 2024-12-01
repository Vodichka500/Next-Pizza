import {NextRequest, NextResponse} from "next/server";
import {prisma} from "../../../../../prisma/prisma-client";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams.get('query') || '';

    const product = await prisma.product.findUnique({
        where: {
            id: Number(query)
        },
        include: {
            ingridients: true,
            productVariations: true
        }
    })

    return NextResponse.json(product);
}