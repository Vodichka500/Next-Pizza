'use client'

import OrdersHistoryItem from "./OrdersHistoryItem";
import {useEffect, useState} from "react";


import {useAxiosGet} from "@/hooks/useAxios";

const OrdersHistory = ({user}) => {
    const [orders, setOrders] = useState([])
    const {request, loading, error, clearError } = useAxiosGet()

    useEffect(() => {
        request(`/api/orders/userOrders/${user.id}`, {})
            .then(res => {
                console.log(res.data)
                setOrders(res.data)
            })
            .catch(error => {
                console.log(error)
            })

    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold">Заказы</h1>
            {orders.length === 0 && <p>У вас пока нет заказов</p>}
            {orders.length > 0 && orders.map(order => (
                <OrdersHistoryItem key={order.id} order={order}/>
            ))}
        </div>
    )
}
export default OrdersHistory