"use client"
import FilterOptionGroup from "@/components/filterOptionGroup/FilterOptionGroup";
import PriceFilter from "@/components/priceFilter/PriceFilter";
import {useDispatch, useSelector} from "react-redux";
import {setActiveCriteria, setActiveDough, setActiveIngridients, setActiveSizes} from "@/components/filterSidebar/filterSidebarSlice"
import qs from "qs";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import useFilters from "@/hooks/useFilters";

const FilterSidebar = () => {
    const dispatch = useDispatch();
    const query  = useFilters();
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        query.activeCriteria ? query.activeCriteria.map(item =>dispatch(setActiveCriteria(item)) )  : null;
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        query.activeDough ? query.activeDough.map(item =>dispatch(setActiveDough(item)) ): null;
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        query.activeIngridients ? query.activeIngridients.map(item =>dispatch(setActiveIngridients(item)) ) : null;
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        query.activeSizes ? query.activeSizes.map(item =>dispatch(setActiveSizes(item)) ) : null;
    }, [dispatch]);


    const criteria = useSelector(state => state.filterSidebarReducer.criteria)
    const ingridients = useSelector(state => state.filterSidebarReducer.ingridients)
    const dough = useSelector(state => state.filterSidebarReducer.dough)
    const sizes = useSelector(state => state.filterSidebarReducer.sizes)

    const activeCriteria = useSelector(state => state.filterSidebarReducer.activeCriteria)
    const activeIngridients = useSelector(state => state.filterSidebarReducer.activeIngridients)
    const activeDough = useSelector(state => state.filterSidebarReducer.activeDough)
    const activeSizes = useSelector(state => state.filterSidebarReducer.activeSizes)

    const currentFromPrice = useSelector(state => state.priceFilterReducer.currentFromPrice)
    const currentToPrice = useSelector(state => state.priceFilterReducer.currentToPrice)
    const minPrice = useSelector(state => state.priceFilterReducer.minPrice)
    const maxPrice = useSelector(state => state.priceFilterReducer.maxPrice)



    const router = useRouter();
    useEffect(() => {

        const currentPrices = (currentFromPrice === minPrice && currentToPrice === maxPrice) ? {} : {currentFromPrice, currentToPrice}
        const query = qs.stringify({currentPrices,activeCriteria, activeIngridients, activeDough, activeSizes}, { arrayFormat: 'comma',})
        router.push(`?${query}`, {
            scroll: false,
        });
    }, [currentFromPrice, currentToPrice, activeCriteria, activeIngridients, activeDough, activeSizes, maxPrice, minPrice, router]);


    return (
        <div className="max-w-[250px]">
            <h3 className="text-2xl font-bold mt-8">Фильтрация:</h3>
            <FilterOptionGroup title={null} filters={criteria} setActiveFilter={setActiveCriteria} activeFilters={activeCriteria}/>
            <PriceFilter/>
            <FilterOptionGroup title={"Тип теста"} filters={dough} setActiveFilter={setActiveDough} activeFilters={activeDough}/>
            <FilterOptionGroup title={"Размер"} filters={sizes} setActiveFilter={setActiveSizes} activeFilters={activeSizes}/>
            <FilterOptionGroup title={"Ингредиенты"} filters={ingridients} setActiveFilter={setActiveIngridients} activeFilters={activeIngridients}/>
            {/*<Link href="/" className="text-primary">Очистить все</Link>*/}
        </div>
    )
}

export default FilterSidebar