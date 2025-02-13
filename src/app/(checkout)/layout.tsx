import type {Metadata} from "next";
import "../globals.css";
import Header from "@/components/header/Header";
import BackToTop from "@/components/backToTop/BackToTop";

export const metadata: Metadata = {
    title: "Checkout",
    description: "Best pizza in next.js",
};



export default function CheckoutLayout({children}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <main className="">
            <BackToTop/>
            <Header isSearchVisible={false} isCartVisible={false}/>
            {children}
        </main>
    );
}
