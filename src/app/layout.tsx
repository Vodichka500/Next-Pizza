import "./globals.css";
import {StoreProvider} from "@/store/StoreProvider";
import {Nunito} from 'next/font/google'
const nutino = Nunito({
    subsets: ['cyrillic'],
    variable: '--font-nunito',
    weight: ['400', '500', '600', '700', '800', '900'],
})



export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {

    return (
        <html lang="en" className={nutino.className}>
        <body className="relative">
        <StoreProvider>
            {children}
        </StoreProvider>

        </body>
        </html>
    );
}
