// Exporting module
console.log('Exporting module');

const shippingCost = 10;
export const cart = [];

export const addToCart = function(product, quantity) {
    cart.push({product, quantity});
    console.log(`${quantity} ${product} was added to the cart`);
}

const totalPrice = 237;
const totalQuantity = 23

export { totalPrice, totalQuantity as qt };

export default function(product, quantity) {
    cart.push({product, quantity});
    console.log(`${quantity} ${product} was added to the cart`);
}
