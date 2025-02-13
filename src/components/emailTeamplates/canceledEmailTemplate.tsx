const SuccessEmailTemplate = (order) => {
    return (
        <div>
            <h1 style={{fontSize: "18px"}}>Здравствуйте, {order.fulname}!</h1>
            <p>
                <br/>
                    К сожалению ващ заказ No.{order.id} на сумму {order.totalAmount} рублей не был оплачен.
                <br/>
                <br/>
                    Пожалуйста, попробуйте снова.
                <br/>
                    Если у вас возникли вопросы, пожалуйста свяжитесь с нами.
            </p>
        </div>
    )
}
export default SuccessEmailTemplate