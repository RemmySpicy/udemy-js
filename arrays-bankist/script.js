"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;
const movementsUSD = movements.map((mov) => mov * eurToUsd);
console.log(movementsUSD);

function displayMovements(movements, sort = false) {
  containerMovements.innerHTML = "";

  // Soft copy with slice without spreading
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements

  movs.forEach((mov, i) => {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
        <div class="movements__row">
            <div class="movements__type movements__type--${type}"> ${type}</div>
            <div class="movements__date">3 days ago</div>
            <div class="movements__value">${mov} €</div>
        </div>
        `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
}

// Computing Usernames
function createUsernames(accs) {
  accs.forEach(
    (acc) =>
      (acc.username = acc.owner
        .toLowerCase()
        .split(" ")
        .map((name) => name[0])
        .join(""))
  );
}

createUsernames(accounts);

// Transaction history record
const movementsDescription = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? "deposited" : "withdrew"} ${Math.abs(mov)}`
);
console.log(movementsDescription);

// Display Account balance
function calcDisplayBalance(acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} `;
}

// Maximum Value
console.log(movements.reduce((acc, mov) => (mov > acc ? mov : acc), 0));

// Display movements summaries
function calcDisplaySummary (acc) {
  // display incomes
  const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €`;

  // display outcomes
  const outcomes = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)} €`;

  // display interest
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => deposit * acc.interestRate / 100)
    .filter(interest => interest >= 1)
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interest} €`;
}

const updateUI = (acc) => {
  console.log(acc);
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc)  
}


// Event handler
let currentAccount;

btnLogin.addEventListener('click', (e) => {
  //prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value)
  // console.log(currentAccount)

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 1;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // update UI
    updateUI(currentAccount)
  }
})

// Transfer money event handler
btnTransfer.addEventListener('click', (e) => {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value)
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);

  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // update UI
    updateUI(currentAccount)
    console.log(receiverAcc);
  }
})

// Take Loan
btnLoan.addEventListener('click', (e) => {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value)
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount/10)) {
    // Give Loan
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  } 
  inputLoanAmount.value = '';
})

btnClose.addEventListener('click', (e) => {
  e.preventDefault();

  if (inputCloseUsername.value === currentAccount.username && 
    Number(inputClosePin.value) === currentAccount.pin
    ) {
      const index = accounts.findIndex(acc => acc.username === currentAccount.username);
      // .indexOf(element) only works for elements in the array, not complex find 

      // Delete account
      accounts.splice(index, 1);

      // Hide UI
      containerApp.style.opacity = 0; 
    }
    inputCloseUsername.value = inputClosePin.value = '';
})

// Get overall balance in bank

// Flat method
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);

  console.log(overallBalance);

// FlatMap method
const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);

  console.log(overallBalance2);


// Sort movements
let sorted = false; // state variable
btnSort.addEventListener('click', (e) => {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
})




/////// LESSONS ///////


// Creating arrays programatially

// General way
// console.log([1, 2, 3, 4, 5, 6, 7]);
const arr = [1, 2, 3, 4, 5, 6, 7];
// or
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// programatically -- array constructors
const x = new Array(7); // Creates empty array of length param
console.log(x);
console.log(x.map(() => 5)); // nothing happens, cos of new Array

// Fill method -- mutates array like splice does
// x.fill(1)    // or
x.fill(1, 3, 5) 
console.log(x);

arr.fill(23, 2, 6);
console.log(arr);

// Best programatically
// Array.from takes Map-like callback function
const y = Array.from({length: 7}, () => 1)
console.log(y);

// _ means useless variable
const z = Array.from({length: 7}, (_, i) => i + 1)
console.log(z);

// Get movements from UI
labelBalance.addEventListener('click', () => {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );

  console.log(movementsUI);

  // This also somehow create Array from 
  const movementsUI2 = [...document.querySelectorAll('.movements__value')]
})


// Sorting arrays of number ---  sorting mutates array

// return < 0, then A comes before B - Descending order (large to small)
// return > 0, then B comes before A - Ascending order (small to large)

// Ascending
// movements.sort((a, b) => a > b ? 1 : -1);
// movements.sort((a, b) => a - b);
// console.log(movements);

// Descending
// movements.sort((a, b) => a > b ? -1 : 1);
// movements.sort((a, b) => b - a);
// console.log(movements);


/////////////////////////////////////////////////
///// CHALLENGES /////
/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.
Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:
1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets
HINT: Use tools from all lectures in this section so far 😉
TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
GOOD LUCK 😀
*/

function checkDogs(dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice(1, -2);
  const dogsKateCopy = [...dogsKate];

  dogsJuliaCorrected.concat(dogsKateCopy).forEach((dogAge, index) => {
    if (dogAge >= 3)
      console.log(
        `Dog number ${index + 1} is an adult, and is ${dogAge} years old`
      );
    else console.log(`Dog number ${index + 1} is still a puppy 🐶`);
  });
}

// checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3])
// checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.
Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:
1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets
TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
GOOD LUCK 😀
*/

// Get average human age of the adult dogs
const calcAverageHumanAge = ages => ages
    .map((age) => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter((age) => age >= 18)
    .reduce((acc, age, i, array) => acc + age  / array.length, 0);


// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));


///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the recommended portion (see hint).
1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order (keep in mind that the portions are inside the array's objects)
HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.
TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];
GOOD LUCK 😀
*/

// 1
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] }
];

dogs.forEach(dog => {
  dog.recommendedFood = dog.weight ** 0.75 * 28;
  console.log(dog);
});

// 2
const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(`sarahDog ${sarahDog.curFood > sarahDog.recommendedFood ? 'eats' : 'does not eat'} too much`);

// 3
const ownersEatTooLittle = [], ownersEatTooMuch = [];
dogs.forEach(dog => dog.curFood > dog.recommendedFood ? ownersEatTooMuch.push(dog.owners) : ownersEatTooLittle.push(dog.owners))

console.log(ownersEatTooLittle, ownersEatTooMuch);

// 4
console.log(`${ownersEatTooLittle.flat().join(' and ')} dogs eat too little`);
console.log(`${ownersEatTooMuch.flat().join(' and ')} dogs eat too much`);

// 5
console.log(`Is any dog eating EXACTLY the amount of recommended food? ${dogs.some(dog => dog.curFood == dog.recommendedFood)}`);

// 6
// const condition = current > (recommended * 0.90) && current < (recommended * 1.10);
const condition = (dog) => `dog.curFood > (dog.recommendedFood * 0.90) && dog.curFood < (dog.recommendedFood * 1.10)`;

console.log(`is any dog eating an OKAY amount of recommended food? ${dogs.some(condition)}`);
