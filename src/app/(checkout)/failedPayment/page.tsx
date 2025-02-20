import Link from "next/link";

const failedPayment = () => {
    return (
        <div className="w-full flex flex-col gap-8 justify-center items-center py-8 mt-20">
            <h1 className="text-4xl font-bold">Произошла ошибка</h1>
            <div>
                <p className=" text-lg">К сожалению ваш заказ не был оплачен.</p>
                <p className=" text-lg">Пожалуйста, попробуйте снова.</p>
            </div>
            <Link href="/" className="underline">На главную</Link>
        </div>
    );
}
export default failedPayment