'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const imagesContainer = document.querySelector('.images');

const renderError = (msg) => {
    countriesContainer.insertAdjacentText("beforeend", msg);
    countriesContainer.style.opacity = 1;
}

const renderCountry = (data, className = '') => {
    const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flags.png}" />
            <div class="country__data">
                <h3 class="country__name">${data.name.common}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} Million People</p>
                <p class="country__row"><span>🗣️</span>${Object.entries(data.languages)[0][1]}</p>
                <p class="country__row"><span>💰</span>${Object.entries(data.currencies)[0][1].name}</p>
            </div>
        </article>
        `;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
}


///////////////////////////////////////

// const getCountryData = (country) => {

//     const request = new XMLHttpRequest();

//     request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//     request.send();

//     request.addEventListener('load', function() {
//         const [data] = JSON.parse(this.responseText)
//         console.log(data);

//         const html = `
//         <article class="country">
//             <img class="country__img" src="${data.flags.png}" />
//             <div class="country__data">
//                 <h3 class="country__name">${data.name.common}</h3>
//                 <h4 class="country__region">${data.region}</h4>
//                 <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} Million People</p>
//                 <p class="country__row"><span>🗣️</span>${Object.entries(data.languages)[0][1]}</p>
//                 <p class="country__row"><span>💰</span>${Object.entries(data.currencies)[0][1].name}</p>
//             </div>
//         </article>
//         `;

//         countriesContainer.insertAdjacentHTML('beforeend', html);
//         countriesContainer.style.opacity = 1;
//     })
// };

// const getCountryAndNeighbour = (country) => {

//     // AJAX call country
//     const request = new XMLHttpRequest();

//     request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//     request.send();

//     request.addEventListener('load', function() {
//         const [data] = JSON.parse(this.responseText)
//         console.log(data);

//         // Render country (1)
//         renderCountry(data);

//         // Get neighbour country (2)
//         const [neighbour] = data.borders;
//         console.log(neighbour);

//         if (!neighbour) return;

//         // AJAX call country 2
//         const request2 = new XMLHttpRequest();

//         request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
//         request2.send();

//         request2.addEventListener('load', function() {
            
//             const [data2] = JSON.parse(this.responseText);
//             console.log(data2);

//             renderCountry(data2, 'neighbour');
//         })
//     })
// };

// getCountryAndNeighbour('nigeria');
// getCountryAndNeighbour('us');


//     const request = new XMLHttpRequest();
//     request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
//     request.send();

// const request = fetch('https://restcountries.com/v3.1/name/nigeria')
// console.log(request);

// const getCountryData = (country) => {
//     fetch(`https://restcountries.com/v3.1/name/${country}`)
//         .then(response => {
//             console.log(response);
//             return response.json();
//         })
//         .then(data => {
//         console.log(data);
//         renderCountry(data[0]);
//         }
//     )
// }

const getJSON = (url, errMsg = "Something went wrong") => {
    return fetch(url)
    .then(response => {
        // console.log(response);

        if (!response.ok) {
            console.log(response.json());
            throw new Error(`${errMsg} (${response.status})`);
        }

        return response.json();
    })
}

// const getCountryData = (country) => {
//     // country 1
//     fetch(`https://restcountries.com/v3.1/name/${country}`)
//         .then(response => {
//             console.log(response);

//             if (!response.ok) {
//                 throw new Error(`Country not found (${response.status})`);
//             }

//             return response.json();
//         })
//         .then(data => {
//             renderCountry(data[0]);
//             const neighbour = data[0].borders[0];

//             if (!neighbour) return;
            
//             // country 2
//             return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
//         })
//         .then(response => {
//             console.log(response);
            
//             if (!response.ok) {
//                 throw new Error(`Country not found (${response.status})`);
//             }

//             response.json()
//         })
//         .then(data => renderCountry(data[0], 'neighbour'))
//         .catch(err => {
//             console.error(`${err} 💥`);
//             renderError(`Something went wrong 💥 ${err.message} Try again`);
//         })
//         .finally(() => {
//             countriesContainer.style.opacity = 1;
//         });
// }

// const getCountryData = (country) => {
//     // country 1
//     getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
//         .then(data => {
//             renderCountry(data[0]);
//             // const neighbour = data[0].borders[0];
//             const neighbour = data[0].borders;
            
//             console.log(neighbour);
            
//             if (!neighbour) throw new Error("No neighbour found!");
            
//             // country 2
//             return getJSON(`https://restcountries.com/v3.1/alpha/${neighbour[0]}`, 'Country not found!')
//         })
//         .then(data => renderCountry(data[0], 'neighbour'))
//         .catch(err => {
//             console.error(`${err} 💥`);
//             renderError(`Something went wrong 💥 ${err.message} Try again`);
//         })
//         .finally(() => {
//             countriesContainer.style.opacity = 1;
//         });
// }

