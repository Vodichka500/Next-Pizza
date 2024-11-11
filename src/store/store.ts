import {configureStore} from "@reduxjs/toolkit";
import headerReducer from "@/components/header/headerSlice";
import topBarReducer from "@/components/topBar/topBarSlice"
import priceFilterReducer from "@/components/priceFilter/priceFilterSlice";

const store = configureStore({
    reducer: {headerReducer, topBarReducer, priceFilterReducer},
    devTools: process.env.NODE_ENV !== 'production'
})

export default store