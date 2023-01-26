// Importing Module
// import { addToCart, totalPrice as price, qt } from "./shoppingCart.js"; 
// addToCart('bread', 5);
// console.log(price, qt);

console.log('Importing module');

// import * as ShoppingCart from "./shoppingCart.js";

// ShoppingCart.addToCart('bread', 5);
// console.log(ShoppingCart.totalPrice);

// import add, { addToCart, totalPrice as price, qt } from './shoppingCart.js';
// console.log(price);

import add, { cart } from './shoppingCart.js';
add('pizza', 2)
add('bread', 5)
add('apple', 4)

console.log(cart);

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

const lastPost = getLastPost()

// Non blocking but not very clean
// lastPost.then(res => console.log(res))
// console.log(lastPost);

const lastPost2 = await getLastPost()
console.log(lastPost2);