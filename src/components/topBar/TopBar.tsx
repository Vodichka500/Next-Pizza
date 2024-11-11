'use client'

import clsx from "clsx";
import {ArrowUpDown} from "lucide-react";
import {Container} from "@/components/container/Container";
import {setActiveSection, setAllSections, selectAll} from "@/components/topBar/topBarSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";


const TopBar = ({categoriesToSetState}) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setAllSections(categoriesToSetState))
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

    const categories = useSelector(state => selectAll(state))
    const activeSection = useSelector(state => state.topBarReducer.activeSection)

    return(
        <Container className="py-4 sticky top-0 flex justify-between items-end z-10 bg-white/80 backdrop-blur-md ">
            <div className=" inline-flex gap-1 bg-gray-50 rounded-2xl z-100">
                {
                    categories.map((item, i) => {
                       return(
                           <a
                               key={i}
                               href={`#${item.id}`}
                               onClick={(e) => onClick(e, item.id)}
                               className={clsx("flex items-center font-bold h-11 rounded-2xl px-5", item.id === activeSection && 'bg-white shadow-md shadow-gray-200 text-primary')}>
                               <button>{item.categoryName}</button>
                           </a>
                       )

                    })
                }
            </div>
            <div className="inline-flex items-center px-2 bg-gray-50 rounded-2xl gap-2 cursor-pointer">
                <ArrowUpDown height={44} size={16}/>
                <b className="text-lg">Сортировка:</b>
                <b className="text-primary">Рейтинг</b>
            </div>
        </Container>
    )
}

export default TopBar