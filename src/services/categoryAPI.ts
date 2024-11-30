import {BASE_URL, CATEGORY_PATH } from "@/services/constants";
import {useAxiosGet} from "@/hooks/useAxios";

export const useCategoryAPI = () => {
    const {request, loading, error}  =useAxiosGet()
    const getAllCategory = async () => {
        const response = request(BASE_URL+CATEGORY_PATH, {})
        return response
    }

    return {getAllCategory, loading, error}
}

export default useCategoryAPI