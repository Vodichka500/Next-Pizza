import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";

const filterSidebarAdapter = createEntityAdapter()
const initialState = filterSidebarAdapter.getInitialState({
    criteria: ["Можно собирать", "Новинка"],
    ingridients: ["Сырный соус", "Моцарелла", "Чеснок", "Солённые огурчики", "Красный лук", "Томаты"],
    dough: ["Традиционное", "Тонкое"],
    sizes: ["20 см", "30 см", "40 см"],

    activeCriteria: [],
    activeIngridients: [],
    activeDough: [],
    activeSizes: [],
})

const updateActiveFilter = (activeFilterArr, filter) => {
    if (activeFilterArr.includes(filter)) {
        return activeFilterArr.filter(item => item !== filter);
    } else {
        return [...activeFilterArr, filter];
    }
};


const filterSidebarSlice = createSlice({
    name: "filterSidebar",
    initialState,
    reducers: {
        setActiveCriteria(state, action){
            state.activeCriteria = updateActiveFilter(state.activeCriteria, action.payload)

        },
        setActiveIngridients(state, action){
            state.activeIngridients = updateActiveFilter(state.activeIngridients, action.payload)
        },
        setActiveDough(state, action){
            state.activeDough = updateActiveFilter(state.activeDough, action.payload)
        },
        setActiveSizes(state, action){
            state.activeSizes = updateActiveFilter(state.activeSizes, action.payload)
        }
    }
})

const {reducer, actions} = filterSidebarSlice

export const {
    setActiveCriteria,
    setActiveIngridients,
    setActiveDough,
    setActiveSizes,
} = actions
export default reducer