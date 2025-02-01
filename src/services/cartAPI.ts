import {BASE_URL, CART_PATH } from "@/services/constants";
import {useAxiosGet, useAxiosPatch} from "@/hooks/useAxios";

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

