import {useCallback, useState} from "react";
import axios from "axios";

export const useAxiosGet = () => {

    const [loading, setLoading] = useState(false); // Состояние загрузки
    const [error, setError] = useState(false);     // Ошибка

    const request = useCallback(async (url, options) => {
        setLoading(true);
        setError(false);
        try {
            const response = (await axios.get(url, options));
            setLoading(false)
            console.log("useAxios.ts: ", response)
            return response
        } catch (e) {
            console.error("useAxios.ts ERROR:",e)
            setError(true)
        } finally {
            setLoading(false);
        }

    }, [])
    const clearError = useCallback(() => setError(false),[]);
    return {request, loading, error, clearError}
}

export const useAxiosPatch = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const request = useCallback(async (url, options) => {
        setLoading(true);
        setError(false);
        try {
            const response = (await axios.patch(url, options));
            setLoading(false)
            console.log("useAxios.ts: ", response)
            return response
        } catch (e) {
            console.error("useAxios.ts ERROR:",e)
            setError(true)
        } finally {
            setLoading(false);
        }

    }, [])
    const clearError = useCallback(() => setError(false),[]);
    return {request, loading, error, clearError}
}