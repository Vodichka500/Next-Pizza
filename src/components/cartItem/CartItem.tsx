import Image from "next/image";
import {Button} from "@/components/ui/button";
import {useDeleteCartItemAPI, useGetCartAPI, usePatchCartItemAPI,} from "@/services/cartAPI";
import {calcCartItemTotalPrice} from "@/lib/calc-item-total-price";
import {Plus} from "lucide-react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import React, {useEffect} from "react";
import {setCartRedux} from "@/components/cart/CartSlice";
import {useDispatch} from "react-redux";
import Spinner from "@/components/spinner/Spinner";

type CartItem = {
    id: number;
    url: string;
    productName: string;
    ingridients: string;
    quantity: number;
    price: number;
    updateCart?: boolean;
    setUpdateCart: React.Dispatch<React.SetStateAction<boolean>>;
    cartItem: {
        id: number
        productVariation: { product: { imageUrl: string, name: string }, price: number }
        ingridients: { name: string; price: number; }[]
        quantity: number
        price: number
    };
};

const CartItem = ({id, url, productName, ingridients, quantity, updateCart, setUpdateCart, cartItem}: CartItem) => {
    const {getCart} = useGetCartAPI()
    const {patchCartItem} = usePatchCartItemAPI()
    const {deleteCartItem} = useDeleteCartItemAPI()
    const [loadingIncDec, setLoadingIncDec] = React.useState(false)
    const [deleteItemLoading, setDeleteItemLoading] = React.useState(false)


    const dispatch = useDispatch()

    useEffect(() => {
        setUpdateCart(false)
        getCart()
            .then(res => {
                if (res && res.data) dispatch(setCartRedux(res.data))
            })
    }, [updateCart, dispatch]);

    const increaseQuantity = () => {
        setLoadingIncDec(true)
        patchCartItem(id, {quantity: quantity + 1})
            .then(() => setUpdateCart(true))
            .catch(err => console.log(err))
            .finally(() => setLoadingIncDec(false))
        //setUpdateCart(true)
    }

    const decreaseQuantity = () => {
        if (quantity === 1) {
            return
        }
        setLoadingIncDec(true)
        patchCartItem(id, {quantity: quantity - 1})
            .then(() => setUpdateCart(true))
            .catch(err => console.log(err))
            .finally(() => setLoadingIncDec(false))
        //setUpdateCart(true)
    }

    const deleteItem = () => {
        setDeleteItemLoading(true)
        deleteCartItem(id)
            .then(() => setUpdateCart(true))
            .catch(err => console.log(err))
            .finally(() => setDeleteItemLoading(false))

    }

    return (
        <div className="relative w-full bg-white py-5 px-2 mb-3">
            <div className="grid grid-cols-5 grid-rows-1 gap-4">
                <div className="col-span-2 flex justify-center items-start">
                    <Image className="w-[80%]"
                           src={url}
                           alt="Pitsa" width={1080} height={1080}/>
                </div>
                <div className="col-span-3 col-start-3">
                    <div className="flex flex-col justify-between">
                        <div className="flex-col justify-start">
                            <div className="mb-2 text-lg font-bold">{productName}</div>
                            <div className="text-sm text-gray-400">{ingridients}</div>
                        </div>
                        <div className="w-full border-t-2 border-gray-200 flex justify-between mt-5 pt-4">
                            <div className="flex flex-row justify-start">
                                <Button variant="outline" className="text-lg text-primary "
                                        onClick={decreaseQuantity}>-</Button>
                                <div className="px-2 flex items-center">{loadingIncDec ?
                                    <Spinner colorHexCode="#000000"/> : quantity}</div>
                                <Button variant="outline" className="text-lg text-primary "
                                        onClick={increaseQuantity}>+</Button>
                            </div>
                            <div className="text-lg font-bold">{Math.round(calcCartItemTotalPrice(cartItem))}p.</div>
                        </div>
                    </div>
                </div>
            </div>
            {
                deleteItemLoading ? <div className="absolute top-1 right-2 cursor-pointer"><Spinner
                    colorHexCode="#000000"/></div> : null
            }
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    {
                        !deleteItemLoading ?
                        <div className="absolute top-1 right-2 cursor-pointer"><Plus
                            className="rotate-45" size={20}/></div> : null
                    }
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Вы уверены что хотите удалить этот продукт из корзины?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                        <AlertDialogAction onClick={deleteItem} className="bg-primary">Удалить из
                            корзины</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
export default CartItem