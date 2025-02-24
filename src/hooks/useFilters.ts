import { useSearchParams } from "next/navigation";
import qs from "qs";

interface CurrentPrices {
    currentFromPrice?: number;
    currentToPrice?: number;
}

const isCurrentPrices = (obj: unknown): obj is CurrentPrices =>
    typeof obj === 'object' && obj !== null && ('currentFromPrice' in obj || 'currentToPrice' in obj);


const useFilters = () => {
    const searchParams = useSearchParams();

    // Преобразуем параметры строки в объект с помощью qs
    const queryString = searchParams.toString();
    const query = qs.parse(queryString, { ignoreQueryPrefix: true });

    // Извлекаем данные
    const activeCriteria = typeof query.activeCriteria === 'string' ? query.activeCriteria?.split(',') : [];
    const activeDough = typeof query.activeDough  === 'string' ? query.activeDough?.split(',') : [];
    const activeIngridients =  typeof query.activeIngridients  === 'string' ? query.activeIngridients?.split(',') : [];
    const activeSizes =  typeof query.activeSizes  === 'string' ? query.activeSizes?.split(',') : [];

    const currentFromPrice = isCurrentPrices(query.currentPrices) ? query.currentPrices.currentFromPrice : undefined;
    const currentToPrice = isCurrentPrices(query.currentPrices) ? query.currentPrices?.currentToPrice : undefined;

    return { activeCriteria, activeDough, activeIngridients, activeSizes, currentFromPrice, currentToPrice };
};

export default useFilters;
