const SuggestionEmailTemplate = (order, link) => {
    return (
        <div>
            <h1 style={{fontSize: "18px"}}>Здравствуйте, {order.fulname}!</h1>
            <p>
                <br/>
                Мы получили ваш заказ No.{order.id} на сумму {order.totalAmount} рублей.
                <br/>
                <br/>
                Пожалуйста, оплатите его по ссылке ниже:
                <br/>
                <br/>
                <a href={link}>{link}</a>
            </p>
        </div>
    )
}
export default SuggestionEmailTemplate