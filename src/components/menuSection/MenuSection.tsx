'use client'

import CategoryBlock from "@/components/categoryBlock/CategoryBlock";
import {useSelector} from "react-redux";
import {selectAll} from "@/components/topBar/topBarSlice";
import SkeletonMenuSection from "@/components/menuSection/SkeletonMenuSection";
import {useEffect} from "react";

const MenuSection = () => {
    const categories = useSelector(state => selectAll(state))
    const priceFrom = useSelector(state => state.priceFilterReducer.currentFromPrice)
    const priceTo = useSelector(state => state.priceFilterReducer.currentToPrice)

    const sortBy = useSelector(state => state.priceFilterReducer.sortBy)

    const activeCriteria = useSelector(state => state.filterSidebarReducer.activeCriteria)
    const activeIngridients = useSelector(state => state.filterSidebarReducer.activeIngridients)
    const activeDough = useSelector(state => state.filterSidebarReducer.activeDough)
    const activeSizes = useSelector(state => state.filterSidebarReducer.activeSizes)

    const sortByPrice = (a, b) => {
        const priceA = a.productVariations[0].price;
        const priceB = b.productVariations[0].price;

        if (sortBy === "priceAsc") {
            return priceA - priceB;
        } else if (sortBy === "priceDesc") {
            return priceB - priceA;
        }
        return 0;
    };
    const applyFilters = (categories) => {
        const filteredCategory = categories
            .map(category => ({
                ...category,
                products: category.products.filter(product =>{
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
                ).sort(sortByPrice)
            }))
            .filter(category => category.products.length > 0); // исключаем категории без отфильтрованных продуктов
        return filteredCategory
    };


    useEffect(() => {
        applyFilters(categories)
    }, [categories]);




    return (
        <div className="w-full py-8 ml-12">
        {
            categories.length>0 ?
                (applyFilters(categories)).map((item) => {
                    return(
                        <CategoryBlock key={item.id} id={item.id} category={item}/>
                    )
                }) :
                <SkeletonMenuSection/>
        }
        </div>
    )
}

export default MenuSection