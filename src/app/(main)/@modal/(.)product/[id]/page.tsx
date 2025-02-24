'use client'

import ChooseProductModal from "@/components/chooseProductModal/chooseProductModal";
import { use } from "react";



const ProductModalPage =  ({params}: {params: Promise<{ id: string }>}) => {
    const {id} =  use(params)
    return(
        <ChooseProductModal id={id}/>
    )
}

export default ProductModalPage