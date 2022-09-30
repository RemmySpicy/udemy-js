// "use strict";

// Data needed for a later exercise
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

const getCode = str => str.slice(0, 3);

for (const flight of flights.split("+")) {
  const flightsArr = flight.split(";");
  let [status, from, to, time] = flightsArr;

  status = status.includes("Delayed")
    ? status.padStart(status.length + 1, "🔴")
    : status;

  status = status.replaceAll("_", " ");
  from = getCode(from).toUpperCase();
  to = getCode(to).toUpperCase();
  time = time.replace(":", "h");
  console.log(`${status} from ${from} to ${to} (${time})`.padStart(45));
}

// Data needed for first part of the section
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};
