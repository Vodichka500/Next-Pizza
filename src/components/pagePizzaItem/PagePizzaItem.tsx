'use client'

import Image from "next/image";
import clsx from "clsx";
import {
    clearSelectedIngridients,
    setPrice,
    setSelectedDough,
    setSelectedIngridients,
    setSelectedSize, triggerMessage
} from "@/components/chooseProductModal/chooseModalProductSlice";
import {MessageSquareWarning, RussianRuble} from "lucide-react";
import Spinner from "@/components/spinner/Spinner";
import {Button} from "@/components/ui/button";
import {useChooseModalProduct} from "@/hooks/useChooseModalProduct";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setCartRedux} from "@/components/cart/CartSlice";
import {usePostCartItemAPI} from "@/services/cartAPI";
import toast from "react-hot-toast";



const PagePizzaItem = ({loadingIngridients, errorIngridients}) => {
    const {ingridients, product, doesNotExistMessage, selectedIngridients, selectedDough, selectedSize, price} = useChooseModalProduct()
    const productSizes = [20,30,40];
    const productDough = [1,2];

    const dispatch = useDispatch() // Не вынести случайно за пределы компонента

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

    useEffect(() => {
        adjustSelection(null, null)
    }, []);

    const adjustSelection = (size, dough) => {

        // Проверяем доступность текущего выбора
        const isValid = product?.productVariations.some(variation =>
            variation.size === size && variation.pizzaType === dough
        );

        if (!isValid) {
            if(selectedSize && selectedDough){
                dispatch(triggerMessage())
            }
            // Ищем альтернативы для выбранного размера
            const alternativesForSize = product?.productVariations.filter(variation =>
                variation.size === size
            );

            if (alternativesForSize?.length > 0) {
                // Переключаем тесто на первый доступный вариант
                dispatch(setSelectedDough(alternativesForSize[0].pizzaType))
            } else {
                // Переключаемся на первый доступный вариант
                const firstAvailable = product?.productVariations[0];
                console.log(firstAvailable)
                dispatch(setSelectedSize(firstAvailable.size))
                dispatch(setSelectedDough(firstAvailable.pizzaType))

            }
        }
    };


    const handleSizeChange = (size) => {
        dispatch(setSelectedSize(size))
        adjustSelection(size, selectedDough);
    };

    const handleDoughChange = (dough) => {
        dispatch(setSelectedDough(dough))
        adjustSelection(selectedSize, dough);
    };

    useEffect(() => {
        dispatch(setPrice())
    }, [selectedIngridients, selectedSize, selectedDough]);

    console.log(`Product ready? --> ${product.id}`)
    return (
        <div className="relative grid grid-cols-2 grid-rows-1 gap-x-4 mt-10">
            <div className="relative w-full flex justify-center items-center px-4 rounded-2xl bg-[#FFF7EE] left-shadow flex-col">
                <Image src={product?.imageUrl} alt={"Image of " + product?.name} width={1000} height={1000} className="w-4/5"/>
            </div>
            <div className="relative px-4 flex flex-col justify-center ">
                <h2 className="text-3xl font-bold">{product?.name}</h2>
                <div className="mt-3"><b>Размер:</b> {selectedSize}cm, <b>Тесто:</b> {selectedDough === 1 ? "тонкое" : "толстое"}</div>
                <div><b>Ингридиенты:</b> {product?.ingridients.map(item => item.name).join(", ")}</div>
                <ul
                    className="flex justify-center bg-gray-200 rounded-2xl max-w-sm relative left-1/2 translate-x-[-50%] mt-5">
                    {productSizes.map(size => (
                        <li key={size}
                            className={clsx("px-8 py-1 rounded-2xl cursor-pointer delay-50 duration-300", selectedSize === size ? "bg-white" : "")}
                            onClick={() => handleSizeChange(size)}>
                            {size} cm
                        </li>
                    ))}
                </ul>
                <ul
                    className="flex justify-center bg-gray-200 rounded-2xl max-w-sm relative left-1/2 translate-x-[-50%] mt-3">
                    {productDough.map(dough => (
                        <li key={dough}
                            className={clsx("px-8 py-1 rounded-2xl cursor-pointer delay-50 duration-300", selectedDough === dough ? "bg-white" : "")}
                            onClick={() => handleDoughChange(dough)}>
                            {dough === 1 ? "Тонкое" : "Пышное"}
                        </li>
                    ))}
                </ul>
                <h3 className="text-lg font-bold mt-5">Добавить по вкусу:</h3>
                <div className="max-h-[200px] overflow-auto ">
                    <div className="flex flex-wrap justify-center gap-4">
                        {
                            !loadingIngridients && !errorIngridients ?
                                ingridients.map(ingidient => {
                                    return (
                                        <div key={ingidient.id}
                                             className={clsx("w-[180px] p-2 bg-white rounded-xl max-w-28 cursor-pointer", selectedIngridients.includes(ingidient) ? "border-primary border-2" : "")}
                                             onClick={() => dispatch(setSelectedIngridients(ingidient))}>
                                            <Image src={ingidient.imageUrl}
                                                   alt={"Image of " + ingidient.name} width={110}
                                                   height={110}/>
                                            <b className="text-xs">{ingidient.name}</b>
                                            <div className="mt-2">{ingidient.price}<RussianRuble
                                                className="inline  max-w-[15px]"/></div>
                                        </div>
                                    )
                                }) : <Spinner/>
                        }
                    </div>
                </div>
                <Button onClick={addProductToCart} disabled={addedToCart}  className="max-w-sm relative left-1/2 translate-x-[-50%] mt-6">
                    {
                        !loading && !error && !addedToCart && <>Добавить в корзину за {price}<RussianRuble/></> ||
                        loading && !error && <Spinner/> ||
                        error && !loading && "Произошла ошибка. Попробуйте позже" ||
                        addedToCart && "Добавлено в корзину"
                    }
                </Button>
            </div>
            <div className={clsx("absolute bottom-5 left-5 py-1 px-3 bg-red-300 rounded-2xl text-sm  delay-50 duration-300", doesNotExistMessage ? "opacity-100" : "opacity-0")}>
                <MessageSquareWarning className="inline"/> К сожалению невозможно выбрать этот вариант.
            </div>

        </div>
    )
}

export default PagePizzaItem