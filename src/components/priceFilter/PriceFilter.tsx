'use client'

import {Input} from "@/components/ui/input";
import {RussianRuble} from "lucide-react";
import RangeSlider from "@/components/priceFilter/rangeSlider";
import {setCurrentFromPrice, setCurrentToPrice} from "@/components/priceFilter/priceFilterSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import useFilters from "@/hooks/useFilters";



const PriceFilter = () => {
    const dispatch = useDispatch();
    const minPrice = useSelector(state => state.priceFilterReducer.minPrice)
    const maxPrice = useSelector(state => state.priceFilterReducer.maxPrice)
    const currentFromPrice = useSelector(state => state.priceFilterReducer.currentFromPrice);
    const currentToPrice =  useSelector(state => state.priceFilterReducer.currentToPrice);

    const fromInputRef = useRef(null)
    const toInputRef = useRef(null)


    const query  = useFilters();
    useEffect(() => {
        query.currentFromPrice ? dispatch(setCurrentFromPrice(parseInt(query.currentFromPrice))) : null;
        query.currentToPrice ? dispatch(setCurrentToPrice(parseInt(query.currentToPrice))) : null;

    }, [dispatch]);

    const onFromInput = (e) => {
        const inputValue = parseFloat(e.target.value)

        // -10, because value minGap = 10
        if(isNaN(inputValue)){
            toInputRef.current.value = ""
            dispatch(setCurrentFromPrice(0))
            return;
        }
        if(inputValue-10 <= currentToPrice && inputValue >= 0){
            fromInputRef.current.value = ""
            dispatch(setCurrentFromPrice(inputValue))
        }

    }

    const onToInput = (e) => {
            const inputValue = parseFloat(e.target.value)

            // -10, because value minGap = 10
            if(isNaN(inputValue)){
                toInputRef.current.value = ""
                dispatch(setCurrentToPrice(maxPrice))
                return;
            }
            if(inputValue-10 >= currentFromPrice && inputValue <= maxPrice){
                toInputRef.current.value = ""
                dispatch(setCurrentToPrice(inputValue))
            }
    }



    return (
      <div className="py-8 border-b-2 border-b-gray-100 ">
          <h3 className="text-xl font-bold mb-5">Цена:</h3>
          <div className="inline-flex gap-4">
              <div className="relative ">
                  <Input
                      ref={fromInputRef}
                      type="number"
                      placeholder={minPrice}
                      value={parseFloat(currentFromPrice)}
                      disabled={true}
                      className="disabled:cursor-default disabled:border-gray-600"
                      onInput={e => onFromInput(e)}/>

                  <RussianRuble
                      size={18}
                      className="absolute right-1 top-1/2 translate-y-[-50%] text-gray-400"/>
              </div>
              <div className="relative">
                  <Input
                      ref={toInputRef}
                      type={maxPrice}
                      placeholder="3000"
                      value={currentToPrice}
                      disabled={true}
                      className="disabled:cursor-default disabled:border-gray-600"
                      onInput={e => onToInput(e)}/>
                  <RussianRuble size={18}
                                className="absolute right-1 top-1/2 translate-y-[-50%] text-gray-400"/>
              </div>
          </div>
          <RangeSlider minGap={10} sliderMaxValue={maxPrice} sliderMinValue={minPrice}/>

      </div>
    )
}

export default PriceFilter