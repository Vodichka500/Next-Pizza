import {Input} from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import {useRef, useState} from "react";
import { useProductAPI} from "@/services/productsAPI";
import {useClickAway} from "react-use";
import Spinner from "@/components/spinner/Spinner";


const SearchInput = () => {

    const {getPopularProducts,getProductByName, loading,error} = useProductAPI();
    const [products, setProducts] = useState(null)

    const onSearchInput = (name) => {
        getProductByName(name).then(res => setProducts(res.data))
    }


    const onSearchClick = (e) => {
        setIsSearchInputClicked(true)
        if(e.target.value != null){
            getProductByName(e.target.value).then(res => setProducts(res.data))
        } else {
            getPopularProducts()
                .then(res => setProducts(res.data))
        }
    }

    const ref = useRef(null);
    const [isSearchInputClicked, setIsSearchInputClicked] = useState(false)

    useClickAway(ref, () => {
        setIsSearchInputClicked(false)
    });
  return(
      <>
          {isSearchInputClicked && <div className="absolute top-0 left-0 bottom-0 right-0 bg-black/80 z-30"></div>}
          <div ref={ref} className="z-40">
              <Input
                  onInput={e => onSearchInput(e.target.value)}
                  onClick={(e) => onSearchClick(e)}
                  className="max-w-2xl"
                  type="text"
                  placeholder={"Search..."}/>
              {
                  !loading && !error && isSearchInputClicked ?
                      <div className="absolute left-1/2 translate-x-[-50%] min-w-[500px] rounded-2xl top-24 py-4 px-4 justify-center bg-white">
                          {
                              products.map(item => (
                                  SearchedElement(item, setIsSearchInputClicked)
                              ))
                          }
                      </div> : null
              }
              {
                  loading && !error && isSearchInputClicked ?
                      <div className="absolute left-1/2 translate-x-[-50%] min-w-[500px] rounded-2xl top-24 py-4 px-4 justify-center bg-white flex justify-center">
                          <Spinner/>
                      </div> : null
              }
              {
                  error && isSearchInputClicked ?
                      <div
                          className="absolute left-1/2 translate-x-[-50%] min-w-[500px] rounded-2xl top-24 py-4 px-4 justify-center bg-white">
                          <div>Невозможно получть список продуктов...</div>
                      </div> : null
              }

          </div>
      </>
  )
}

const SearchedElement = (item, setIsSearchInputClicked) => {
    return(
        <Link key={item.id} href={`/product/${item.id}`} passHref legacyBehavior className="">
            <a onClick={() => setIsSearchInputClicked(false)} className="flex justify-between items-center rounded-2xl px-1 py-2.5 border-b-2 border-b-r-2 border-b-gray-200 hover:shadow-xl duration-300">
                <div className="flex gap-4">
                    <Image src={item.imageUrl} alt="pizza" width={40} height={40}/>
                    <div className="flex-columns ">
                        <b>{item.name}</b>
                        <div className="text-gray-600 text-sm">
                            {
                                item.ingridients.map(item => (item.name)).join(", ").length > 40 ?
                                    `${item.ingridients.map(item => (item.name)).join(", ").slice(0,40)}...`:
                                    item.ingridients.map(item => (item.name)).join(", ")
                            }
                        </div>
                    </div>
                </div>
                <span className="text-gray-400">{item.productVariations.length > 0 ? item.productVariations[0].price + "P" : "Ошибка"}</span>
            </a>
        </Link>
    )
}

export default SearchInput