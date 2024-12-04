import type {Metadata} from "next";
import "../globals.css";
import Header from "@/components/header/Header";
import BackToTop from "@/components/backToTop/BackToTop";

export const metadata: Metadata = {
    title: "Next Pizza",
    description: "Best pizza in next.js",
};



export default function MainLayout({children,modal}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <main>
            <BackToTop/>
            <Header/>
            {children}
            {modal}
        </main>
    );
}
