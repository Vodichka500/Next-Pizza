'use client'

import CategoryBlock from "@/components/categoryBlock/CategoryBlock";
import {useSelector} from "react-redux";
import {selectAll} from "@/components/topBar/topBarSlice";
import SkeletonMenuSection from "@/components/menuSection/SkeletonMenuSection";
import {useEffect, useState} from "react";
import Image from "next/image";
import {RootState} from "@/store/store";

type Product = {
    id: number
    name: string
    imageUrl: string
    productVariations: {
        id: number,
        price: number,
        pizzaType?: number,
        size?: number
    }[]
    ingridients: {
        id: number,
        name: string
        price: number
    }[]
}
type Categories = {
    id: string,
    name: string,
    products?: Product[]
}[]



const MenuSection = () => {
    const categories = useSelector((state: RootState) => selectAll(state))
    const priceFrom = useSelector((state: RootState) => state.priceFilterReducer.currentFromPrice)
    const priceTo = useSelector((state: RootState) => state.priceFilterReducer.currentToPrice)

    const sortBy = useSelector((state: RootState) => state.priceFilterReducer.sortBy)

    const activeCriteria = useSelector((state: RootState) => state.filterSidebarReducer.activeCriteria)
    const activeIngridients = useSelector((state: RootState) => state.filterSidebarReducer.activeIngridients)
    const activeDough = useSelector((state: RootState) => state.filterSidebarReducer.activeDough)
    const activeSizes = useSelector((state: RootState) => state.filterSidebarReducer.activeSizes)

    const [sortedCategories, setSortedCategories] = useState(categories || [])


    const sortByPrice = (a: Product, b: Product) => {
        const priceA = a.productVariations[0].price;
        const priceB = b.productVariations[0].price;

        if (sortBy === "priceAsc") {
            return priceA - priceB;
        } else if (sortBy === "priceDesc") {
            return priceB - priceA;
        }
        return 0;
    };
    const applyFilters = (categories: Categories) => {
        const filteredCategory = categories
            .map(category => ({
                ...category,
                products: category.products ? category.products.filter(product =>{
                        const productPrice = product.productVariations[0].price;
                        // Фильтруем по priceFrom и priceTo, если они существуют
                        const priceCondition =
                            (priceFrom ? productPrice >= priceFrom : true) &&
                            (priceTo ? productPrice <= priceTo : true) &&
                            (activeCriteria ? true : true)

                        const criteriaCondition = activeCriteria ? true : true; //change it, after db will add this statement

                        const ingridientsCondition =
                            activeIngridients ? activeIngridients.every(ingredient =>
                            product.ingridients.map(ingridient => ingridient.name).includes(ingredient)
                        ) : true;

                        const doughCondition = activeDough ?
                            activeDough.every(dough => product.productVariations.map(item => item.pizzaType).includes(dough === "тонкое" ? 1 : 2 ))
                            : true

                        const  sizeCondition = activeSizes ?
                            activeSizes.every(size => product.productVariations.map(item => item.size).includes(parseInt(size)))
                            : true


                        return priceCondition && criteriaCondition && ingridientsCondition && doughCondition && sizeCondition;
                    }
                ).sort(sortByPrice) : []
            }))
            .filter(category => category.products.length > 0); // исключаем категории без отфильтрованных продуктов
        return filteredCategory
    };


    useEffect(() => {
        applyFilters(categories)
    }, [categories]);


    useEffect(() => {
        setSortedCategories(applyFilters(categories))
    }, [categories,
        priceFrom,
        priceTo,
        sortBy,
        activeCriteria,
        activeIngridients,
        activeDough,
        activeSizes]);

    return (
        <div className="w-full py-8 ml-12">
            {categories.length>0 && sortedCategories.length>0 &&
                (sortedCategories.map((item) => {
                    return(
                        <CategoryBlock key={item.id} id={item.id} category={item}/>
                    )
                }))
            }
            {categories.length === 0 && <SkeletonMenuSection/>}
            {categories.length>0 && sortedCategories.length===0 &&
                (
                    <div className="w-full h-[500px] flex justify-center items-center">
                        <div className="flex flex-col">
                            <div className="relative w-[200px] h-[200px]">
                                <Image className="w-full h-full" src="/empty-pizza-box.png"
                                       alt="Empty pizza box" width={1080} height={1080}/>
                            </div>
                            <div className="mt-10 font-bold text-xl">
                                Нет товаров по вашему запросу.<br/>Попробуйте изменить фильтры
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default MenuSection