import ProductCard from "@/components/productCard/ProductCard";
import {useInView} from "react-intersection-observer";
import {useDispatch, useSelector} from "react-redux";
import {setActiveSection} from "@/components/topBar/topBarSlice";
import {useEffect} from "react";


const CategoryBlock = ({id, categoryName}) => {
    const pizzaItem = {
        pizzaName: "Сырный цыпленок",
        ingridients: [ "Цыпленок", "моцарелла", "сыры чеддер и пармезан", "сырный соус", "томаты", "соус альфредо", "чеснок"],
        imageSrc: "/pizzaa.png",
        price: 395
    }
    const { ref, inView } = useInView({
        threshold: 0.7,
    });

    const dispatch = useDispatch();
    const activeSection = useSelector(state => state.topBarReducer.activeSection);

    useEffect(()=>{
        if (inView && activeSection !== id) {
            dispatch(setActiveSection(id));
        }
    }, [inView])
    return (
        <>
            <h2 className="text-2xl font-bold" id={id}>{categoryName}</h2>
            <div ref={ref} className='grid grid-cols-3 gap-[50px] mt-4 mb-20'>
                <ProductCard imageSrc={pizzaItem.imageSrc} pizzaName={pizzaItem.pizzaName} ingridients={pizzaItem.ingridients} price={pizzaItem.price}/>
                <ProductCard imageSrc={pizzaItem.imageSrc} pizzaName={pizzaItem.pizzaName} ingridients={pizzaItem.ingridients} price={pizzaItem.price}/>
                <ProductCard imageSrc={pizzaItem.imageSrc} pizzaName={pizzaItem.pizzaName} ingridients={pizzaItem.ingridients} price={pizzaItem.price}/>
            </div>
        </>
    )
}

export default CategoryBlock