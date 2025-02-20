import {cookies} from "next/headers";
import {NextResponse} from "next/server";
import {prisma} from "../../../../../prisma/prisma-client";
import {updateCartTotalAmount} from "@/lib/update-cart-total-amount";
import {v4 as uuidv4} from "uuid";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";
import {redirect} from "next/navigation";

const findOrCreateToken = async () => {
    const cookieStore = await cookies();

    const token = cookieStore.get("token")?.value;

    if (!token) {
        const newToken = uuidv4();
        await cookieStore.set("token", newToken, {path: "/"});
        const updatedToken = await cookieStore.get("token")?.value;
        return updatedToken
    }

    return token;
}

const findOrCreateCart = async (token) => {

    const cart = await prisma.cart.findFirst({ where: { token } });
    const session = await getServerSession(authOptions);

    let user = undefined
    if (session) {
        user = await prisma.user.findFirst({ where: { id: Number(session?.user.id) } });
    }

    if(!cart){
        if(user){
            await prisma.cart.create({
                data: {
                    token: token,
                    //userId: user.id
                }
            })
        }else {
            await prisma.cart.create({
                data: {
                    token: token
                }
            })
        }
        const newCart = await prisma.cart.findFirst({ where: { token } });
        return newCart
    }
    return cart
}

const isCartItemExist = async (cartItems, productVariationId, ingridients = []) => {
    let itemId = undefined

    if(cartItems.some(item => item.productVariationId === productVariationId)){
        cartItems.forEach(item => {
            if(item.productVariationId === productVariationId){

                const existProductVariationId = item.productVariationId;
                const existIngridients = item.ingridients?.map(ingridient => ingridient.id);
                const ingridientsIds = ingridients?.map(ingridient => ingridient.id) || [];

                console.log("Exist id: ", existProductVariationId, " Product id: ",productVariationId ," Exist ingridients: ", existIngridients, " Ingridients: ", ingridients)

                if(existIngridients?.length === ingridientsIds.length){

                    const isEqual = existIngridients.every(ingridientId => ingridientsIds.includes(ingridientId));
                    if(isEqual){
                        itemId = item.id
                        return
                    }
                }
            }
        })
    }
    return itemId
}

export async function POST(req: Request){
    const token = await findOrCreateToken();
    const cart = await findOrCreateCart(token);

    const cartItems = await prisma.cartItem.findMany({where: {cartId: cart.id}, include: {ingridients: true}});

    const {productVariationId, ingridients, quantity} = await req.json();

    const existCartItemId = await isCartItemExist(cartItems, productVariationId, ingridients)

    if(existCartItemId){

        const existingCartItem = cartItems.find(item => item.id === existCartItemId);

        await prisma.cartItem.update({
            where: {
                id: existingCartItem.id,
            },
            data: {
                quantity: existingCartItem.quantity + 1
            },
        });

        const updatedUserCart = await updateCartTotalAmount(token);
        return NextResponse.json(updatedUserCart);
    }

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

    const updatedUserCart = await updateCartTotalAmount(token);
    return NextResponse.json(updatedUserCart);
}