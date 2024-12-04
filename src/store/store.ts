import {configureStore} from "@reduxjs/toolkit";
import headerReducer from "@/components/header/headerSlice";
import topBarReducer from "@/components/topBar/topBarSlice"
import priceFilterReducer from "@/components/priceFilter/priceFilterSlice";
import filterSidebarReducer from "@/components/filterSidebar/filterSidebarSlice";
import chooseModalProductReducer from "@/components/chooseProductModal/chooseModalProductSlice";

const store = configureStore({
    reducer: {headerReducer, topBarReducer, priceFilterReducer, filterSidebarReducer, chooseModalProductReducer},
    devTools: process.env.NODE_ENV !== 'production'
})

export default store