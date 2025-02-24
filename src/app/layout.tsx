'use client'

import "./globals.css";
import {StoreProvider} from "@/store/StoreProvider";
import {Nunito} from 'next/font/google'
import {SessionProvider} from "next-auth/react"
import {Toaster} from "react-hot-toast";
import NextTopLoader from "nextjs-toploader";
import React, {Suspense} from "react";
import type {ReactNode} from "react";
import LoadingPage from "@/components/loadingPage/LoadingPage";




const nutino = Nunito({
    subsets: ['cyrillic'],
    variable: '--font-nunito',
    weight: ['400', '500', '600', '700', '800', '900'],
})

type LayoutProps = {
    children: ReactNode;
   // session: SessionContextValue;
};


export default function RootLayout({children, /*session*/}: LayoutProps) {

    return (
        <html lang="en" className={nutino.className}>
        <body className="relative">

        <SessionProvider /*session={session}*/>
            <Suspense fallback={<LoadingPage />}>
                <StoreProvider>
                    <NextTopLoader color="#ff7c2c" showSpinner={false}/>
                    <Toaster/>
                    {children}
                </StoreProvider>
            </Suspense>
        </SessionProvider>
        </body>
        </html>
    );
}
