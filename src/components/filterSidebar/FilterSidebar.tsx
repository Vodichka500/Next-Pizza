import FilterOptionGroup from "@/components/filterOptionGroup/FilterOptionGroup";
import PriceFilter from "@/components/priceFilter/PriceFilter";

type Variables = {
    filters: string[],
    ingridients: string[],
    dough: string[]
}

const FilterSidebar = ({filters, ingridients, dough}: Variables) => {

    return (
        <div className="max-w-[250px] ">
            <h3 className="text-2xl font-bold mt-8">Фильтрация:</h3>
            <FilterOptionGroup title={null} filters={filters}/>

            <PriceFilter/>
            <FilterOptionGroup title={"Ингредиенты"} filters={ingridients}/>
            <FilterOptionGroup title={"Тип теста"} filters={dough}/>
        </div>
    )
}

export default FilterSidebar