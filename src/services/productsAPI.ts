import {BASE_URL, PRODUCTS_POPULAR_PATH, PRODUCTS_SEARCH_PATH} from "@/services/constants";
import {useAxiosGet} from "@/hooks/useAxios";

export const useProductAPI = () => {
   const {request, loading, error} = useAxiosGet();

   const getPopularProducts = async () => {
       const response = request(BASE_URL+PRODUCTS_POPULAR_PATH, {});
       return response;
   }
   const getProductByName = async (name) => {
       const response = request(BASE_URL+PRODUCTS_SEARCH_PATH, {params: {query: name}});
       return response;
   }


   return{getPopularProducts,getProductByName, loading, error}
}