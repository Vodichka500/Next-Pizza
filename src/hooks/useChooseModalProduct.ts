import {useSelector} from "react-redux";
import {RootState} from "@/store/store";

export const useChooseModalProduct = () => {

    const product = useSelector((state: RootState) => state.chooseModalProductReducer.product)
    const loadingProduct = useSelector((state: RootState) => state.chooseModalProductReducer.loadingProduct)
    const errorProduct = useSelector((state: RootState) => state.chooseModalProductReducer.errorProduct)
    const ingridients = useSelector((state: RootState) => state.chooseModalProductReducer.ingidients)
    const selectedSize = useSelector((state: RootState) => state.chooseModalProductReducer.selectedSize)
    const selectedDough = useSelector((state: RootState) => state.chooseModalProductReducer.selectedDough)
    const doesNotExistMessage = useSelector((state: RootState) => state.chooseModalProductReducer.doesNotExistMessage)
    const selectedIngridients = useSelector((state: RootState) => state.chooseModalProductReducer.selectedIngridients)
    const price = useSelector((state: RootState) =>  state.chooseModalProductReducer.price)



    return {
        product,
        loadingProduct,
        errorProduct,
        ingridients,
        selectedSize,
        selectedDough,
        doesNotExistMessage,
        selectedIngridients,
        price,
    }
}