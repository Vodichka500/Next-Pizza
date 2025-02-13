import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";

const CartAdapter = createEntityAdapter()
const initialState = CartAdapter.getInitialState({
    cartRedux: {
        cartItems: []
    }
})

const CartSlice = createSlice({
    name: "cartRedux",
    initialState,
    reducers: {
        setCartRedux(state, action){
            state.cartRedux = action.payload
        }
    }
})


const {reducer, actions} = CartSlice

export const {
    setCartRedux
} = actions
export default reducer