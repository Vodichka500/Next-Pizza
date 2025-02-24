type Order = {
    id: number,
    fulname: string,
    totalAmount: number,
}

const SuccessEmailTemplate = (order: Order) => {
    return (
        <div>
            <h1 style={{fontSize: "18px"}}>Здравствуйте, {order.fulname}!</h1>
            <p>
                <br/>
                    Спасибо за заказ No.{order.id} на сумму {order.totalAmount} рублей.
                <br/>
                <br/>
                    Ваш заказ успешно оплачен.
                <br/>
                    Мы выполняем ваш заказ и свяжемся с вами в ближайшее время.
            </p>
        </div>
    )
}
export default SuccessEmailTemplate