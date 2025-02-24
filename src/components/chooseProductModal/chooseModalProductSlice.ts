import {createEntityAdapter, createSlice, Dispatch, Slice} from "@reduxjs/toolkit";

// Define the type for the ingredients
interface Ingredient {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

interface ProductVariation {
    id: number;
    size: number;
    pizzaType: number;
    price: number;
}

interface ChooseModalProductState {
    product: {
        id: number;
        name: string;
        imageUrl: string;
        productVariations: ProductVariation[];
        ingridients: Ingredient[];
    } | null;
    loadingProduct: boolean | null;
    errorProduct: string | null;
    ingidients: Ingredient[];
    selectedSize: number | null;
    selectedDough: number | null;
    doesNotExistMessage: boolean;
    selectedIngridients: Ingredient[];
    price: number | null;
}


export const triggerMessage = () => (dispatch: Dispatch) => {
    dispatch(setDoesNotExistMessage(true));
    setTimeout(() => {
        dispatch(setDoesNotExistMessage(false));
    }, 2000);
};

const chooseModalProductAdapter = createEntityAdapter();
const initialState : ChooseModalProductState = chooseModalProductAdapter.getInitialState({
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
const chooseModalProductSlice: Slice<ChooseModalProductState> = createSlice({
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
        setSelectedIngridients: (state: ChooseModalProductState, action) => {
            const selectedIngridients : Array<Ingredient> = state.selectedIngridients
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
        clearSelectedIngridients: (state, action) => {
            console.log(action)
            state.selectedIngridients = []
        },
        setPrice: (state, action) => {
            console.log(action)
            const variationPrice = state.product?.productVariations.find(variation =>
                variation.size === state.selectedSize && variation.pizzaType === state.selectedDough
            )?.price;
            let ingridientsPrice = 0;
            for(const ingridient of state.selectedIngridients){
                ingridientsPrice += ingridient.price
            }
            if(variationPrice){
                state.price = variationPrice+ingridientsPrice
            }
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
    clearSelectedIngridients

} = actions


export default reducer