'use client'
import clsx from "clsx";
import {useEffect, useState} from "react";

const BackToTop = () => {

    const [showBackToUpButton, setShowBackToUpButton]  = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                setShowBackToUpButton(true);
            } else {
                setShowBackToUpButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll); // Cleanup listener on unmount
    }, []);

    const onClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return (
        <button
            type = "button"
            onClick={onClick}
            className={clsx("!fixed z-50 bottom-5 end-5 rounded-full bg-primary p-3 text-white transition duration-150 ease-in-out hover:shadow-lg",
                showBackToUpButton ? null : "hidden" )}
            id = "btn-back-to-top" >
            <span className = "[&>svg]:w-4" >
                <svg xmlns = "http://www.w3.org/2000/svg" fill = "none" viewBox = "0 0 24 24" strokeWidth = "3" stroke = "currentColor" >
                    <path strokeLinecap = "round" strokeLinejoin = "round" d = "M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                </svg>
            </span>
        </button>
)
}

export default BackToTop