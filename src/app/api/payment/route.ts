import {NextRequest, NextResponse} from "next/server";
import {prisma} from "../../../../prisma/prisma-client";
import {OrderStatus, Prisma} from "@prisma/client";
import SuggestionEmailTemplate from "@/components/emailTeamplates/suggestionEmailTeamplate";
import {sendEmail} from "@/lib/send-email";
import SuccessEmailTemplate from "@/components/emailTeamplates/successEmailTemplate";
import CanceledEmailTemplate from "@/components/emailTeamplates/canceledEmailTemplate";

export async function POST(req: NextRequest){

    const rawBody = await req.text();
    const body = new URLSearchParams(rawBody);
    const bodyObject = Object.fromEntries(body.entries());

    console.log("Parsed body:", bodyObject);
    const invoice_id = "INV-" + bodyObject.invoice_id;
    const resStatus = bodyObject.status;

    let status
    if(resStatus !== "success"){
        status = OrderStatus.CANCELLED
    }else {
        status = OrderStatus.SUCCEDED
    }

    const order = await prisma.order.findFirst({
        where: {
            paymentIntentId: invoice_id
        }
    })

    if(!order){
        return NextResponse.json({error: "Order not found"});
    }


    const changeOrderStatus = await prisma.order.update({
        where: {
            id: order.id
        },
        data: {
            status: status
        }
    })

    if(resStatus === "success"){
        await sendEmail(SuccessEmailTemplate(order), order.email, 'Заказ оплачен');
    }else {
        await sendEmail(CanceledEmailTemplate(order), order.email, 'Заказ не оплачен');
    }


    return NextResponse.json(changeOrderStatus);
}
