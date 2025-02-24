import OrdersHistoryProductItem from "@/components/ordersHistory/OrdersHistoryProductItem";

interface Props {
    id: number | string,
    status: string,
    items: string
    totalAmount: number
}

const OrdersHistoryItem = ({ order } : {order: Props}) => {
    return (
        <div className="flex flex-col mt-5 shadow-xl rounded-2xl p-3">
            <h2 className="text-2xl font-bold">Заказ #{order.id}</h2>
            <p> Статус: <span>{order.status}</span></p>
            <div className="flex gap-8 mt-5">
                {
                    JSON.parse(order.items).map((item: {id: string | number}, i: number) => (
                        <OrdersHistoryProductItem key={i} productId={item.id}/>
                    ))
                }
            </div>
            <div className="mt-5 text-lg self-end"><span className="font-bold">Итого:</span> {order.totalAmount} рублей</div>
        </div>
    )
}
export default OrdersHistoryItem