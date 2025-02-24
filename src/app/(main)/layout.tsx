import type {Metadata} from "next";
import "../globals.css";
import Header from "@/components/header/Header";
import BackToTop from "@/components/backToTop/BackToTop";
import type { ReactNode } from 'react';

export const metadata: Metadata = {
    title: "Next Pizza",
    description: "Best pizza in next.js",
};
type LayoutProps = {
    children: ReactNode;
    modal: ReactNode | null
};


export default function MainLayout({children,modal}: LayoutProps) {
    return (
        <main>
            <BackToTop/>
            <Header isCartVisible={true} isSearchVisible={true}/>
            {children}
            {modal}
        </main>
    );
}
