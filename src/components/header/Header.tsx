'use client'

import clsx from "clsx";

import {ArrowRight, LogOut, Settings, ShoppingBag, ShoppingCart, User} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {Container} from "@/components/container/Container";
import {Button} from "@/components/ui/button";
import SearchInput from "@/components/searchInput/SearchInput";
import Cart from "@/components/cart/Cart";


const Header = () => {
    return(
        <Container>
            <div className="flex justify-between items-center py-8 border-b-2 border-gray-100 ">
                <Link href="/">
                    <div className="flex items-center gap-4">
                        <Image src="/logo.png" alt="Logo" height={35} width={35}/>
                        <div className="">
                            <b className="text-xl uppercase">Next Pizza</b>
                            <p className="text-xs text-gray-500 uppercase">вкусней уже некуда</p>
                        </div>
                    </div>
                </Link>

                <SearchInput/>

                <div className="flex gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger className={clsx(
                            "px-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background",
                            "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ",
                            "disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                            "border border-primary text-primary bg-transparent hover:bg-secondary"
                        )}>
                            <User size={16}/>Профиль
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem> <ShoppingBag/><span>Заказы</span></DropdownMenuItem>
                            <DropdownMenuItem> <Settings/><span>Настройки</span></DropdownMenuItem>
                            <DropdownMenuItem><LogOut/><span>Выйти</span></DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Cart>
                        <Button className='relative group'>
                            <b>{100} ₽</b>
                            <span className="h-full w-[1px] bg-white/30 mx-3"/>
                            <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                                <ShoppingCart size={16} className="relative" strokeWidth={2}/>
                                <b>{3}</b>
                            </div>
                            <ArrowRight
                                size={20}
                                className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                            />
                        </Button>
                    </Cart>
                </div>
            </div>
        </Container>
    )
}

export default Header