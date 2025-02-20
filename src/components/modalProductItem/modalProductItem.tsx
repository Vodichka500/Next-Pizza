import Image from "next/image";
import {Button} from "@/components/ui/button";
import {RussianRuble} from "lucide-react";
import {usePostCartItemAPI} from "@/services/cartAPI";
import {useState} from "react";

import {setCartRedux} from "@/components/cart/CartSlice";
import {useDispatch} from "react-redux";
import Spinner from "@/components/spinner/Spinner";
import toast from "react-hot-toast";
import {clearSelectedIngridients} from "@/components/chooseProductModal/chooseModalProductSlice";

const modalProductItem = ({product}) => {

    const dispatch = useDispatch()
    const {postCartItem, loading, error, clearError} = usePostCartItemAPI()
    const [addedToCart, setAddedToCart] = useState(false)

    const addProductToCart = () => {
        const data = {
            quantity: 1,
            productVariationId: product.productVariations[0].id
        }
        postCartItem(data)
            .then(response => {
                const {data} = response
                dispatch(setCartRedux(data))
                setAddedToCart(true)}
            )
            .then(() => toast.success("Добавлено в корзину"))
            .catch(e => {console.error(e);toast.error('Произошла ошибка. Попробуйте позже')})
            .finally(() => dispatch(clearSelectedIngridients()))
    }

    return (
        <div className="grid grid-cols-5  gap-4">
            <div className="col-span-3 flex justify-center items-center ">
                <Image src={product?.imageUrl} alt={"Image of " + product?.name} width={300} height={300}/>
            </div>
            <div
                className="col-span-2 col-start-4  relative px-4 rounded-2xl bg-[#F4F1EE] h-[400px] left-shadow flex items-center gap-y-3">
                <div>
                    <h2 className="text-2xl font-bold">{product?.name}</h2>
                    <Button onClick={addProductToCart} className="max-w-sm  mt-6" disabled={addedToCart}>
                        {
                            !loading && !error && !addedToCart && <>Добавить в корзину за {product?.productVariations[0].price}<RussianRuble/></> ||
                            loading && !error && <Spinner/> ||
                            error && !loading && "Произошла ошибка. Попробуйте позже" ||
                            addedToCart && "Добавлено в корзину"
                        }
                    </Button>
                </div>

            </div>

        </div>
    )
}

export default modalProductItem