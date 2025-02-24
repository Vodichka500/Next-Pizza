'use client'

import {Button} from "@/components/ui/button";
import {useRouter, useSearchParams} from "next/navigation";
import axios from "axios";

const ReplaceingPaymentServicePage = () => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const invoice_id = searchParams.get("invoice_id")
    const handleSubmit = async () => {
       await axios.post("/api/payment", JSON.stringify({status: "success", invoice_id: invoice_id, }), { headers: { "Content-Type": "application/json" }})
           .then(() => router.push("/successfulPayment"))
           .catch(() => router.push("/failedPayment"))

    }

    return (

        <div className="container mx-auto mt-10 flex flex-col items-center justify-center gap-6">
            <h1 className="text-2xl font-bold">Оплата заказа</h1>
            <p className="text-lg ">В связи со сложностями тестирования возможностей сайта с платежными системами, я
                временно отключил их.</p>
            <p className="text-lg">Ниже представлено видео демонстрирующее процесс оплаты заказа.</p>

            <iframe width="560" height="315" src="https://www.youtube.com/embed/eh2RTGV_SH4?si=C_s7iY6CxuwuMatp"
                    title="YouTube video player" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

            <p className="text-lg">После просмотра видео, нажмите кнопку ниже для подтверждения оплаты.</p>
            <Button onClick={handleSubmit}>Подтвердить Оплату</Button>
        </div>

    )
}
export default ReplaceingPaymentServicePage