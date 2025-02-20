import {Container} from "@/components/container/Container";
import TopBar from "@/components/topBar/TopBar";
import FilterSidebar from "@/components/filterSidebar/FilterSidebar";
import MenuSection from "@/components/menuSection/MenuSection";
import Stories from "@/components/stories/stories";


export default function Home() {



    return (
        <div className="py-8 relative">
            <Stories/>

            <Container>
                <h2 className="text-3xl mb-3">Все пиццы</h2>
            </Container>

            <TopBar/>

            <Container>
                <div className="mt-9 pb-14">
                    <div className="flex gap-20`">
                       <FilterSidebar/>
                       <MenuSection/>
                    </div>
                </div>
            </Container>

            {/*<div className="h-[2000px]"></div>*/}
        </div>
    );
}
