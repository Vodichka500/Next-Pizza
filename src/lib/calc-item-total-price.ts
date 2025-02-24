export function calcCartItemTotalPrice (item: {ingridients: {price: number}[], productVariation: {price: number}, quantity: number}) {
    const ingredientsPrice = item.ingridients.reduce((acc, ingredient) => acc + ingredient.price, 0);

    return (ingredientsPrice + item.productVariation.price) * item.quantity;
};