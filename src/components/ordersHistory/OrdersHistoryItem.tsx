import Image from "next/image";
import OrdersHistoryProductItem from "@/components/ordersHistory/OrdersHistoryProductItem";

const OrdersHistoryItem = ({ order }) => {
    return (
        <div className="flex flex-col mt-5 shadow-xl rounded-2xl p-3">
            <h2 className="text-2xl font-bold">Заказ #{order.id}</h2>
            <p> Статус: <span>{order.status}</span></p>
            <div className="flex gap-8 mt-5">
                {
                    JSON.parse(order.items).map((item, i) => (
                        <OrdersHistoryProductItem key={i} productId={item.id}/>
                    ))
                }
            </div>
            <div className="mt-5 text-lg self-end"><span className="font-bold">Итого:</span> {order.totalAmount} рублей</div>
        </div>
    )
}
export default OrdersHistoryItem