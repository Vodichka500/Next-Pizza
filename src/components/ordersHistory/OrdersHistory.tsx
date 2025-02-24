'use client'

import OrdersHistoryItem from "./OrdersHistoryItem";
import {useEffect, useState} from "react";


import {useAxiosGet} from "@/hooks/useAxios";


interface User {
    id: number | string,
    fullname: string,
    email: string,
    createdAt: Date
}
const OrdersHistory = ({user} : {user: User}) => {
    const [orders, setOrders] = useState([])
    const {request} = useAxiosGet()

    useEffect(() => {
        request(`/api/orders/userOrders/${user.id}`, {})
            .then(res => {
                if(res && res.data) setOrders(res.data)
            })
            .catch(error => {
                console.log(error)
            })

    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold">Заказы</h1>
            {orders.length === 0 && <p>У вас пока нет заказов</p>}
            {orders.length > 0 && orders.map((order: {id: number | string; status: string; items: string; totalAmount: number }) => (
                <OrdersHistoryItem key={order.id} order={order}/>
            ))}
        </div>
    )
}
export default OrdersHistory