import {configureStore} from "@reduxjs/toolkit";
import headerReducer from "@/components/header/headerSlice";
import topBarReducer from "@/components/topBar/topBarSlice"
import priceFilterReducer from "@/components/priceFilter/priceFilterSlice";
import filterSidebarReducer from "@/components/filterSidebar/filterSidebarSlice";
import chooseModalProductReducer from "@/components/chooseProductModal/chooseModalProductSlice";
import cartReduxReducer from "@/components/cart/CartSlice";





const store = configureStore({
    reducer: {headerReducer, topBarReducer, priceFilterReducer, filterSidebarReducer, chooseModalProductReducer, cartReduxReducer},
    devTools: process.env.NODE_ENV !== 'production'
})
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export default store