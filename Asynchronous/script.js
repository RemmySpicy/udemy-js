'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderError = (msg) => {
    countriesContainer.insertAdjacentText("beforeend", msg)
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

const request = fetch('https://restcountries.com/v3.1/name/nigeria')
console.log(request);

const getCountryData = (country) => {
    // country 1
    fetch(`https://restcountries.com/v3.1/name/${country}`)
        .then(response => response.json())
        .then(data => {
            renderCountry(data[0]);
            const neighbour = data[0].borders[0];

            if (!neighbour) return;
            
            // country 2
            return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`)
        })
        .then(response => response.json())
        .then(data => renderCountry(data[0], 'neighbour'))
        .catch(err => {
            console.alert(`${err} 💥`);
            renderError(`Something went wrong 💥 ${err.message} Try again`);
        })
        .finally(() => {
            countriesContainer.style.opacity = 1;
        });
}

btn.addEventListener('click', function() {
    getCountryData('nigeria')
})