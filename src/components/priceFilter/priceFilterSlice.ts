import {createEntityAdapter, createSlice} from '@reduxjs/toolkit'

const priceFilterAdapter = createEntityAdapter();


const initialState = priceFilterAdapter.getInitialState({
    maxPrice: 3000,
    minPrice: 112,
    currentFromPrice: 112,
    currentToPrice: 3000

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
    }
})

const {reducer, actions} = priceFilterSlice
export const {
    setMaxPrice,
    setMinPrice,
    setCurrentFromPrice,
    setCurrentToPrice
} = actions

export default reducer