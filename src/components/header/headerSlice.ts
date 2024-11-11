import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";

const headerAdapter = createEntityAdapter()
const initialState = headerAdapter.getInitialState({
    title: "NextPizza"
})

const headerSlice = createSlice({
    name: "header",
    initialState,
    reducers: {
        setTitle(state, action){
            state.title = action.payload
        }
    }
})

const {reducer, actions} = headerSlice

export const {
    setTitle
} = actions
export default reducer