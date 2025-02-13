import {createEntityAdapter, createSlice} from '@reduxjs/toolkit'

const priceFilterAdapter = createEntityAdapter();


const initialState = priceFilterAdapter.getInitialState({
    maxPrice: 600,
    minPrice: 112,
    currentFromPrice: 112,
    currentToPrice: 600,
    sortBy: "priceDesc" // priceAsc (min -> max), priceDesc (max -> min)
})

const priceFilterSlice = createSlice({
    name: "priceFilter",
    initialState,
    reducers: {
        setMaxPrice: (state, action) => {
            state.maxPrice = action.payload
        },
        setMinPrice: (state, action) => {
            state.minPrice = action.payload
        },
        setCurrentFromPrice: (state, action) => {
            state.currentFromPrice = action.payload
        },
        setCurrentToPrice: (state, action) => {
            state.currentToPrice = action.payload
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload
        }
    }
})

const {reducer, actions} = priceFilterSlice
export const {
    setMaxPrice,
    setMinPrice,
    setCurrentFromPrice,
    setCurrentToPrice,
    setSortBy
} = actions

export default reducer