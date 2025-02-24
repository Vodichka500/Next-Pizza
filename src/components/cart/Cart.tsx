'use client'

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {Button} from "@/components/ui/button";
import CartItem from "@/components/cartItem/CartItem";
import {ReactNode, useEffect, useState} from "react";
import {useGetCartAPI} from "@/services/cartAPI";
import {setCartRedux} from "@/components/cart/CartSlice";
import {useDispatch, useSelector} from "react-redux";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";
import type {RootState} from "../../store/store";

type CartItemItem = {
    id: number
    productVariation: {product: {imageUrl: string, name: string}, price: number}
    ingridients: {name: string; price: number}[]
    quantity: number
    price: number
}

type SortedCartItem = {
    id: number,
    productVariation: {
        product: {
            name: string,
            imageUrl: string
        },
        price: number
    },
    ingridients: Array<{name: string; price: number}>,
    quantity: number
    price: number
}


const Cart = ({children}: {children: ReactNode}) => {
    const {getCart} = useGetCartAPI()
    const [updateCart, setUpdateCart] = useState(false)
    const dispatch = useDispatch()
    const cart = (useSelector((state: RootState) => state.cartReduxReducer))
    const [sortedCartItems, setSortedCartItems] = useState<SortedCartItem[]>([])

    useEffect(() => {
        try {setSortedCartItems([...cart.cartRedux.cartItems].sort((a: {id : number}, b: {id : number}) => a.id - b.id))}
        catch (e) {console.log(e)}
    }, [cart]);

    useEffect(() => {
        setUpdateCart(false)
        getCart()
            .then(res => {if(res && res.data) dispatch(setCartRedux(res.data))})
    }, [updateCart, dispatch]);


    return (
        <Sheet>
            <SheetTrigger asChild >{children}</SheetTrigger>
            <SheetContent className="border-0 p-0 flex flex-col w-full justify-between bg-[#F4F1EE]">
                <div className="overflow-y-scroll">
                    <SheetHeader className="py-8 px-5">
                        <SheetTitle>Корзина</SheetTitle>
                        <SheetDescription>
                            Количество товаров в корзине: {(sortedCartItems?.length || sortedCartItems?.length === 0) ? sortedCartItems?.length  : "Loading..."}
                        </SheetDescription>
                    </SheetHeader>
                    {
                        sortedCartItems?.length > 0 ?
                        sortedCartItems?.map((item: CartItemItem, index) => (
                        <CartItem key={index}
                                  url={item.productVariation.product.imageUrl}
                                  id={item.id}
                                  productName={item.productVariation.product.name}
                                  ingridients={item.ingridients.map(ingridient => ingridient.name).join(", ")}
                                  quantity={item.quantity}
                                  price={item.productVariation.price * item.quantity}
                                  setUpdateCart={setUpdateCart}
                                  cartItem={item}
                        />
                        )) : (
                            <div className="w-full h-[500px] flex justify-center items-center">
                                <div className="flex flex-col">
                                    <div className="relative w-[200px] h-[200px]">
                                        <Image className="w-full h-full" src="/empty-pizza-box.png"
                                               alt="Empty pizza box" width={1080} height={1080}/>
                                    </div>
                                    <div>
                                        В твоей корзине пока нет товаров
                                    </div>
                                </div>
                            </div>
                            )
                    }


                </div>
                <SheetFooter className="w-full flex flex-col justify-start p-5 bg-white ">
                    <div className="flex justify-between">
                        <div className="mb-5 font-bold text-lg">Итого:</div>
                        <div className="h-5 w-full border-b-2 border-dotted border-gray-200 mx-2"></div>
                        <div className="">
                            {Math.round(cart.cartRedux?.totalAmount) + "р." || "Loading..."}
                        </div>
                    </div>
                    <SheetClose className="flex justify-center" asChild>
                        <Link href={"/checkout"} className={clsx("block w-full", sortedCartItems?.length === 0 && "pointer-events-none")}>
                            <Button className="min-h-12 w-full" disabled={sortedCartItems?.length === 0}>Оформить заказ</Button>
                        </Link>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default Cart