import Image from "next/image";
import {Button} from "@/components/ui/button";
import {RussianRuble} from "lucide-react";



const modalProductItem = ({product}) => {

  return (
      <div className="grid grid-cols-5  gap-4">
          <div className="col-span-3 flex justify-center items-center ">
              <Image src={product?.imageUrl} alt={"Image of " + product?.name} width={300} height={300}/>
          </div>
          <div
              className="col-span-2 col-start-4  relative px-4 rounded-2xl bg-[#F4F1EE] h-[400px] left-shadow flex items-center gap-y-3">
              <div>
                  <h2 className="text-2xl font-bold">{product?.name}</h2>
                  <Button className="max-w-sm  mt-6">Добавить в корзину за {product?.productVariations[0].price}
                      <RussianRuble/></Button>
              </div>
          </div>
      </div>
  )
}

export default modalProductItem