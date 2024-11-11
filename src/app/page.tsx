import {Container} from "@/components/container/Container";
import TopBar from "@/components/topBar/TopBar";
import FilterSidebar from "@/components/filterSidebar/FilterSidebar";
import MenuSection from "@/components/menuSection/MenuSection";

export default function Home() {
    const catiegories = [
        {id: "pizza", categoryName: "Пиццы"},
        {id: "breakfast", categoryName: "Завтраки"},
        {id: "drinks", categoryName: "Напитки"},
        {id: "deserts", categoryName: "Десерты"},
    ];
    const filters = ["Можно собирать", "Новинка"];
    const ingridients = ["Сырный соус", "Моцарелла", "Чеснок", "Солённые огурчики", "Красный лук", "Томаты"]
    const dough = ["Традиционное", "Тонкое"]

    return (
        <div className="py-8 relative">
            <Container>
                <h2 className="text-3xl mb-3">Все пиццы</h2>
            </Container>

            <TopBar categoriesToSetState={catiegories}/>

            <Container>
                <div className="mt-9 pb-14">
                    <div className="flex gap-20`">
                       <FilterSidebar filters={filters} ingridients={ingridients} dough={dough} />
                       <MenuSection/>
                    </div>
                </div>
            </Container>

            <div className="h-[2000px]"></div>
        </div>
    );
}
