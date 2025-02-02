export function calcCartItemTotalPrice (item) {
    const ingredientsPrice = item.ingridients.reduce((acc, ingredient) => acc + ingredient.price, 0);

    return (ingredientsPrice + item.productVariation.price) * item.quantity;
};