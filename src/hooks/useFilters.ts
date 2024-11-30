import { useSearchParams } from "next/navigation";
import qs from "qs";

const useFilters = () => {
    const searchParams = useSearchParams();

    // Преобразуем параметры строки в объект с помощью qs
    const queryString = searchParams.toString();
    const query = qs.parse(queryString, { ignoreQueryPrefix: true });

    // Извлекаем данные
    const activeCriteria = query.activeCriteria?.split(',');
    const activeDough = query.activeDough?.split(',');
    const activeIngridients = query.activeIngridients?.split(',');
    const activeSizes = query.activeSizes?.split(',');

    const currentFromPrice = query.currentPrices?.currentFromPrice || null;
    const currentToPrice = query.currentPrices?.currentToPrice || null;

    return { activeCriteria, activeDough, activeIngridients, activeSizes, currentFromPrice, currentToPrice };
};

export default useFilters;
