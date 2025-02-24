'use client'

import clsx from "clsx";
import {ArrowUpDown, MoveDown, MoveUp} from "lucide-react";
import {Container} from "@/components/container/Container";
import {setActiveSection, setAllSections, selectAll} from "@/components/topBar/topBarSlice";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {useCategoryAPI} from "@/services/categoryAPI";
import SkeletonTopBar from "@/components/topBar/SkeletonTopBar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {setSortBy} from "@/components/priceFilter/priceFilterSlice";
import {RootState} from "@/store/store";
type Product = {
    productVariations: {id: number, price: number, pizzaType?: number, size?: number}[]
    ingridients: {id: number, name: string}[]
}

interface Category {
    id: string;
    name: string;
    products?: Product[]
}

const TopBar = () => {
    const dispatch = useDispatch()
    const {getAllCategory, loading, error} = useCategoryAPI()
    const categories: Category[] = useSelector((state: RootState) => selectAll(state))
    useEffect(() => {
        if(categories.length === 0){
            getAllCategory().then(res => {
                if(res && res.data) {
                    const formattedData: Category[] = res.data.map((item: Category) => ({
                        id: item.id,
                        name: item.name,
                        products: item.products
                    }));
                    dispatch(setAllSections(formattedData))
                }
            })
        }
    }, [])

    const onClick = (event: React.MouseEvent, id: string) => {
        event.preventDefault(); // предотвращаем стандартную прокрутку
        const target = document.getElementById(id);

        if (target) {
            const offset = 80; // отступ от верха, например, 20px
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            dispatch(setActiveSection(id));
        }
    }

    //const categories = useSelector(state => selectAll(state))
    const activeSection = String(useSelector((state: RootState) => state.topBarReducer.activeSection))

    const setContent = (loading: boolean, error: boolean) => {
        if(loading){
            return <SkeletonTopBar/>
        }else if(error){
            return <div>Error</div>
        }else if(!error && !loading){
            return (
                categories.map((item: Category, i) => {
                    return(
                        <a
                            key={i}
                            href={`#${item.id}`}
                            onClick={(e) => onClick(e, item.id)}
                            className={clsx("flex items-center font-bold h-11 rounded-2xl px-5", String(item.id) === activeSection && 'bg-white shadow-md shadow-gray-200 text-primary')}>
                            <button>{item.name}</button>
                        </a>
                    )

                })
            )
        }
    }

    const sortBy = useSelector((state: RootState) => state.priceFilterReducer.sortBy)


    return(
        <Container className="py-4 sticky top-0 flex justify-between items-end z-10 bg-white/80 backdrop-blur-md ">
            <div className=" inline-flex gap-1 bg-gray-50 rounded-2xl z-100">
                {
                    setContent(loading, error)
                }
            </div>
            <div className="inline-flex items-center px-2 bg-gray-50 rounded-2xl gap-2 cursor-pointer">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex gap-2 items-center">
                            <ArrowUpDown height={44} size={16}/>
                            <b className="text-lg">Сортировка:</b>
                            <b className="text-primary">{sortBy === "priceAsc" ? "Цена (по возрастанию)" : "Цена (по убыванию)"} </b>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={() => dispatch(setSortBy("priceDesc"))}>
                                <span>Цена (по возрастанию)</span>
                                <DropdownMenuShortcut><MoveUp /></DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => dispatch(setSortBy("priceAsc"))}>
                                <span>Цена (по убыванию)</span>
                                <DropdownMenuShortcut><MoveDown /></DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </Container>
    )
}

export default TopBar