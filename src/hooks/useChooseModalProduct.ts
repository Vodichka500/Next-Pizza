import {useSelector} from "react-redux";

export const useChooseModalProduct = () => {

    const product = useSelector(state => state.chooseModalProductReducer.product)
    const loadingProduct = useSelector(state => state.chooseModalProductReducer.loadingProduct)
    const errorProduct = useSelector(state => state.chooseModalProductReducer.errorProduct)
    const ingridients = useSelector(state => state.chooseModalProductReducer.ingidients)
    const selectedSize = useSelector(state => state.chooseModalProductReducer.selectedSize)
    const selectedDough = useSelector(state => state.chooseModalProductReducer.selectedDough)
    const doesNotExistMessage = useSelector(state => state.chooseModalProductReducer.doesNotExistMessage)
    const selectedIngridients = useSelector(state => state.chooseModalProductReducer.selectedIngridients)
    const price = useSelector(state => state.chooseModalProductReducer.price)



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