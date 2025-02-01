import Image from "next/image";
import { RussianRuble} from "lucide-react";
import {Button} from "@/components/ui/button";

const PageProductItem = ({product}) => {
  return (
      <div className="relative grid grid-cols-2 grid-rows-1 gap-x-4 mt-10">
          <div
              className="relative w-full flex justify-center items-center px-4 rounded-2xl bg-[#FFF7EE] left-shadow flex-col">
              <Image src={product?.imageUrl} alt={"Image of " + product?.name} width={1000} height={1000}
                     className="w-4/5"/>
          </div>
          <div className="relative px-4 flex flex-col  justify-center">
              <h2 className="text-3xl font-bold">{product?.name}</h2>
              <Button className="max-w-sm  mt-6">Добавить в корзину
                  за {product?.productVariations[0].price}<RussianRuble/></Button>
          </div>

      </div>
  )
}
export default PageProductItem