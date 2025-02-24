import {useDeleteCartItemAPI, usePatchCartItemAPI} from "@/services/cartAPI";
import Image from "next/image";
import {calcCartItemTotalPrice} from "@/lib/calc-item-total-price";
import {Button} from "@/components/ui/button";
import {CircleAlert, Trash2} from "lucide-react";
import Spinner from "@/components/spinner/Spinner";
import React from "react";

// type CartItem = {
//     id: number;
//     url: string;
//     productName: string;
//     ingridients: string;
//     quantity: number;
//     price: number;
//     updateCart?: boolean;
//     setUpdateCart: React.Dispatch<React.SetStateAction<boolean>>;
//     cartItem: {
//         id: number
//         productVariation: {product: {imageUrl: string, name: string}, price: number}
//         ingridients: {name: string}[]
//         quantity: number
//         price: number
//     };
// };

type CartItemItem = {
    id: number
    productVariation: {product: {imageUrl: string, name: string}, price: number}
    ingridients: {name: string; price: number}[]
    quantity: number
    price: number
}

const CheckoutCartItem = ({cartItem, setUpdateCart}: {cartItem: CartItemItem, setUpdateCart: (arg0:  boolean) => void}) => {
    const {patchCartItem} = usePatchCartItemAPI()
    const {deleteCartItem, loading: loadingDeleteItem, error: errorDeleteItem, clearError: clearDeleteItemError } = useDeleteCartItemAPI()

    const increaseQuantity = (id: number, quantity: number) => {
        patchCartItem(id, {quantity: quantity + 1})
            .then(res => console.log(res))
            .then(() => setUpdateCart(true))
            .catch(err => console.log(err))
        //setUpdateCart(true)
    }

    const decreaseQuantity = (id: number, quantity: number) => {
        if (quantity === 1) {
            return
        }

        patchCartItem(id, {quantity: quantity - 1})
            .then(res => console.log(res))
            .then(() => setUpdateCart(true))
            .catch(err => console.log(err))
        //setUpdateCart(true)
    }

    const deleteItem = (id: number) => {
        deleteCartItem(id)
            .then(res => console.log(res))
            .then(() => setUpdateCart(true))
            .catch(err => console.log(err))

    }

    return (
        <div className="grid grid-cols-9 justify-between items-center px-1 py-2.5">
            {
                cartItem &&
                <>
                    <div className="col-span-5 flex gap-4">
                        <div className="w-[70px] h-[70px]">
                            <Image
                                src={cartItem.productVariation.product.imageUrl}
                                className="w-full h-full"
                                alt="pizza"
                                width={1080}
                                height={1080}/>
                        </div>
                        <div className="flex-columns ">
                            <b>{cartItem.productVariation?.product.name}</b>
                            <div className="text-gray-600 text-sm max-w-xs">
                                {
                                    cartItem.ingridients.map(item => (item.name)).join(", ").length > 40 ?
                                        `${cartItem.ingridients.map(item => (item.name)).join(", ").slice(0, 40)}...` :
                                        cartItem.ingridients.map(item => (item.name)).join(", ")
                                }
                            </div>
                        </div>
                    </div>
                    <span className="flex justify-center">{Math.floor(calcCartItemTotalPrice(cartItem))+" p." || "Загрузка..."}</span>

                    <div className="col-span-2 flex flex-row justify-end">
                        <Button variant="outline" className="text-lg text-primary " onClick={() => decreaseQuantity(cartItem.id, cartItem.quantity)} >-</Button>
                        <div className="px-2 flex items-center">{cartItem.quantity}</div>
                        <Button variant="outline" className="text-lg text-primary " onClick={() => increaseQuantity(cartItem.id, cartItem.quantity)}>+</Button>
                    </div>

                    <div className="flex justify-center items-center text-gray-600">
                        {!loadingDeleteItem && !errorDeleteItem && <Trash2 size={20} onClick={() => deleteItem(cartItem.id)} className="cursor-pointer"/>}
                        {loadingDeleteItem && !errorDeleteItem && <Spinner/>}
                        {!loadingDeleteItem && errorDeleteItem && <CircleAlert size={20} onClick={() => clearDeleteItemError}/>}

                    </div>
                </>
            }
        </div>
    )
}

export default CheckoutCartItem