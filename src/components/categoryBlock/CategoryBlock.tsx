import ProductCard from "@/components/productCard/ProductCard";
import {useInView} from "react-intersection-observer";
import {useDispatch, useSelector} from "react-redux";
import {setActiveSection} from "@/components/topBar/topBarSlice";
import {useEffect} from "react";
import Link from "next/link";
import {RootState} from "@/store/store";

type Category = {
    id: number | string,
    name?: string,
    products?: Array<Product>
}

type Ingridient = {
    id: number,
    name: string,
    price: number
}

type Product = {
    id: number,
    name: string,
    ingridients: Ingridient[],
    imageUrl: string,
    productVariations: Array<ProductVariation>
}
// type Ingridient = {
//     id: number,
//     name: string
//     price: number
// }

type ProductVariation = {
    id: number,
    price: number
}

const CategoryBlock = ({id, category} : {id: number | string, category: Category}) => {


    const { ref, inView } = useInView({
        threshold: 0.7,
    });

    const dispatch = useDispatch();
    const activeSection = useSelector((state: RootState )=> state.topBarReducer.activeSection);

    useEffect(()=>{
        if (inView && activeSection !== id) {
            dispatch(setActiveSection(id));
        }
    }, [inView])

    // useEffect(() => {
    //     console.log(category.products)
    //     const items = []
    //     category.products.forEach(item => {
    //         items.push(item.name)
    //     })
    //     console.log(items.join(", "))
    // }, [category]);

    return (
        <>
            <h2 className="text-2xl font-bold" >{category.name}</h2>

            <div ref={ref} id={String(id)} className='grid grid-cols-3 gap-[50px] mt-4 mb-20'>
                {
                    category.products && category.products.map(item => (
                       <Link key={item.id}  href={`/product/${item.id}`}>
                           <ProductCard  imageSrc={item.imageUrl} pizzaName={item.name ? item.name : "Категория"} ingridients={item.ingridients} price={item.productVariations[0].price}/>
                       </Link>
                    ))
                }
            </div>
        </>
    )
}

export default CategoryBlock