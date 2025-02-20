import Image from "next/image";
import { useProductAPI } from "@/services/productsAPI"
import {useEffect, useState} from "react";

const OrdersHistoryProductItem = ({ productId }) => {
    const { getProductById } = useProductAPI()
    const [product, setProduct] = useState({})

    useEffect(() => {
        getProductById(productId)
            .then(res => {
                setProduct(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    return (
        <>
            {product &&

                    <div className="p-2 border-[1px] rounded-xl flex items-center gap-2">
                        <div className="w-[50px]">
                            <Image src={product.imageUrl} alt="pizza img" width={100} height={100}/>
                        </div>
                        <div className="">{product.name}</div>
                    </div>



            }
        </>
    );
}
export default OrdersHistoryProductItem