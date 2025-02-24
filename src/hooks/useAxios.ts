import {useCallback, useState} from "react";
import axios, { AxiosRequestConfig }  from "axios";



export const useAxiosGet = () => {

    const [loading, setLoading] = useState(false); // Состояние загрузки
    const [error, setError] = useState(false);     // Ошибка

    const request = useCallback(async (url: string, options: AxiosRequestConfig) => {
        setLoading(true);
        setError(false);
        try {
            const response = (await axios.get(url, options));
            setLoading(false)
            // console.log("useAxios.ts: ", response)
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

    const request = useCallback(async (url: string, data: object ,options: AxiosRequestConfig = {}) => {
        setLoading(true);
        setError(false);
        try {
            const response = (await axios.patch(url, data, options));
            setLoading(false)
            // console.log("useAxios.ts: ", response)
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

export const useAxiosPost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const request = useCallback(async (url: string, options: AxiosRequestConfig) => {
        setLoading(true);
        setError(false);
        try {
            const response = (await axios.post(url, options));
            setLoading(false)
            // console.log("useAxios.ts: ", response)
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

export const useAxiosDelete = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const request = useCallback(async (url: string, options: AxiosRequestConfig) => {
        setLoading(true);
        setError(false);
        try {
            const response = (await axios.delete(url, options));
            setLoading(false)
            // console.log("useAxios.ts: ", response)
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