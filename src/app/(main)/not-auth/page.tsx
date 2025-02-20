import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";

const NotAuthPage = () => {
    return (
        <div className='mx-auto mt-10 flex items-center justify-between w-[840px] gap-12'>
            <div className="flex flex-col">
                <div className="w-[445px]">
                    <h1 className="font-extrabold">Доступ запрещён</h1>
                    <p className="text-gray-400 text-lg">Данную страницу могут просматривать только авторизованные пользователи</p>
                </div>

                <div className="flex gap-5 mt-11">
                    <Link href="/">
                        <Button variant="outline" className="gap-2">
                            <ArrowLeft/>
                            На главную
                        </Button>
                    </Link>
                    <a href="">
                        <Button variant="outline" className="text-gray-500 border-gray-400 hover:bg-gray-50">
                            Обновить
                        </Button>
                    </a>
                </div>
            </div>

            <img src="/lock.png" alt="Доступ запрещён" width={300}/>
        </div>
    )
}
export default NotAuthPage