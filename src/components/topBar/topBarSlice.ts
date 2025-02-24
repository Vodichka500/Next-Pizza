import {createEntityAdapter, createSlice} from '@reduxjs/toolkit'
import {RootState} from "@/store/store";

type Product = {
    id: number
    name: string
    imageUrl: string
    productVariations: {id: number, price: number, pizzaType?: number, size?: number}[]
    ingridients: {id: number, name: string, price: number}[]
}
interface Category {
    id: string;
    name: string;

    products?: Product[]
}

const topBarAdapter = createEntityAdapter<Category>();
const initialState = topBarAdapter.getInitialState({
    activeSection: 1
})

const topBarSlice = createSlice({
    name: "topBar",
    initialState,
    reducers: {
        setAllSections: (state, action) =>  {
            topBarAdapter.setAll(state, action.payload)
        },
        setActiveSection: (state, action) => {
            state.activeSection = action.payload
        },
    }
})

const {reducer, actions} = topBarSlice
export const {
    setActiveSection,
    setAllSections
} = actions

export const {selectAll} = topBarAdapter.getSelectors((state: RootState) => state.topBarReducer)


//export const activeSection = (state: RootState) => state.activeSection.value
export default reducer