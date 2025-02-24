import {
    BASE_URL,
    PRODUCTS_POPULAR_PATH,
    PRODUCTS_SEARCH_ID_PATH,
    PRODUCTS_SEARCH_NAME_PATH
} from "@/services/constants";
import {useAxiosGet} from "@/hooks/useAxios";

export const useProductAPI = () => {
   const {request, loading, error} = useAxiosGet();

   const getPopularProducts = async () => {
       const response = request(BASE_URL+PRODUCTS_POPULAR_PATH, {});
       return response;
   }
   const getProductByName = async (name: string) => {
       const response = request(BASE_URL+PRODUCTS_SEARCH_NAME_PATH, {params: {query: name}});
       return response;
   }

    const getProductById = async (id: number | string) => {
        const response = request(BASE_URL+PRODUCTS_SEARCH_ID_PATH, {params: {query: id}});
        return response;
    }

   return{getPopularProducts,getProductByName,getProductById, loading, error}
}