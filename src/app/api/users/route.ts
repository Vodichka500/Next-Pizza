import {NextResponse} from "next/server";
import {prisma} from "../../../../prisma/prisma-client";
//table plus

export async function GET() {
    const users = await prisma.user.findMany()

    return NextResponse.json(users)
}
export function POST() {
    const user = await prisma.user.create({
        fullName: "Padla",
        email : "Bydlo",
        password: "Pablo"
    })

    return NextResponse.json(user)
}