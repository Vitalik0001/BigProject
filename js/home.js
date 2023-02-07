/* Slider */


const slides = document.querySelectorAll(".footer__slides"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next");
console.log(slides);

let circles = document.querySelectorAll(".circle");
let slideIndex = 1;

showSlides(slideIndex);
changeColorOfCircles();

let slidesPlay;

function setSlidesInterval() {
  slidesPlay = setInterval(function play() {
    slideIndex += 1;
    checkIndex(slideIndex);
    showSlides();
    changeColorOfCircles();
  }, 4000);
}
setSlidesInterval();

function currentSlide(n) {
  showSlides((slideIndex = n));
  changeColorOfCircles();
}

function checkIndex(n) {
  if (n > slides.length) {
    slideIndex = 1;
  }
  else if (n < 1) {
    slideIndex = slides.length;
  }
}

function showSlides(n) {
  checkIndex(n);

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (let i = 0; i < circles.length; i++) {
    circles[i].className = circles[i].className.replace("active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  circles[slideIndex - 1].style.display += "active";
}

function changeColorOfCircles() {
  circles.forEach((e) => {
    e.classList.remove("circles-hover");
  });
  circles[slideIndex - 1].classList.add("circles-hover");
}

prev.addEventListener("click", () => {
  showSlides((slideIndex -= 1));
  changeColorOfCircles();
  clearInterval(slidesPlay);
  setSlidesInterval();
});
next.addEventListener("click", () => {
  showSlides((slideIndex += 1));
  changeColorOfCircles();
  clearInterval(slidesPlay);
  setSlidesInterval();
});
const burgersFromLocalStorage = JSON.parse(localStorage.getItem('burgers'));
const totalBurgersCounter = document.querySelector('.header__order-counter a');
if (burgersFromLocalStorage === null) {

  totalBurgersCounter.textContent = '0';
} else {
  totalBurgersCounter.textContent = burgersFromLocalStorage.length;
}
/* Buttons */
