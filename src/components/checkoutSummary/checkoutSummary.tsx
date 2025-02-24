import {ShoppingCart} from "lucide-react";
import {Button} from "@/components/ui/button";

type Props = {
    cart:
    {
        cartRedux: {
            totalAmount: number;
        }
    };
    SERVICE_FEE: number;
    DELIVERY_COST: number;
    disable: boolean;
}

const checkoutSummary = ({cart, SERVICE_FEE, DELIVERY_COST, disable} : Props) => {
    return (
        <div className="col-span-2 mt-9">
            <div className="w-full py-4 border-2 rounded-2xl min-h-[200px] mt-6">
                <div className="px-5 text-lg text-black">Итого:</div>
                <div className="px-5 font-bold text-3xl text-gray-black">
                    {cart.cartRedux.totalAmount || cart.cartRedux.totalAmount === 0 ? cart.cartRedux.totalAmount + (cart.cartRedux.totalAmount === 0 ? 0 : SERVICE_FEE) +" p." : "Загрузка.."}
                </div>
                <div className="w-full border-b-2 border-gray-200 mt-5"/>
                <div className="mx-5 mt-5">
                    <div className="flex justify-between mt-2">
                        <span className="flex gap-2 items-center"><ShoppingCart size={18}/>Стоимость корзины:</span>
                        <span className="flex-grow border-b-[1px] border-dashed mx-2"></span>
                        <span>{cart.cartRedux.totalAmount} p.</span>
                    </div>
                    <div className="flex justify-between mt-2">
                        <span className="flex gap-2 items-center"><ShoppingCart size={18}/>Сервисный сбор:</span>
                        <span className="flex-grow border-b-[1px] border-dashed mx-2"></span>
                        <span>{SERVICE_FEE} р.</span>
                    </div>
                    <div className="flex justify-between mt-2">
                        <span className="flex gap-2 items-center"><ShoppingCart size={18}/>Стоимость доставки:</span>
                        <span className="flex-grow border-b-[1px] border-dashed mx-2"></span>
                        <span>{DELIVERY_COST ? DELIVERY_COST + " р." : "FREE"}</span>
                    </div>
                </div>
                <div className="w-full border-b-2 border-gray-200 mt-5"/>
                <div className="px-5 mt-5">
                    <Button type="submit" className="w-full bg-primary text-white text-base py-6" disabled={!cart.cartRedux.totalAmount || cart.cartRedux.totalAmount === 0 || disable}>Перейти к
                        оплате</Button>
                </div>
            </div>
        </div>
    )
}
export default checkoutSummary;