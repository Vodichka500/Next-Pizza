import Image from "next/image";
import {RussianRuble} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useDispatch} from "react-redux";
import {usePostCartItemAPI} from "@/services/cartAPI";
import {useState} from "react";
import {setCartRedux} from "@/components/cart/CartSlice";
import Spinner from "@/components/spinner/Spinner";
import toast, {Toaster} from "react-hot-toast";
import {clearSelectedIngridients} from "@/components/chooseProductModal/chooseModalProductSlice";

const PageProductItem = ({product}) => {

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
        <div className="relative grid grid-cols-2 grid-rows-1 gap-x-4 mt-10">
            <div
                className="relative w-full flex justify-center items-center px-4 rounded-2xl bg-[#FFF7EE] left-shadow flex-col">
                <Image src={product?.imageUrl} alt={"Image of " + product?.name} width={1000} height={1000}
                       className="w-4/5"/>
            </div>
            <div className="relative px-4 flex flex-col  justify-center">
                <h2 className="text-3xl font-bold">{product?.name}</h2>
                <Button onClick={addProductToCart} disabled={addedToCart} className="max-w-sm  mt-6">
                    {
                        !loading && !error && !addedToCart && <>Добавить в корзину за {product?.productVariations[0].price}<RussianRuble/></> ||
                        loading && !error && <Spinner/> ||
                        error && !loading && "Произошла ошибка. Попробуйте позже" ||
                        addedToCart && "Добавлено в корзину"
                    }
                </Button>
            </div>
            <Toaster />
        </div>
    )
}
export default PageProductItem