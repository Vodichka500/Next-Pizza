import Image from "next/image";

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
              <div></div>
          </div>
      </div>
  )
}
export default ProductCard