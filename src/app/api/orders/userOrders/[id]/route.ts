import {NextRequest, NextResponse} from "next/server";
import {prisma} from "../../../../../../prisma/prisma-client";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }>}) {
    const reqId = (await params).id
    const id = Number(reqId)

    const orders = await prisma.order.findMany({
        where: {
            userId: id
        }
    })

    if(!orders){
        return NextResponse.json({error: "Orders not found"})
    }

    return NextResponse.json(orders);
}