'use client'

import WhiteCard from "@/components/whiteCard/WhiteCard";
import CheckoutCartItem from "@/components/checkoutCartItem/checkoutCartItem";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {useDeleteCartItemAPI} from "@/services/cartAPI";
import 'react-dadata/dist/react-dadata.css';
import {useDaData} from "@/hooks/useDadata";
import {useState} from "react";
import clsx from "clsx";


const CheckoutForm = ({setUpdateCart, sortedCartItems, formik}) => {

    const {getAddresses} = useDaData()
    const [suggestionAddresses, setSuggestionAddresses] = useState()
    const [open, setOpen] = useState(false);
    const handleAddressChange = async (e) => {
        getAddresses({query: e.target.value})
            .then(res => setSuggestionAddresses(res.data.suggestions))
            .catch(err => console.log(err))
    }

    const {deleteCartItem} = useDeleteCartItemAPI()
    const clearCart = (cartItems) => {
        cartItems.forEach( item => {
                deleteCartItem(item.id)
                    .then(() => setUpdateCart(true))
                    .catch(err => console.log(err))
            }
        )

    }
    const getDeliveryTimes = () => {
        const timeNow = new Date()
        const timeNowHours = timeNow.getHours()
        const deliveryTimes = []

        for (let i = timeNowHours+1; i < 24; i++) {
            deliveryTimes.push(i + ":00")
        }

        return deliveryTimes.map(time => {return {id: `time${time}` , value: time}})
    }

    return (
        <>
            <WhiteCard cardTitle={"1. Корзина"} showDeleteButton={true} clearCart={clearCart} cartItems={sortedCartItems}>
                {sortedCartItems.length > 0 ?
                    sortedCartItems.map((item, index) => (
                        <CheckoutCartItem key={index} cartItem={item} setUpdateCart={setUpdateCart}/>
                    ))
                    :
                    <div className="mt-12 text-center text-gray-400">Корзина пуста</div>
                }
            </WhiteCard>

            <WhiteCard cardTitle={"2. Персональная информация"}>
                <div className="grid grid-cols-2 gap-4 py-5">
                    <div className="flex flex-col gap-2 mt-2">
                        <Label htmlFor="firstName">Имя</Label>
                        <Input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="Введите ваше имя"
                            value={formik.values.firstName}
                            className={formik.touched.firstName && formik.errors.firstName ? "border-red-400" : ""}
                            formikProps={formik.getFieldProps('firstName')}/>
                        {formik.touched.firstName && formik.errors.firstName && <ErrorMessage message={formik.errors.firstName}/> }
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                        <Label htmlFor="lastName">Фамилия</Label>
                        <Input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Введите вашу фамилию"
                            value={formik.values.lastName}
                            className={formik.touched.lastName && formik.errors.lastName ? "border-red-400" : ""}
                            formikProps={formik.getFieldProps('lastName')}/>
                        {formik.touched.lastName && formik.errors.lastName && <ErrorMessage message={formik.errors.lastName}/> }
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input type="email"
                               id="email"
                               name="email"
                               placeholder="Введите ваш e-mail"
                               value={formik.values.email}
                               className={formik.touched.email && formik.errors.email ? "border-red-400" : ""}
                               formikProps={formik.getFieldProps('email')}/>
                        {formik.touched.email && formik.errors.email && <ErrorMessage message={formik.errors.email}/> }
                    </div>
                    <div className="flex flex-col gap-2 mt-2">
                        <Label htmlFor="phone">Телефон</Label>
                        <Input type="phone"
                               id="phone"
                               name="phone"
                               placeholder="Введите ваш номер телефона"
                               value={formik.values.phone}
                               className={formik.touched.phone && formik.errors.phone ? "border-red-400" : ""}
                               formikProps={formik.getFieldProps('phone')}/>
                        {formik.touched.phone && formik.errors.phone && <ErrorMessage message={formik.errors.phone}/> }
                    </div>
                </div>
            </WhiteCard>

            <WhiteCard cardTitle="3. Адрес доставки">
                <div className="grid grid-cols-2 gap-4 py-5">
                    <div className="relative flex flex-col gap-2 mt-2 col-span-2">
                        <Label htmlFor="address">Адрес</Label>
                        <Input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="Введите ваш адрес"
                            value={formik.values.address}
                            onChange={(e) => {formik.handleChange(e); handleAddressChange(e)}}
                            onClick={() => setOpen(true)}
                            onBlur={() => setTimeout(() => setOpen(false), 100)}
                            className={formik.touched.address && formik.errors.address ? "relative border-red-400" : ""}
                            formikProps={formik.getFieldProps('address')}
                        />
                            <div  className={clsx("absolute bottom-20 border-2 shadow-xl bg-white rounded-2xl p-4 flex flex-col-reverse ", !open && "hidden")}>
                                {
                                    formik.values.address.length === 0 && <div className="p-2">Начни вписывать адрес, чтобы увидеть подсказки</div>
                                }
                                {
                                    suggestionAddresses && formik.values.address.length > 0 && suggestionAddresses.map((item, index) => (
                                        <div key={index} className="cursor-pointer hover:bg-gray-100 p-2" onClick={() => {
                                            formik.values.address = item.value

                                        }}>{item.value}</div>
                                    ))
                                }
                                {
                                    suggestionAddresses && formik.values.address.length > 0 && suggestionAddresses.length === 0 && <div className="p-2">Ничего не найдено</div>
                                }

                            </div>


                        {formik.touched.address && formik.errors.address && <ErrorMessage message={formik.errors.address}/> }
                    </div>

                    <div className="flex flex-col gap-2 mt-2 col-span-2">
                        <Label htmlFor="comment">Комментарий</Label>
                        <Textarea
                            type="text"
                            id="comment"
                            name="comment"
                            placeholder="Введите ваш комментарий"
                            value={formik.values.comment}
                            className={formik.touched.comment && formik.errors.comment ? "border-red-400" : ""}
                            formikProps={formik.getFieldProps('comment')}/>
                        {formik.touched.comment && formik.errors.comment && <ErrorMessage message={formik.errors.comment}/> }
                    </div>

                    <div className="flex flex-col gap-2 mt-2 col-span-2">
                        <Label htmlFor="time">Время доставки</Label>
                        <select
                            name="time"
                            id="time"
                            defaultValue="now"
                            className="max-w-[200px]"
                            onChange={formik.handleChange}>
                            <option value="now">Сразу после заказа</option>
                            {
                                getDeliveryTimes().map(item => (
                                    <option value={item.value} key={item.id}>{item.value}</option>
                                ))
                            }
                        </select>
                    </div>

                </div>
            </WhiteCard>
        </>
    )
}

export default CheckoutForm;

const ErrorMessage = ({message}) => {
    return (
        <div className="text-sm text-red-400">{message}</div>
    )
}