// getCountryData('australia')
// btn.addEventListener('click', function() {
// })


///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.
Here are your tasks:
PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.
PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)
TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474
GOOD LUCK 😀
*/

// const whereAmI = (lat, lon) => {
//     console.log({lat, lon});
//     fetch(`https://geocode.xyz/${lat},${lon}?geoit=json`)
//         .then(response => {
//             if (!response.ok) throw new Error(`Error fetching data: ${response.status} 💥💥`)
//             return response.json()
//         })
//         .then(data => {
//             // console.log(data)
//             // if (!data.success) 
//             //     throw new Error(`(${data.error.code}) You are reloading too fast, please wait for at least 5 secs!`);
            
//             console.log(`You are in ${data.city}, ${data.country}`);
//             getCountryInfo(data.country)
//         })
//         .catch(err => {
//             // console.error(`You are reloading too fast, please wait at least 5 secs! ${err}`);
//             console.error(err);
//         })
// }

const getCountryInfo = (country) => {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
            renderCountry(data[0]);

            const neighbour = data[0].borders;

            if (!neighbour) throw new Error('No borders available');

            return fetch(`https://restcountries.com/v3.1/alpha/${neighbour[0]}`)
        })
        .then(response => response.json())
        .then(data => renderCountry(data[0], 'neighbour'))
        .catch(err => {
            console.log(err.message);
        })
        .finally(countriesContainer.style.opacity = 1)
}


// const data =  ['52.508, 13.381', '19.037, 72.873', '-33.933, 18.474']

// let i = 0;
// btn.addEventListener('click', () => {
//     const [lat, lon] = data[i].split(',');
//     whereAmI(lat, lon)
//     i >= data.length - 1 ? i = 0 : i++; 
// })


// Building up promises
// const lotteryPromise = new Promise(function(resolve, reject) {
//     console.log('lottery draw is happening 🔮');

//     setTimeout(() => {
//         if (Math.random() >= 0.5) {
//             resolve('You won the lottery 😀')
//         } else {
//             reject('You lost your money 💩')
//         }
//     }, 2000)
// })

// consuming the Promise
// lotteryPromise.then(res => console.log(res)).catch(err => console.error(err))

// Promisifying setTimeout
// const wait = function(seconds) {
//     return new Promise(function (resolve) {
//         setTimeout(resolve, seconds * 1000)
//     })
// }

// wait(1)
//     .then(() => {
//         console.log('1 second passed')
//         return wait(1)
//     })
//     .then(() => {
//         console.log('2 seconds passed')
//         return wait(1)
//     })
//     .then(() => {
//         console.log('3 seconds passed')
//         return wait(1)
//     })
//     .then(() => console.log('4 seconds passed'))

// Promise.resolve('abc').then(res => console.log(res))
// Promise.reject(new Error('Failed!')).catch(err => console.error(err))

// Promisifying Geolocation API
// const getPosition = function() {
//     return new Promise((resolve, reject) => {
//         // navigator.geolocation.getCurrentPosition(
//         //     position => resolve(position),
//         //     err => reject(err)
//         // )
//         navigator.geolocation.getCurrentPosition(resolve, reject)
//     })
// }

// getPosition().then(pos => console.log(pos)).catch(err => console.error(err))

// const whereAmI = (lat, lon) => {
// const whereAmI = () => {
//     getPosition().then(pos => {
//         const {latitude: lat, longitude: lon} = pos.coords;
   
//         return fetch(`https://geocode.xyz/${lat},${lon}?geoit=json`);
//     })
//     .then(response => {
//         if (!response.ok) throw new Error(`Error fetching data: ${response.status} 💥💥`)
//         return response.json()
//     })
//     .then(data => {
//         console.log(`You are in ${data.city}, ${data.country}`);
//         getCountryInfo(data.country)
//     })
//     .catch(err => {
//         // console.error(`You are reloading too fast, please wait at least 5 secs! ${err}`);
//         console.error(err);
//     })
//     // console.log({lat, lon});
// }

// btn.addEventListener('click', whereAmI)


///////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.
Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉
PART 1
1. Create a function 'createImage' which receives imgPath as an input. This function returns a promise which creates a new image (use document.createElement('img')) and sets the .src attribute to the provided image path. When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise.
If this part is too tricky for you, just watch the first part of the solution.
PART 2
2. Comsume the promise using .then and also add an error handler;
3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier;
4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉);
5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.
TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.
GOOD LUCK 😀
*/


const wait = function(seconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, seconds * 1000)
    })
}

