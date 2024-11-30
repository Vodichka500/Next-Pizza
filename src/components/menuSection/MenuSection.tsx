'use client'

import CategoryBlock from "@/components/categoryBlock/CategoryBlock";
import {useSelector} from "react-redux";
import {selectAll} from "@/components/topBar/topBarSlice";

const MenuSection = () => {
    const categories = useSelector(state => selectAll(state))
    return (
        <div className="w-full py-8 ml-12">
        {categories.map((item) => {
            return(
                <CategoryBlock key={item.id} id={item.id} category={item}/>
            )
        })}
        </div>
    )
}

export default MenuSection