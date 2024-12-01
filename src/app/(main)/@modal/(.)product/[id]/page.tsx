import ChooseProductModal from "@/components/chooseProductModal/chooseProductModal";

const productModalPage = async ({params}) => {
    const id = await params.id
    return(
        <ChooseProductModal id={id}/>
    )
}

export default productModalPage