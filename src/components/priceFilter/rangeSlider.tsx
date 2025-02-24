'use client'
import { useEffect, useRef } from 'react';
import './rangeSlider.css'
import {useDispatch, useSelector} from "react-redux";
import {setCurrentFromPrice, setCurrentToPrice} from "@/components/priceFilter/priceFilterSlice";
import {RootState} from "@/store/store";


const RangeSlider = ({minGap, sliderMaxValue} : {minGap: number, sliderMaxValue: number}) => {
    const sliderOneRef = useRef<HTMLInputElement | null>(null);
    const sliderTwoRef = useRef<HTMLInputElement | null>(null);
    //const displayValOneRef = useRef(null);
    //const displayValTwoRef = useRef(null);
    const sliderTrackRef = useRef<HTMLInputElement | null>(null);


    const sliderOneValue = useSelector((state: RootState) => state.priceFilterReducer.currentFromPrice);
    const sliderTwoValue =  useSelector((state: RootState) => state.priceFilterReducer.currentToPrice);

    const dispatch = useDispatch();

    useEffect(() => {
        fillColor();
    }, [sliderOneValue, sliderTwoValue]);

    const slideOne = () => {
        const value = sliderOneRef.current ? parseInt(sliderOneRef.current.value) : 0;
        if (sliderTwoValue - value >= minGap) {
            dispatch(setCurrentFromPrice(value))
        }
    };

    const slideTwo = () => {
        const value = sliderTwoRef.current ? parseInt(sliderTwoRef.current.value) : 0;
        if (value - sliderOneValue >= minGap) {
            dispatch(setCurrentToPrice(value))
        }
    };

    const fillColor = () => {
        const percent1 = (sliderOneValue / sliderMaxValue) * 100;
        const percent2 = (sliderTwoValue / sliderMaxValue) * 100;
        if (sliderTrackRef.current) {
            sliderTrackRef.current.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #f77216 ${percent1}% , #f77216 ${percent2}%, #dadae5 ${percent2}%)`;
        }
    };

    return (
        <div className="relative flex-col">
            <div className="mt-10">
                <div ref={sliderTrackRef} className="h-1 border-r-8"></div>
                <input
                    type="range"
                    min={0}
                    max={sliderMaxValue}
                    value={sliderOneValue}
                    ref={sliderOneRef}
                    onChange={slideOne}
                />
                <input
                    type="range"
                    min={0}
                    max={sliderMaxValue}
                    value={sliderTwoValue}
                    ref={sliderTwoRef}
                    onChange={slideTwo}
                />
            </div>
        </div>
    );
}

export default RangeSlider;
