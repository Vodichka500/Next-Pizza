import {BASE_URL, CART_ITEM_PATH, CART_ITEMS_PATH, CART_PATH} from "@/services/constants";
import {useAxiosGet, useAxiosPatch, useAxiosPost} from "@/hooks/useAxios";

export const useGetCartAPI = () => {
    const {request, loading, error}  =useAxiosGet()
    const getCart = async () => {
        const response = request(BASE_URL+CART_PATH, {})
        return response
    }
    return {getCart, loading, error}
}

export const usePatchCartAPI = () => {
    const {request, loading, error, clearError} = useAxiosPatch()

    const patchCart = async (changes) => {
        const response = request(BASE_URL+CART_PATH, changes)
        return response
    }

    return {patchCart, loading, error, clearError}
}

export const usePatchCartItemAPI = () => {
    const {request, loading, error, clearError} = useAxiosPatch()

    const patchCartItem = async (id,changes) => {
        console.log("usePatchCartItemAPI: ", id, changes, BASE_URL+CART_ITEM_PATH+id)
        const response = request(BASE_URL+CART_ITEM_PATH+id, changes)
        return response
    }

    return {patchCartItem, loading, error, clearError}
}

export const usePostCartItemAPI = () => {
    const {request, loading, error, clearError} = useAxiosPost()

    const postCartItem = async (data) => {
        console.log("usePostCartItemAPI: ", data)
        const response = request(BASE_URL+CART_ITEMS_PATH, data)
        return response
    }

    return {postCartItem, loading, error, clearError}
}
