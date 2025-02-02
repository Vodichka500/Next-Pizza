import Image from "next/image";
import {CopyPlus} from "lucide-react"

interface productCard {
    imageSrc: string,
    pizzaName: string,
    ingridients: string[],
    price:number

}

const ProductCard = ({imageSrc, pizzaName, ingridients, price}:productCard) => {
  return (
      <div className="cursor-pointer">
          <div className="hover:shadow-lg hover:duration-300 p-8 bg-[#FFF7EE] rounded-2xl flex justify-center ">
              <Image className="" src={imageSrc} width={211} height={211} priority={true} alt="picca"/>
          </div>
          <h3 className="mt-4 font-bold text-lg">{pizzaName}</h3>
          <p className="text-gray-400 mt-2"> {ingridients.map(item=>(item.name)).join(', ')} </p>
          <div className="flex justify-between mt-4">
              <div className="text-lg">
                  от <span className="text-xl font-bold">{price} ₽</span>
              </div>
              <div className="px-5 py-2 rounded-2xl bg-orange-100 text-primary flex gap-2"><CopyPlus size={22}/>Собрать</div>
          </div>
      </div>
  )
}
export default ProductCard