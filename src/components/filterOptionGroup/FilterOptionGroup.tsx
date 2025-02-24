'use client'

import {Checkbox} from "@/components/ui/checkbox";
import clsx from "clsx";
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {ActionCreatorWithPayload} from "@reduxjs/toolkit";


type FilterOptionGroupProps = {
    title?: string | null;
    filters: string[];
    setActiveFilter: ActionCreatorWithPayload<string>;
    activeFilters: string[];
};

const FilterOptionGroup = ({title, filters, setActiveFilter, activeFilters} : FilterOptionGroupProps) => {
    const [showAll, setShowAll] = useState(false)
    const dispatch = useDispatch()

    const setFilterList = (filters: string[]) =>{
        if(filters.length < 3){
            return filters
        } else if (!showAll){
            return filters.slice(0, 3)
        } else {
            return filters
        }
    }

    const setActiveFilters = (
        filter: string,
        setActiveFunction: ActionCreatorWithPayload<string>
    ) => {
        //const filter = e.target.id;
        dispatch(setActiveFunction(filter))
    };

    const showFilters = (filters: string[]) => {
        return(
            filters.map((filter, i) => {
                return (
                    <div key={i} className="flex items-center gap-2" >
                        <Checkbox id={filter} className="rounded" checked={activeFilters.includes(filter)} onClick={() => setActiveFilters(filter, setActiveFilter)}/>
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
