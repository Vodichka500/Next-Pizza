import {BASE_URL, INGRIDIENTS_PATH } from "@/services/constants";
import {useAxiosGet} from "@/hooks/useAxios";

export const useIngridientsAPI = () => {
    const {request, loading, error}  =useAxiosGet()
    const getAllIngridients = async () => {
        const response = request(BASE_URL+INGRIDIENTS_PATH, {})
        return response
    }

    return {getAllIngridients, loading, error}
}

export default useIngridientsAPI