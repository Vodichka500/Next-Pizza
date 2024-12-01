'use client'

import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,} from "@/components/ui/dialog"
import {useRouter} from "next/navigation";
import {useProductAPI} from "@/services/productsAPI";
import {useEffect, useState} from "react";
import Image from "next/image";
import Spinner from "@/components/spinner/Spinner";
import clsx from "clsx";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import {Button} from "@/components/ui/button";
import {MessageSquareWarning, RussianRuble} from "lucide-react";
import useIngridientsAPI from "@/services/ingridientsAPI";

const ChooseProductModal = ({id, className}) => {

    const router = useRouter();
    const {getProductById, loading, error} = useProductAPI();
    const {getAllIngridients, loading:loadingIngridients , error:errorIngridients} = useIngridientsAPI();

    const [product, setProduct] = useState();
    const [ingidients, setIngidients] = useState();

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedDough, setSelectedDough] = useState(null);
    const [errorMessage, setErrorMesage] = useState(false);
    const [selectedIngridients, setSelecredIngridients] = useState(new Set());
    const [price, setPrice] = useState(null);


    useEffect(() => {
        getProductById(id)
            .then(res => setProduct(res.data))
        getAllIngridients()
            .then(res => setIngidients(res.data))
    }, []);

    const doesNotExist= () => {
        setErrorMesage(true);
        setTimeout(()=>{setErrorMesage(false)}, 2000)
    }

    const adjustSelection = (size, dough) => {
        // Проверяем доступность текущего выбора
        const isValid = product?.productVariations.some(variation =>
            variation.size === size && variation.pizzaType === dough
        );

        if (!isValid) {
            (selectedSize && selectedDough) ? doesNotExist() : null;
            // Ищем альтернативы для выбранного размера
            const alternativesForSize = product?.productVariations.filter(variation =>
                variation.size === size
            );

            if (alternativesForSize?.length > 0) {
                // Переключаем тесто на первый доступный вариант
                setSelectedDough(alternativesForSize[0].pizzaType);
            } else {
                // Переключаемся на первый доступный вариант
                const firstAvailable = product?.productVariations[0];
                setSelectedSize(firstAvailable.size);
                setSelectedDough(firstAvailable.pizzaType);
            }
        }
    };

    const handleSizeChange = (size) => {
        setSelectedSize(size);
        adjustSelection(size, selectedDough);
    };

    const handleDoughChange = (dough) => {
        setSelectedDough(dough);
        adjustSelection(selectedSize, dough);
    };

    const toogleIngridient = (id) => {
        if(selectedIngridients.has(id)){
            setSelecredIngridients((prevState) => {
                const newSet = new Set(prevState)
                newSet.delete(id)
                return newSet
            })
        }else{
            setSelecredIngridients((prevState) => {
                const newSet = new Set(prevState)
                newSet.add(id)
                return newSet
            })
        }
    }

    useEffect(() => {
        setPrice(() => {

            const variationPrice = product?.productVariations.find(variation =>
                variation.size === selectedSize && variation.pizzaType === selectedDough
            )?.price;
            // const ingridientsPrice = selectedIngridients.map(id => {
            //     const ingredient = ingidients.find(ingidient => ingidient.id === id);
            //     return ingredient ? ingredient.price : 0; // Если не найдено, вернуть 0 или другое значение по умолчанию
            // });
            let ingridientsPrice = 0;
            for(const ingridient of selectedIngridients){
                console.log(ingridient)
                ingridientsPrice += ingridient.price
            }


            return variationPrice+ingridientsPrice
        })
    }, [selectedIngridients, selectedSize, selectedDough]);


    const setContent = (loading, error) => {
        if(loading && !error){
            return <Spinner/>
        }else if (!loading && error){
            return (<div>Error with loading product data [chooseProductModal.tsx]</div>)
        } else if (!loading && !error){
            if(product?.productVariations[0].pizzaType){
                const productSizes = [20,30,40];
                const productDough = [1,2];

                if(!selectedSize && !selectedDough){
                    adjustSelection(null, null);
                }
                return (
                    <div className="grid grid-cols-2 grid-rows-1 gap-x-4 ">
                        <div className="relative w-full flex justify-center items-center" >
                            <Image
                                   src={product?.imageUrl}
                                   alt={"Image of " + product?.name}
                                   width={300}
                                   height={300}/>
                        </div>
                        <div
                            className="relative px-4 rounded-2xl bg-[#F4F1EE]  left-shadow flex flex-col justify-center gap-y-3 py-10">
                            <h2 className="text-2xl font-bold">{product?.name}</h2>
                            <div><b>Размер:</b> {selectedSize}cm, <b>Тесто:</b> {selectedDough===1?"тонкое":"толстое"}</div>
                            <div><b>Ингридиенты:</b> {product?.ingridients.map(item => item.name).join(", ")}</div>
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
                                            ingidients.map(ingidient => {
                                                return (
                                                    <div key={ingidient.id}
                                                         className={clsx("w-[180px] p-2 bg-white rounded-xl max-w-28 cursor-pointer", selectedIngridients.has(ingidient) ? "border-primary border-2": "" )}
                                                         onClick={() => toogleIngridient(ingidient)}>
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
                            <Button className="max-w-sm relative left-1/2 translate-x-[-50%] mt-6">Добавить в корзину за {price}<RussianRuble/></Button>
                        </div>
                        <div
                            className={clsx("absolute bottom-5 left-5 py-1 px-3 bg-red-300 rounded-2xl text-sm  delay-50 duration-300", errorMessage ? "opacity-100" : "opacity-0")}>
                            <MessageSquareWarning className="inline"/> К сожалению невозможно выбрать этот вариант.
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="grid grid-cols-5  gap-4">
                        <div className="col-span-3 flex justify-center items-center ">
                            <Image src={product?.imageUrl} alt={"Image of " + product?.name} width={300} height={300}/>
                        </div>
                        <div className="col-span-2 col-start-4  relative px-4 rounded-2xl bg-[#F4F1EE] h-[400px] left-shadow flex items-center gap-y-3">
                            <div>
                                <h2 className="text-2xl font-bold">{product?.name}</h2>
                                <Button className="max-w-sm  mt-6">Добавить в корзину за {product?.productVariations[0].price} <RussianRuble/></Button>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }

    return (
        <Dialog open={Boolean(id)} onOpenChange={() => router.back()}>
            <DialogContent className="min-w-[1000px] p-0">
                <VisuallyHidden>
                    <DialogHeader>
                        <DialogTitle>PizzaChoise</DialogTitle>
                        <DialogDescription>PizzaChoise</DialogDescription>
                    </DialogHeader>
                </VisuallyHidden>
                {setContent(loading, error)}
            </DialogContent>
        </Dialog>
    );
}

export default ChooseProductModal