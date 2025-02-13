import {Trash2} from "lucide-react";


const WhiteCard = ({children, cardTitle, showDeleteButton = false, clearCart, cartItems}) => {
    return (
        <div className="w-full p-4 border-2 rounded-2xl min-h-[200px] mt-6">
            <div className="flex justify-between items-end border-b-2 pb-3">
                <h2 className="inline-block text-2xl">{cardTitle}</h2>
                {showDeleteButton && (cartItems.length > 0) &&
                    <div className="flex items-center gap-2 text-gray-600 text-sm cursor-pointer"
                         onClick={() => clearCart(cartItems)}>
                        <Trash2 size={18} />
                        Очистить корзину
                    </div>
                }
            </div>
            <div className="mt-3">
                {children}
            </div>
        </div>
    )
}
export default WhiteCard;