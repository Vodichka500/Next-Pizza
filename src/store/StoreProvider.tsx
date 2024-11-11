'use client'

import store  from "./store"
import {Provider} from "react-redux";
import React from "react";

export const StoreProvider: React.FC = ({children}) => {
    return <Provider store={store}>{children}</Provider>
}