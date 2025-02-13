import {prisma} from "../../../../prisma/prisma-client";
import {NextResponse} from "next/server";
import {cookies} from "next/headers";
import {v4 as uuidv4} from "uuid";
export async function GET(){
    const token = (await cookies()).get("token")?.value

    if (!token) {
         return NextResponse.json({ error: "Unauthorized" });
    }

    const cart = await prisma.cart.findFirst({
        where: {
            token: token
        },
        include: {
            cartItems: {
                include: {
                    productVariation: {
                        include: {
                            product: true
                        }
                    },
                    ingridients: true
                }
            }
        }
    })

    return NextResponse.json(cart);
}

// export async function PATCH(req: Request) {
//     try {
//         const token = (await cookies()).get("token")?.value;
//         const { cartItems } = await req.json(); // Ожидаем, что клиент отправляет массив cartItems
//
//         if (!token) {
//             return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//         }
//
//         const cart = await prisma.cart.findFirst({ where: { token } });
//
//         if (!cart) {
//             return NextResponse.json({ error: "Cart not found" }, { status: 404 });
//         }
//
//         // Обновляем товары в корзине
//         await Promise.all(cartItems.map(async (item) => {
//             await prisma.cartItem.updateMany({
//                 where: { cartId: cart.id, productVariationId: item.productVariationId },
//                 data: { quantity: item.quantity }
//             });
//         }));
//
//         return NextResponse.json({ message: "Cart updated successfully" });
//     } catch (error) {
//         return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
//     }
// }


export async function PATCH(req: Request) {
    try {
        const token = (await cookies()).get("token")?.value;
        if (!token) {
            return NextResponse.json({ error: "Unauthorized" });
        }

        const { totalAmount } = await req.json();

        if (typeof totalAmount !== "number") {
            return NextResponse.json({ error: "Invalid totalAmount" });
        }

        const cart = await prisma.cart.findFirst({ where: { token } });

        if (!cart) {
            return NextResponse.json({ error: "Cart not found" });
        }

        const updatedCart = await prisma.cart.update({
            where: { id: cart.id },
            data: { totalAmount }
        });

        return NextResponse.json(updatedCart);
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error", details: error.message });
    }
}
