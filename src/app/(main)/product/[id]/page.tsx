'use client'

import {Container} from "@/components/container/Container";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {useDispatch} from "react-redux";
import {useProductAPI} from "@/services/productsAPI";
import useIngridientsAPI from "@/services/ingridientsAPI";
import {useChooseModalProduct} from "@/hooks/useChooseModalProduct";
import {useEffect} from "react";
import {setIngridients, setProduct} from "@/components/chooseProductModal/chooseModalProductSlice";
import Spinner from "@/components/spinner/Spinner";
import { useParams } from "next/navigation";
import PagePizzaItem from "@/components/pagePizzaItem/PagePizzaItem";
import PageProductItem from "@/components/pageProdutItem/PageProductItem";

export default function ProductPage(){

    const dispatch = useDispatch()
    const { id }  = useParams();

    const {getProductById, loading: loadingProduct, error: errorProduct} = useProductAPI();
    const {getAllIngridients, loading:loadingIngridients , error:errorIngridients} = useIngridientsAPI();
    const {product} = useChooseModalProduct()

    useEffect(() => {
        dispatch(setProduct(null))
        if(typeof id === "string" || typeof id === "number"){
            getProductById(id)
                .then(res => {
                    if(res && res.data){
                        dispatch(setProduct(res.data))
                    }else {
                        console.error('Полученные данные пусты или undefined');
                    }
                })
        }
        getAllIngridients()
            .then(res => {
                if(res && res.data){
                    dispatch(setIngridients(res.data))
                }else {
                    console.error('Полученные данные пусты или undefined');
                }
            })
    }, []);

    const setContent = (loading: boolean, error: boolean) => {
        if(loading && !error){
            return <Spinner/>
        }else if (!loading && error){
            return (<div>Error with loading product data [chooseProductModal.tsx]</div>)
        } else if (!loading && !error && product){
            if(product?.productVariations[0].pizzaType){
                return (<PagePizzaItem loadingIngridients={loadingIngridients} errorIngridients={errorIngridients}/>)
            } else {
                return (<PageProductItem product={product}/>)
            }
        }
    }

    return(
        <Container>
            <div className="min-h-[920px]">
                <Breadcrumb className="mt-11">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Главная</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/">Каталог</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>{product ? product.name : "Продукт"}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                {setContent(loadingProduct, errorProduct)}
            </div>
        </Container>

    )
}