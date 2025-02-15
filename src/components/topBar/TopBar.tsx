'use client'

import clsx from "clsx";
import {ArrowUpDown, MoveDown, MoveUp} from "lucide-react";
import {Container} from "@/components/container/Container";
import {setActiveSection, setAllSections, selectAll} from "@/components/topBar/topBarSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useCategoryAPI} from "@/services/categoryAPI";
import Spinner from "@/components/spinner/Spinner";
import SkeletonTopBar from "@/components/topBar/SkeletonTopBar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {setSortBy} from "@/components/priceFilter/priceFilterSlice";


const TopBar = () => {
    const dispatch = useDispatch()
    const {getAllCategory, loading, error} = useCategoryAPI()
    const categories = useSelector(state => selectAll(state))
    useEffect(() => {
        if(categories.length === 0){
            getAllCategory().then(res => dispatch(setAllSections(res.data)))
        }
    }, [])

    const onClick = (event, id) => {
        event.preventDefault(); // предотвращаем стандартную прокрутку
        const target = document.getElementById(id);

        if (target) {
            const offset = 100; // отступ от верха, например, 20px
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
    const activeSection = useSelector(state => state.topBarReducer.activeSection)

    const setContent = (loading, error) => {
        if(loading){
            return <SkeletonTopBar/>
        }else if(error){
            return <div>Error</div>
        }else if(!error && !loading){
            return (
                categories.map((item, i) => {
                    return(
                        <a
                            key={i}
                            href={`#${item.id}`}
                            onClick={(e) => onClick(e, item.id)}
                            className={clsx("flex items-center font-bold h-11 rounded-2xl px-5", item.id === activeSection && 'bg-white shadow-md shadow-gray-200 text-primary')}>
                            <button>{item.name}</button>
                        </a>
                    )

                })
            )
        }
    }

    const sortBy = useSelector(state => state.priceFilterReducer.sortBy)


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