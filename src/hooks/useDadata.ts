import axios from "axios";
import {useMemo} from "react";


// const data = JSON.stringify({
//     "query": "Москва"
// });

export const useDaData = () => {
    const getAddresses = useMemo(() => async (data: { query: string; }) => {
        const jsonData = await (JSON.stringify(data))
        try {
            return await axios.request({
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': 'Token 437df1bf76a4d35d629aab6977a85f0435b5aa20'
                },
                data: jsonData
            });
        } catch (e) {
            console.error("useDaData: ", e);
        }
    }, []);

    return { getAddresses };
};
