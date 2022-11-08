'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 =  document.querySelector('#section--1');
const nav = document.querySelector('.nav');

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

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
});

///// Tabbed Component
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

// tabs.forEach(t => t.addEventListener('click', () => {
//   console.log('tab');
// })) 
// Bad practice!!!   Use Event delegation instead

tabsContainer.addEventListener('click', (e) => {
  const clicked = e.target.closest('.operations__tab');

  // Precent Error Incase of container click in no button area
  if (!clicked) return;
  
  // Remove active tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  
  // Set Active tab
  clicked.classList.add('operations__tab--active');

  // Remove Active content
  tabsContent.forEach(tc => tc.classList
    .remove('operations__content--active'));

  // Set Active content
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
})

///// Nav menu fade animation
const handleHover = (e, opacity) => {
  // console.log(this);
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      // if (el !== link) el.style.opacity = this;
      if (el !== link) el.style.opacity = opacity;
    })
    // logo.style.opacity = this;
    logo.style.opacity = opacity;
  }
}

// nav.addEventListener('mouseover', handleHover.bind(0.5))
nav.addEventListener('mouseover', (e) => handleHover(e, 0.5))
// nav.addEventListener('mouseover', function (e) {
  // handleHover(e, 0.5)
// });
  
// nav.addEventListener('mouseout', handleHover.bind(1))
nav.addEventListener('mouseout', (e) => handleHover(e, 1))
// nav.addEventListener('mouseout', function(e) {
  // handleHover(e, 1)
// });

const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// Sticky Navigation 
// window.addEventListener('scroll', (e) => {
  // if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
  // else nav.classList.remove('sticky');
// })
// Bad practice to listen to scroll event due to performance

// Using intersection API
// const obsCallBack = (entries, observer) => {
//   entries.forEach(entry => console.log(entry))
// }

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// }
// const observer = new IntersectionObserver(obsCallBack, obsOptions)
// observer.observe(section1);

const header = document.querySelector('.header');

///// To get navbar height and set it to fixed at appropriate time
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = (entries) => {
  const [entry] = entries;
  
  if (entry.isIntersecting === false) nav.classList.add('sticky');
  else nav.classList.remove('sticky')
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
})

headerObserver.observe(header);

///// Reveal sections with animations
const allSections = document.querySelectorAll('.section');

const revealSection = (entries, observer) => {
  const [entry] = entries;

  // To stop the first default entry from taking effect
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  
  // For better performance, unobserve since we don't need the event anymore
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null, // means root is viewport
  threshold: 0.15,
})

allSections.forEach(section => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden')
});

///// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImage = (entries, observer) => {
  const [entry] = entries;
  
  // Guard clause to return early without default intersection
  if (!entry.isIntersecting) return;

  // Replace src value with data-src value
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });

  // unobserve target for performance
  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImage, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
})

imgTargets.forEach(img => imgObserver.observe(img));

///// Slider
const sliders = () => {
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');

  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');

  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;


  ///// Functions
  // Create dots that show in the slides
  const createDots = () => {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML("beforeend", `
      <button class='dots__dot' data-slide='${i}'></button>
      `)
    })
  }

  // Show which slide we are on
  const activateDot = (slide) => {
    document.querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    // Using optional chaining to avoid error if target isn't well clicked, incase there's no precaution taken in origin function
    document.querySelector(`.dots__dot[data-slide='${slide}']`)
      ?.classList.add('dots__dot--active')
  };

  const goToSlide = (slide) => {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
    activateDot(slide);
  }

  const nextSlide = () => {
    if (curSlide === maxSlide - 1) curSlide = 0;
    else curSlide++;

    goToSlide(curSlide);
    activateDot(curSlide);
  }

  const prevSlide = () => {
    if (curSlide === 0) curSlide = maxSlide - 1;
    else curSlide--;
    
    goToSlide(curSlide);
    activateDot(curSlide);
  }

  const init = () => {
    // start slide at 0
    createDots();
    goToSlide(0);
    activateDot(0);
  }
  init();

  ////// Event handlers
  // Prev slide
  btnLeft.addEventListener('click', prevSlide)
  // Next slide
  btnRight.addEventListener('click', nextSlide);

  // Slide with keyboard
  document.addEventListener('keydown', (e) => {
    // method 1
    if (e.key === 'ArrowRight') nextSlide();
    // short circuting method;
    e.key === 'ArrowLeft' && prevSlide();
  })

  dotContainer.addEventListener('click', (e) => {
    // if (e.target.classList.contains('dots__dot')) console.log('dot');
    // const slide = e.target.dataset.slide;

    // Avoid the dot deactivation when target isn't a dot
    if (!e.target.dataset.slide) return;
    
    const {slide} = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  })
};
sliders();




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

/*
document.addEventListener('DOMContentLoaded', (e) => {
  console.log('HTML parsed and DOM tree built!', e);
})

window.addEventListener('load', (e) => console.log('Page fully loaded', e));

window.addEventListener('beforeunload', (e) => {
  e.preventDefault();
  console.log(e);
  // e.returnValue = '';
})
*/