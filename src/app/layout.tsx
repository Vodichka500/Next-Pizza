'use client'

import "./globals.css";
import {StoreProvider} from "@/store/StoreProvider";
import {Nunito} from 'next/font/google'
import { SessionProvider } from "next-auth/react"
import {Toaster} from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";

const nutino = Nunito({
    subsets: ['cyrillic'],
    variable: '--font-nunito',
    weight: ['400', '500', '600', '700', '800', '900'],
})



export default function RootLayout({children,session}: Readonly<{ children: React.ReactNode; }>) {

    return (
        <html lang="en" className={nutino.className}>
        <body className="relative">
        <SessionProvider session={session}>
            <StoreProvider>
                <NextTopLoader color="#ff7c2c" showSpinner={false}/>
                <Toaster/>
                {children}
            </StoreProvider>
        </SessionProvider>
        </body>
        </html>
    );
}
