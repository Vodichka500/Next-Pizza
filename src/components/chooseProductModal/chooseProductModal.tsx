'use client'

import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,} from "@/components/ui/dialog"
import {useRouter} from "next/navigation";
import {useProductAPI} from "@/services/productsAPI";
import {useEffect} from "react";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import useIngridientsAPI from "@/services/ingridientsAPI";
import {useDispatch} from "react-redux";
import {
    setIngridients,
    setProduct
} from "@/components/chooseProductModal/chooseModalProductSlice";
import {useChooseModalProduct} from "@/hooks/useChooseModalProduct";
import ModalProductItem from "@/components/modalProductItem/modalProductItem";
import ModalPizzaItem from "@/components/modalPizzaItem/ModalPizzaItem";
import ModalSkeleton from "@/components/modalSkeleton/ModalSkeleton";

const ChooseProductModal = ({id} : {id: number | string}) => {


    const dispatch = useDispatch()
    const router = useRouter();
    const {getProductById, loading: loadingProduct, error: errorProduct} = useProductAPI();
    const {getAllIngridients, loading:loadingIngridients , error:errorIngridients} = useIngridientsAPI();
    const {product} = useChooseModalProduct()

    useEffect(() => {
        dispatch(setProduct(null))
        getProductById(id)
            .then(res => res && res.data && dispatch(setProduct(res.data)))
        getAllIngridients()
            .then(res => res && res.data && dispatch(setIngridients(res.data)))
    }, []);

    const setContent = (loading: boolean, error: boolean) => {
        if(loading && !error){
            return <ModalSkeleton/>
        }else if (!loading && error){
            return (<div>Error with loading product data [chooseProductModal.tsx]</div>)
        } else if (!loading && !error && product){
            if(product?.productVariations[0].pizzaType){
                // if(!selectedSize && !selectedDough){
                //     adjustSelection(null, null);
                // }
                //
                // |||--> it's take 2 hour of my life. I left this error here like memory
                return (<ModalPizzaItem loadingIngridients={loadingIngridients} errorIngridients={errorIngridients}/>)
            } else {
                return (<ModalProductItem product={product}/>)
            }
        }
    }
    return (
        <Dialog open={Boolean(id)} onOpenChange={() => router.back()}>
            <DialogContent className="min-w-[1000px] p-0">
                <VisuallyHidden>
                    <DialogHeader>
                        <DialogTitle>PizzaChoise</DialogTitle>
                        <DialogDescription>PizzaChoise</DialogDescription>
                    </DialogHeader>
                </VisuallyHidden>
                {setContent(loadingProduct, errorProduct)}
            </DialogContent>
        </Dialog>
    );
}
export default ChooseProductModal