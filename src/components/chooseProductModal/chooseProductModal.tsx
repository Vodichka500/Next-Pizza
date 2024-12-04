'use client'

import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,} from "@/components/ui/dialog"
import {useRouter} from "next/navigation";
import {useProductAPI} from "@/services/productsAPI";
import {useEffect} from "react";
import Spinner from "@/components/spinner/Spinner";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import useIngridientsAPI from "@/services/ingridientsAPI";
import {useDispatch} from "react-redux";
import {setIngridients, setProduct} from "@/components/chooseProductModal/chooseModalProductSlice";
import {useChooseModalProduct} from "@/hooks/useChooseModalProduct";
import ModalProductItem from "@/components/modalProductItem/modalProductItem";
import ModalPizzaItem from "@/components/modalPizzaItem/ModalPizzaItem";

const ChooseProductModal = ({id, className}) => {

    const dispatch = useDispatch()
    const router = useRouter();
    const {getProductById, loading: loadingProduct, error: errorProduct} = useProductAPI();
    const {getAllIngridients, loading:loadingIngridients , error:errorIngridients} = useIngridientsAPI();
    const {product} = useChooseModalProduct()

    useEffect(() => {
        getProductById(id)
            .then(res => dispatch(setProduct(res.data)))
        getAllIngridients()
            .then(res => dispatch(setIngridients(res.data)))
    }, []);

    const setContent = (loading, error) => {
        if(loading && !error){
            return <Spinner/>
        }else if (!loading && error){
            return (<div>Error with loading product data [chooseProductModal.tsx]</div>)
        } else if (!loading && !error){
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