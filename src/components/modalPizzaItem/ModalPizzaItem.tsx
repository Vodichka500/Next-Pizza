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
import {usePostCartItemAPI} from "@/services/cartAPI";
import {setCartRedux} from "@/components/cart/CartSlice";
import toast from "react-hot-toast";
import {AppDispatch} from "@/store/store";

type Variation = {
    size: number,
    pizzaType: number
}


const ModalPizzaItem = ({loadingIngridients, errorIngridients} : {loadingIngridients: boolean, errorIngridients: boolean}) => {

    const {
        ingridients,
        product,
        doesNotExistMessage,
        selectedIngridients,
        selectedDough,
        selectedSize,
        price
    } = useChooseModalProduct()

    const productSizes = [20, 30, 40];
    const productDough = [1, 2];

    const dispatch = useDispatch<AppDispatch>()



    useEffect(() => {
        adjustSelection(null, null, true);
    }, []);

    const adjustSelection = (size: number | null, dough: number | null, firstOpen?: boolean) => {

        // Проверяем доступность текущего выбора
        const isValid = product && product.productVariations && product.productVariations.some((variation: Variation) =>
            variation.size === size && variation.pizzaType === dough)

        console.log("Size: ", size, "Dough: ", dough, "SelectedSize: ", selectedSize, "SelectedDough: ", selectedDough, "isValid: ", isValid)
        if (!isValid) {
            if (!firstOpen && selectedSize && selectedDough) {
                dispatch(triggerMessage())
            }
            // Ищем альтернативы для выбранного размера
            const alternativesForSize = product && product.productVariations && product.productVariations.filter((variation: Variation)  =>
                variation.size === size
            );

            if (alternativesForSize && alternativesForSize.length > 0) {
                // Переключаем тесто на первый доступный вариант
                dispatch(setSelectedDough(alternativesForSize[0].pizzaType))
            } else {
                // Переключаемся на первый доступный вариант
                const firstAvailable = product && product.productVariations && product.productVariations[0];
                console.log(firstAvailable)
                if(firstAvailable && firstAvailable.size) dispatch(setSelectedSize(firstAvailable.size))
                if(firstAvailable && firstAvailable.pizzaType) dispatch(setSelectedDough(firstAvailable.pizzaType))

            }
        }
    };


    const handleSizeChange = (size: number | null) => {
        dispatch(setSelectedSize(size))
        adjustSelection(size, selectedDough);
    };

    const handleDoughChange = (dough: number | null) => {
        dispatch(setSelectedDough(dough))
        adjustSelection(selectedSize, dough);
    };

    useEffect(() => {
        dispatch(setPrice(""))
    }, [selectedIngridients, selectedSize, selectedDough]);

    const {postCartItem, loading, error} = usePostCartItemAPI()
    const [addedToCart, setAddedToCart] = useState(false)
    const addToCart = () => {
        const data = {
            productVariationId: product?.productVariations.find((variation: {size: number, pizzaType: number} )=>
                variation.size === selectedSize && variation.pizzaType === selectedDough
            )?.id,
            ingridients: selectedIngridients.map((ingridient: {id: number | string}) => {return {id: ingridient.id}}),
            quantity: 1
        }
        postCartItem(data)
            .then(response => {
                if(response && response.data) dispatch(setCartRedux(response.data))
                setAddedToCart(true)}
            )
            .then(() => toast.success("Добавлено в корзину"))
            .catch(e => {console.error(e);toast.error('Произошла ошибка. Попробуйте позже')})
            .finally(() => dispatch(clearSelectedIngridients("")))
    }

    return (
        <div className="grid grid-cols-2 grid-rows-1 gap-x-4 ">
            <div className="relative w-full flex justify-center items-center">
                {product && product.name && product.imageUrl && <Image src={product.imageUrl} alt={"Image of " + product.name} width={300} height={300}/>}
            </div>
            <div
                className="relative px-4 rounded-2xl bg-[#F4F1EE]  left-shadow flex flex-col justify-center gap-y-3 py-10">
                <h2 className="text-2xl font-bold">{product?.name}</h2>
                <div><b>Размер:</b> {selectedSize}cm, <b>Тесто:</b> {selectedDough === 1 ? "тонкое" : "толстое"}</div>
                <div><b>Ингридиенты:</b> {product?.ingridients.map((item: {name: string} ) => item.name).join(", ")}</div>
                <ul
                    className="flex justify-center bg-gray-200 rounded-2xl max-w-sm relative left-1/2 translate-x-[-50%] mt-3">
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
                <h3 className="text-lg font-bold">Добавить по вкусу:</h3>
                <div className="max-h-[300px] overflow-auto ">
                    <div className="flex flex-wrap justify-center gap-4">
                        {
                            !loadingIngridients && !errorIngridients ?
                                ingridients.map((ingidient: {id: number, name: string, imageUrl: string, price: number}) => {
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
                <Button className="max-w-sm relative left-1/2 translate-x-[-50%] mt-6" disabled={addedToCart} onClick={addToCart}>
                    {
                       !loading && !error && !addedToCart && <>Добавить в корзину за {price}<RussianRuble/></> ||
                        loading && !error && <Spinner colorHexCode="#FFFFFF"/> ||
                        error && !loading && "Произошла ошибка. Попробуйте позже" ||
                        addedToCart && "Добавлено в корзину"
                    }
                </Button>
            </div>
            <div
                className={clsx("absolute bottom-5 left-5 py-1 px-3 bg-red-300 rounded-2xl text-sm  delay-50 duration-300", doesNotExistMessage ? "opacity-100" : "opacity-0")}>
                <MessageSquareWarning className="inline"/> К сожалению невозможно выбрать этот вариант.
            </div>

        </div>
    )
}

export default ModalPizzaItem