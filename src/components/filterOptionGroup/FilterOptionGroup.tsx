'use client'

import {Checkbox} from "@/components/ui/checkbox";
import clsx from "clsx";
import {useState} from "react";
import {useDispatch} from "react-redux";

const FilterOptionGroup = ({title, filters, setActiveFilter, activeFilters}) => {
    const [showAll, setShowAll] = useState(false)
    const dispatch = useDispatch()

    const setFilterList = (filters) =>{
        if(filters.length < 3){
            return filters
        } else if (!showAll){
            return filters.slice(0, 3)
        } else {
            return filters
        }
    }

    const setActiveFilters = (e, setActiveFunction) => {
        const filter = e.target.id;
        dispatch(setActiveFunction(filter))
    };

    const showFilters = (filters) => {
        return(
            filters.map((filter, i) => {
                return (
                    <div key={i} className="flex items-center gap-2" >
                        <Checkbox id={filter} className="rounded" checked={activeFilters.includes(filter)} onClick={e => setActiveFilters(e,setActiveFilter)}/>
                        <label htmlFor={filter} className="cursor-pointer">{filter}</label>
                    </div>
                );
            })
        )
    }
    const showAllButton = () => {
        if(filters.length < 5){
            return null
        }

        let buttonTitle = ""
        if (!showAll){
            buttonTitle = "+ Показать всё"
        } else {
            buttonTitle = "- Скрыть"
        }
        return (
            <button className="bg-transparent text-primary mt-3" onClick={() => {setShowAll(!showAll)}
            } >{buttonTitle}</button>
        )
    }

    return (
        <div className={clsx("py-8 border-b-2 border-b-gray-100")}>
            {title ? <h3 className="text-xl font-bold mb-5">{title}:</h3> : null}
            {showFilters(setFilterList(filters))}
            {showAllButton()}
        </div>
    )
}

export default FilterOptionGroup
