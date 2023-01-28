// Importing Module
// import { addToCart, totalPrice as price, qt } from "./shoppingCart.js"; 
// addToCart('bread', 5);
// console.log(price, qt);

console.log('Importing module');

import shoppingCart from './shoppingCart.js';
// import * as ShoppingCart from "./shoppingCart.js";

// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

// import add, { addToCart, totalPrice as price, qt } from './shoppingCart.js';
// console.log(price);

import add, { cart } from './shoppingCart.js';
// add('pizza', 2)
// add('bread', 5)
// add('apple', 4)

// console.log(cart);

// console.log('Fetching starting');
// const res = await fetch('https://jsonplaceholder.typicode.com/posts');
// const data = await res.json();
// console.log(data);
// console.log('SOmething');

const getLastPost = async function() {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await res.json();
        
        return {title: data.at(-1).title, text: data.at(-1).body}
    } catch (error) {
        
    }
}

// const lastPost = getLastPost()

// Non blocking but not very clean
// lastPost.then(res => console.log(res))
// console.log(lastPost);

// const lastPost2 = await getLastPost()
// console.log(lastPost2);

// const ShoppingCart2 = (function() {
//     const cart = [];
//     const shippingCost = 10;
//     const totalPrice = 237;
//     const totalQuantity = 23;

//     const addToCart = function(product, quantity) {
//         cart.push({product, quantity});
//         console.log(`${quantity} ${product} was added to the cart. (shipping cost is ${shippingCost})`);
//     }
    
//     const orderStock = function() {
//         console.log(`${quantity} ${product} ordered from supplier`);
//     }

//     return {
//         addToCart,
//         cart,
//         totalPrice,
//         totalQuantity,
//     }
// })()


// ShoppingCart2.addToCart('apple', 4)
// ShoppingCart2.addToCart('pizza', 2)
// console.log(ShoppingCart2.shippingCost);

// Export in commonJS
// export.addToCart = function(product, quantity) {
//     cart.push({product, quantity});
//     console.log(`${quantity} ${product} was added to the cart. (shipping cost is ${shippingCost})`);
// }

// Import in commonJS
// const { addToCart } = require('./shoppingCart.js');