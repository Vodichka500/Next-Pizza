export function calcCartItemTotalPrice (item) {
    const ingredientsPrice = item.ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0);

    return (ingredientsPrice + item.productItem.price) * item.quantity;
};