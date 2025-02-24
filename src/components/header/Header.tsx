'use client'

import clsx from "clsx";

import {ArrowRight, LogOut, Settings, ShoppingBag, ShoppingCart, User, UserPen} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {Container} from "@/components/container/Container";
import {Button} from "@/components/ui/button";
import SearchInput from "@/components/searchInput/SearchInput";
import Cart from "@/components/cart/Cart";

import {useSelector} from "react-redux";
import {signOut, useSession} from "next-auth/react";
import {useRouter, useSearchParams} from "next/navigation";
import toast from "react-hot-toast";
import {useEffect} from "react";
import {RootState} from "@/store/store";


const Header = ({isSearchVisible = true, isCartVisible = true}) => {
    const cart = useSelector((state: RootState) => state.cartReduxReducer)
    const {data: session} = useSession()

    const searchParams = useSearchParams();
    const router = useRouter();
    useEffect(() => {
        let toastMessage = '';

        if (searchParams.has('loginSuccessful')) {
            toastMessage = 'Вы успешно вошли в систему';
        }

        if (searchParams.has('verified')) {
            toastMessage = 'Вы успешно подтвердили свой аккаунт';
        }

        if (toastMessage) {
            setTimeout(() => {
                router.replace('/');
                toast.success(toastMessage, {
                    duration: 3000,
                });
            }, 1000);
        }
    }, [searchParams]);

    return (

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

                {isSearchVisible && <SearchInput/>}

                <div className="flex gap-2">
                    {
                        session ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger className={clsx(
                                    "px-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background",
                                    "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ",
                                    "disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                                    "border border-primary text-primary bg-transparent hover:bg-secondary p-2"
                                )}>
                                    <User size={16}/>Профиль
                                </DropdownMenuTrigger>

                                <DropdownMenuContent>
                                    <DropdownMenuItem><Link href="/profile" className="flex gap-2 w-full"> <User
                                        size={16}/><span>Профиль</span></Link></DropdownMenuItem>
                                    <DropdownMenuItem><Link href="/profile" className="flex gap-2 w-full">
                                        <ShoppingBag/><span>Заказы</span></Link></DropdownMenuItem>
                                    <DropdownMenuItem><Link href="/profile" className="flex gap-2 w-full">
                                        <Settings/><span>Настройки</span></Link></DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => signOut()}><LogOut/><span>Выйти</span></DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <DropdownMenu>
                                <DropdownMenuTrigger className={clsx(
                                    "px-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background",
                                    "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ",
                                    "disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
                                    "border border-primary text-primary bg-transparent hover:bg-secondary p-2"
                                )}>
                                    <User size={16}/>Войти
                                </DropdownMenuTrigger>

                                <DropdownMenuContent>
                                    <DropdownMenuItem><Link href="/login" className="flex gap-2 w-full"><User
                                        size={16}/><span>Войти</span></Link></DropdownMenuItem>
                                    <DropdownMenuItem><Link href="/registration" className="flex gap-2 w-full">
                                        <UserPen/><span>Зарегистрироваться</span></Link></DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )
                    }
                    {isCartVisible && (
                        <Cart>
                            <Button className='relative group'>
                                <b>{Math.round(cart.cartRedux?.totalAmount) || 0} ₽</b>
                                <span className="h-full w-[1px] bg-white/30 mx-3"/>
                                <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                                    <ShoppingCart size={16} className="relative" strokeWidth={2}/>
                                    <b>{cart.cartRedux?.cartItems?.length || 0}</b>
                                </div>
                                <ArrowRight
                                    size={20}
                                    className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                                />
                            </Button>
                        </Cart>
                    )}
                </div>
            </div>
        </Container>

    )
}

export default Header