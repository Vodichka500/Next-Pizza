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
import {useEffect, useState} from "react";
import {useGetCartAPI} from "@/services/cartAPI";
import {setCartRedux} from "@/components/cart/CartSlice";
import {useDispatch, useSelector} from "react-redux";

const Cart = ({children}) => {
    const {getCart, loading, error} = useGetCartAPI()
    const [updateCart, setUpdateCart] = useState(false)
    const [cart, setCart] = useState({
        cartItems: []
    })
    const dispatch = useDispatch()

    useEffect(() => {
        setUpdateCart(false)
        getCart()
            .then(res => setCart(res.data))
    }, [updateCart]);

    useEffect(() => {
        if(cart.cartItems.length > 0){
            dispatch(setCartRedux(cart))
        }
    },[cart]);


    return (
        <Sheet>
            <SheetTrigger asChild >{children}</SheetTrigger>
            <SheetContent className="border-0 p-0 flex flex-col w-full justify-between bg-[#F4F1EE]">
                <div className="overflow-y-scroll">
                    <SheetHeader className="py-8 px-5">
                        <SheetTitle>Корзина</SheetTitle>
                        <SheetDescription>
                            Количество товаров в корзине: 2
                        </SheetDescription>
                    </SheetHeader>
                    {
                        cart?.cartItems.map((item, index) => (
                            <CartItem key={index}
                                      url={item.productVariation.product.imageUrl}
                                      id={item.id}
                                      productName={item.productVariation.product.name}
                                      ingridients={item?.ingridients.map(ingridient => ingridient.name).join(", ")}
                                      quantity={item.quantity}
                                      price={item.productVariation.price * item.quantity}
                                      setUpdateCart={setUpdateCart}
                                      cartItem={item}
                            />
                        ))
                    }


                </div>
                <SheetFooter className="w-full flex flex-col justify-start p-5 bg-white ">
                    <div className="flex justify-between">
                        <div className="mb-5 font-bold text-lg">Итого:</div>
                        <div className="h-5 w-full border-b-2 border-dotted border-gray-200 mx-2"></div>
                        <div className="">
                            {cart?.totalAmount || "Loading"}р.
                        </div>
                    </div>
                    <SheetClose className="" asChild>
                        <Button className="min-h-12" type="submit">Оформить заказ</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

export default Cart