/* Simple Slider */

// const slides = document.querySelectorAll(".footer__slides"),
//   prev = document.querySelector(".prev"),
//   next = document.querySelector(".next");

// let circles = document.querySelectorAll(".circle");
// let slideIndex = 1;

// showSlides(slideIndex);
// changeColorOfCircles();

// let slidesPlay;

// function setSlidesInterval() {
//   slidesPlay = setInterval(function play() {
//     slideIndex += 1;
//     checkIndex(slideIndex);
//     showSlides();
//     changeColorOfCircles();
//   }, 4000);
// }
// setSlidesInterval();

// function currentSlide(n) {
//   showSlides((slideIndex = n));
//   changeColorOfCircles();
// }

// function checkIndex(n) {
//   if (n > slides.length) {
//     slideIndex = 1;
//   }
//   else if (n < 1) {
//     slideIndex = slides.length;
//   }
// }

// function showSlides(n) {
//   checkIndex(n);

//   for (let i = 0; i < slides.length; i++) {
//     slides[i].style.display = "none";
//   }
//   for (let i = 0; i < circles.length; i++) {
//     circles[i].className = circles[i].className.replace("active", "");
//   }
//   slides[slideIndex - 1].style.display = "block";
//   circles[slideIndex - 1].style.display += "active";
// }

// function changeColorOfCircles() {
//   circles.forEach((e) => {
//     e.classList.remove("circles-hover");
//   });
//   circles[slideIndex - 1].classList.add("circles-hover");
// }

// prev.addEventListener("click", () => {
//   showSlides((slideIndex -= 1));
//   changeColorOfCircles();
//   clearInterval(slidesPlay);
//   setSlidesInterval();
// });
// next.addEventListener("click", () => {
//   showSlides((slideIndex += 1));
//   changeColorOfCircles();
//   clearInterval(slidesPlay);
//   setSlidesInterval();
// });

/* Draggable slider */

import Swiper from "https://cdn.jsdelivr.net/npm/swiper@8/swiper-bundle.esm.browser.min.js";

const swiper = new Swiper(".image-slider", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  grabCursor: true,
  keyboard: {
    enabled: true,
    onlyViewport: true,
    pageUpDown: true,
  },

  slidesPerView: 1,
  spaceBetween: 30,
  centeredSlide: true,
  initialSlide: 2,
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },

  speed: 700,
  loop: true,
  loopedSlides: 4,
  breakpoints: {
    661: {
      slidePerView: 1,
    },
  },
});
let burgersInLocalStorage = JSON.parse(localStorage.getItem("burgers"));
const totalBurgersCounter = document.querySelector(".header__order-counter a");

if (burgersInLocalStorage !== null) {
  if (burgersInLocalStorage.length > 0) {
    totalBurgersCounter.parentElement.style.display = "flex";

    totalBurgersCounter.textContent = burgersInLocalStorage.length;
  } else {
    totalBurgersCounter.parentElement.style.display = "none";
  }
} else {
  burgersInLocalStorage = [];

  totalBurgersCounter.parentElement.style.display = "none";
}
/* Buttons */
