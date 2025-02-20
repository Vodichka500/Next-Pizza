import Link from "next/link";

const successfulPayment = () => {
  return (
      <div className="w-full flex flex-col gap-8 justify-center items-center py-8 mt-20">
          <h1 className="text-4xl font-bold">Спасибо за заказ!</h1>
          <div>
              <p className=" text-lg">Ваш заказ успешно оплачен.</p>
              <p className=" text-lg">Мы выполним и доставим ваш заказ в ближайшее время.</p>
          </div>
          <Link href="/" className="underline">На главную</Link>


      </div>
  );
}
export default successfulPayment