import {createEntityAdapter, createSlice} from "@reduxjs/toolkit";


export const triggerMessage = () => (dispatch) => {
    dispatch(setDoesNotExistMessage(true));
    setTimeout(() => {
        dispatch(setDoesNotExistMessage(false));
    }, 2000);
};



const chooseModalProductAdapter = createEntityAdapter();
const initialState = chooseModalProductAdapter.getInitialState({
    product: null,
    loadingProduct: null,
    errorProduct: null,
    ingidients: [],
    selectedSize: null,
    selectedDough: null,
    doesNotExistMessage: false,
    selectedIngridients: [],
    price: null,
})
const chooseModalProductSlice = createSlice({
    name: "chooseModalProduct",
    initialState,
    reducers: {
        setProduct: (state, action) => {
            state.product = action.payload
        },
        setIngridients: (state, action) => {
           state.ingidients = action.payload
        },
        setSelectedSize: (state, action) => {
            state.selectedSize = action.payload
        },
        setSelectedDough: (state, action) => {
            state.selectedDough = action.payload
        },
        setDoesNotExistMessage: (state, action) => {
            state.doesNotExistMessage = action.payload;
        },
        setSelectedIngridients: (state, action) => {
            const selectedIngridients = state.selectedIngridients
            const ingridient = action.payload
            const ids = selectedIngridients.map(item => item.id)

            if (ids.includes(ingridient.id)) {
                state.selectedIngridients = selectedIngridients.filter(item => {
                    return(item.id !== ingridient.id)
                });
            } else {
                state.selectedIngridients.push(ingridient);
            }
        },
        setPrice: (state) => {
            const variationPrice = state.product?.productVariations.find(variation =>
                variation.size === state.selectedSize && variation.pizzaType === state.selectedDough
            )?.price;
            let ingridientsPrice = 0;
            for(const ingridient of state.selectedIngridients){
                ingridientsPrice += ingridient.price
            }
            state.price = variationPrice+ingridientsPrice
        },

    }
})

const {reducer, actions} = chooseModalProductSlice
export const {
    setProduct,
    setIngridients,
    setSelectedSize,
    setSelectedDough,
    setDoesNotExistMessage,
    setSelectedIngridients,
    setPrice,

} = actions


export default reducer