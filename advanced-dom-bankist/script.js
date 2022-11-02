'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 =  document.querySelector('#section--1');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Smooth scrolling

btnScrollTo.addEventListener('click', e => {
  const s1cords = section1.getBoundingClientRect();

  console.log(s1cords);

  // console.log(e.target.getBoundingClientRect());
  // console.log(window.scrollX, window.scrollY);
  // console.log('Height/width of viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);

  // Scrolling
  // window.scrollTo(s1cords.left + window.scrollX, s1cords.top + window.scrollY);
  
  // window.scrollTo({
  //   left: s1cords.left + window.scrollX,
  //   top: s1cords.top + window.scrollY,
  //   behavior: 'smooth',
  // })

  // Only in modern broswsers
  section1.scrollIntoView({behavior: 'smooth'})
})

// Page Navigation
// document.querySelectorAll('.nav__link').forEach(el => {
//   el.addEventListener('click', (e) => {
//     e.preventDefault();

//     // const id = this.getAttribute('href');
//     const id = e.target.getAttribute('href');

//     document.querySelector(id).scrollIntoView({behavior: 'smooth'})
//   })
// }); inefficient system


// Event Delegation Method
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', (e) => {
  e.preventDefault();

  // Mathing strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
});


///////////////////////
///////////////////////
// Lessons

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

//  Creating and inserting elements
// .insertAdjacentHTML

// const header = document.querySelector('header');

// const message = document.createElement('div');
// message.classList.add('cookie-message');

// message.innerHTML = "We use cookies for improved functionality and analytics <button class='btn btn--close-cookie'> Got it! </button>"

// header.append(message)
// document.querySelector('.btn--close-cookie')
//   .addEventListener('click', () => {
//   // message.parentElement.removeChild(message);
//     message.remove();
//   });

// Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '104.75%';

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

// message.style.height = Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered')

// // Attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.src);
// console.log(logo.getAttribute('src'));

// // Data attribute
// console.log(logo.dataset.versionNumber);

// Classes
// logo.classList.add();
// logo.classList.remove();
// logo.classList.toggle();
// logo.classList.contains();

/*
// Smooth scrolling
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 =  document.querySelector('#section--1');

btnScrollTo.addEventListener('click', e => {
  const s1cords = section1.getBoundingClientRect();

  console.log(s1cords);

  // console.log(e.target.getBoundingClientRect());
  // console.log(window.scrollX, window.scrollY);
  // console.log('Height/width of viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);

  // Scrolling
  // window.scrollTo(s1cords.left + window.scrollX, s1cords.top + window.scrollY);
  
  // window.scrollTo({
  //   left: s1cords.left + window.scrollX,
  //   top: s1cords.top + window.scrollY,
  //   behavior: 'smooth',
  // })

  // Only in modern broswsers
  section1.scrollIntoView({behavior: 'smooth'})
})
*/