let image;
function createImage(path) {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.src = path;

        img.addEventListener('load', () => {
            image = img;
            imagesContainer.insertAdjacentElement('beforebegin', image);
            resolve(img);
        })

        img.addEventListener('error', () => {
            reject(new Error('Error loading image'));
        })
    })
}


// createImage('img/img-1.jpg')
//     .then(resolve => {
//         console.log(resolve);
//         return wait(2);
//     })
//     .then(() => {
//         image.style.display = 'none';
//         return wait(2);
//     })
//     .then(() => {
//         image.style.display = 'none';
//         createImage('img/img-2.jpg');
//         return wait(2);
//     })
//     .then(() => {
//         image.style.display = 'none';
//         createImage('img/img-3.jpg')
//     })
//     .catch(err => console.error(err))


// createImage('img/img-1.jpg')
//     .then(resolve => {
//         // console.log(resolve);
//         return wait(2);
//     })
//     .then(() => {
//         image.style.display = 'none';
//         return createImage('img/img-2.jpg');
//     })
//     .then(() => {
//         return wait(2);
//     })
//     .then(() => {
//         image.style.display = 'none';
//         createImage('img/img-3.jpg')
//     })
//     .catch(err => console.error(err))



const getPosition = function() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}


    // fetch(`https://restcountries.com/v3.1/name/${country}`).then(res => console.log(res));

const whereAmI = async function() {
    try {
        // Geolocation
        const position = await getPosition();
        const {latitude: lat, longitude: lon} = position.coords;
    
        // Reverse geocoding
        const resGeo = await fetch(`https://geocode.xyz/${lat},${lon}?geoit=json`);
        // const resGeo = await fetch(`https://google-maps-geocoding.p.rapidapi.com/geocode/json?latlng=40.714224%2C-73.96145&language=en`);
        if (!resGeo.ok) throw new Error('Problem getting location data');

        const dataGeo = await resGeo.json();
        // console.log(dataGeo);

        // Country data
        
        const res = await fetch(`https://restcountries.com/v3.1/name/${dataGeo.country}`);
        if (!res.ok) throw new Error('Problem getting country data');
        
        const data = await res.json();
        
        renderCountry(data[0]);

        return `You are in ${dataGeo.city}, ${dataGeo.country}`;
    } catch (err) {
        renderError('Something went wrong' + ', ' + err.message);
        throw err;
    }
}
console.log('1: Will get location');
// btn.addEventListener('click', 
//     () => whereAmI()
//         .then(
//             city => console.log(city)
//         )
// );

// Getting return value using fetch/then
// whereAmI()
//     .then(city => console.log(`2: ${city}`))
//     .catch(err => console.error(err.message))
//     .finally(() => console.log('3: Finished getting location'));


// Getting return value using async/await
// (async () => {
//     try {
//         const city = await whereAmI();
//         console.log(`2: ${city}`);
//     } catch (err) {
//         console.log(`2: ${err.message}`);
//     }
//     console.log('3: Finished getting location');
// })()


// try {
//     let y = 1;
//     const x = 2;
//     x = 3;
// } catch (err) {
//     alert(err.message)
// }

// Promise combinator (Promise.all)
const get3Countries = async function(c1, c2, c3) {
    try {
        // const [data1] = await 
        // const [data2] = await 
        // const [data3] = await 

        const data = await Promise.all([
            getJSON(`https://restcountries.com/v3.1/name/${c1}`),
            getJSON(`https://restcountries.com/v3.1/name/${c2}`),
            getJSON(`https://restcountries.com/v3.1/name/${c3}`)
        ])

        console.log(data.map(d => console.log(d[0].capital)));
        // console.log(data1.capital);
        // console.log(data2.capital);
        // console.log(data3.capital);
    } catch (err) {
        
    }
}

get3Countries('nigeria', 'ghana', 'cameroon');

// Promise.race
(async function () {
    const res = await Promise.race([
        getJSON(`https://restcountries.com/v3.1/name/tanzania`),
        getJSON(`https://restcountries.com/v3.1/name/egypt`),
        getJSON(`https://restcountries.com/v3.1/name/mexico`)
    ])
    console.log(res[0]);
})()

const timeout = function(sec) {
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error('Request took too long!'))
        }, sec * 1000)
    })
}

Promise.race([
    getJSON(`https://restcountries.com/v3.1/name/mexico`),
    timeout(0.1)
])
.then(res => console.log(res[0]))
.catch(err => console.error(err))


Promise.allSettled([
    Promise.resolve('Success'),
    Promise.reject('Error'),
    Promise.resolve('Another Success'),
])
.then(res => console.log(res))
.catch(err => console.error(err))


Promise.any([
    Promise.resolve('Success'),
    Promise.resolve('Another Success'),
    Promise.reject('Error'),
])
.then(res => console.log(res))
.catch(err => console.error(err))

