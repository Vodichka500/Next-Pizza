import type {Metadata} from "next";
import "./globals.css";
import {StoreProvider} from "@/store/StoreProvider";
import Header from "@/components/header/Header";
import {Nunito} from 'next/font/google'
import BackToTop from "@/components/backToTop/BackToTop";

const nutino = Nunito({
    subsets: ['cyrillic'],
    variable: '--font-nunito',
    weight: ['400', '500', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
    title: "Next Pizza",
    description: "Best pizza in next.js",
};



export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" className={nutino.className}>
        <body className="relative">
        <StoreProvider>
            <BackToTop/>
            <Header/>
            {children}
        </StoreProvider>

        </body>
        </html>
    );
}
