import {prisma} from "../../../../prisma/prisma-client";
import {NextResponse} from "next/server";

export async function GET(){
    const ingredients = await prisma.ingridient.findMany({});
    return NextResponse.json(ingredients);
}