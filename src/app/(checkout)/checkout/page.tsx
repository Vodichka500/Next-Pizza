"use client"


import {useGetCartAPI} from "@/services/cartAPI";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCartRedux} from "@/components/cart/CartSlice";

import CheckoutSummary from "@/components/checkoutSummary/checkoutSummary";
import CheckoutForm from "@/components/checkoutForm/CheckoutForm";
import {useFormik} from "formik";
import yupValidationSchema from "@/components/checkoutForm/yupValidationSchema";
import {createOrder} from "@/app/actions";
import {RootState} from "@/store/store";


const SERVICE_FEE = 12 // ADD IT TO DB, WHEN YOU WILL HAVE FREE TIME
const DELIVERY_COST = 0 // ADD IT TO DB, WHEN YOU WILL HAVE FREE TIME

interface CartItem {
    id: number;
    // другие свойства
}

interface FormikValues {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    comment: string;
    time: string;
}

type CartItemItem = {
    id: number
    productVariation: {product: {imageUrl: string, name: string}, price: number}
    ingridients: {name: string; price: number}[]
    quantity: number
    price: number
}

type SortedCartItem = CartItemItem

const CheckoutPage = () => {

    const {getCart} = useGetCartAPI()
    const [updateCart, setUpdateCart] = useState(false)
    const dispatch = useDispatch()
    const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false)

    const cart = useSelector((state: RootState) => state.cartReduxReducer);
    const [sortedCartItems, setSortedCartItems] = useState<SortedCartItem[]>([]);
    useEffect(() => {
        try {setSortedCartItems([...cart.cartRedux.cartItems].sort((a: CartItem, b: CartItem) => a.id - b.id))}
        catch (e) {console.log(e)}
    }, [cart]);

    useEffect(() => {
        setUpdateCart(false)
        getCart()
            .then(res  =>  {
                if (res && res.data) {
                    dispatch(setCartRedux(res.data));
                } else {
                    console.error('Полученные данные пусты или undefined');
                }
            })
    }, [updateCart, dispatch]);



    const formik = useFormik<FormikValues>({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            address: '',
            comment: '',
            time: 'now'
        },
        validationSchema: yupValidationSchema,
        onSubmit: async (values) =>  {
            console.log(values)
            setSubmitButtonDisabled(true)
            await createOrder(values)
                .then(url => window.location.href = url || "/")
                .catch(e => console.log(e))
                .finally(() => setSubmitButtonDisabled(false))
        },
    });




    return (
        <form onSubmit={formik.handleSubmit} className="container mx-auto mt-10 grid grid-cols-5 gap-10 mb-20">
            <div className="col-span-3">
                <h1 className="text-3xl">Оформление заказа</h1>

                <CheckoutForm setUpdateCart={setUpdateCart} sortedCartItems={sortedCartItems} formik={formik}/>

            </div>

            <CheckoutSummary cart={cart} SERVICE_FEE={SERVICE_FEE} DELIVERY_COST={DELIVERY_COST} disable={submitButtonDisabled}/>
        </form>
    );
}



export default CheckoutPage