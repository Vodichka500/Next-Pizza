import {cookies} from "next/headers";
import {NextResponse} from "next/server";
import {prisma} from "../../../../../prisma/prisma-client";
import {updateCartTotalAmount} from "@/lib/update-cart-total-amount";
import {v4 as uuidv4} from "uuid";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/authOptions";

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

const findOrCreateCart = async (token: string) => {

    const cart = await prisma.cart.findFirst({ where: { token } });
    const session = await getServerSession(authOptions);

    let user = undefined
    if (session && session.user && session.user.id) {
        user = await prisma.user.findFirst({ where: { id: Number(session.user.id) } });
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

type Ingridient = {
    id: number;
    // другие поля, если нужно
}

type CartItem = {
    id: number;
    productVariationId: number;
    ingridients?: Ingridient[];
    // другие поля, если нужно
}

const isCartItemExist = async (cartItems: CartItem[], productVariationId: number, ingridients: Ingridient[] = []): Promise<string | undefined> => {
    let itemId: number | undefined = undefined;

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
                        return 0
                    }
                }
            }
        })
    }
    return itemId
}

export async function POST(req: Request){
    const token = await findOrCreateToken();
    if(!token){
        return NextResponse.json({error: "[API/CARTITEM/ROUTE.TS]: Token undefined. Line 96"})
    }
    const cart = await findOrCreateCart(token);

    if(!cart){
        return NextResponse.json({error: "[API/CARTITEM/ROUTE.TS]: Cart undefined. Line 99"})
    }

    const cartItems = await prisma.cartItem.findMany({where: {cartId: cart.id}, include: {ingridients: true}});

    const {productVariationId, ingridients, quantity} = await req.json();

    const existCartItemId= await isCartItemExist(cartItems, productVariationId, ingridients)

    if(existCartItemId){

        const existingCartItem = cartItems.find(item => item.id === Number(existCartItemId));

        if (!existingCartItem || !existingCartItem.id || existingCartItem.quantity){
            return NextResponse.json({error: "[API/CARTITEM/ROUTE.TS]: ExistingcartItem undefined. Line 116"})
        }

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

    await prisma.cartItem.create({
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