const buttonConfirm = document.querySelector(".button__main-confirm");
const body = document.querySelector("body");
const popup = document.querySelector(".popup");
const popupBody = document.querySelector(".popup__body");
const popupCloseButton = document.querySelector(".popup__close");
const popupButtonConfirm = document.querySelector(".popup__button button");
const popupTitle = document.querySelector(".popup__title");
const popupThanks = document.querySelector(".popup__thanks");

const inputs = document.querySelectorAll("input");
const inputNumber = document.getElementById("phone_number");

const emptyOrder = document.querySelector(".popup__thanks p");

/* Show modal */

function showPopup() {
  if (localStorage.length > 0) {
    buttonConfirm.addEventListener("click", (e) => {
      e.preventDefault();
      popup.classList.add("show_popup");
      body.style.overflow = "hidden";
      closeModal();
    });
  } else {
    let timer;
    buttonConfirm.addEventListener("click", (e) => {
      e.preventDefault();
      clearTimeout(timer);
      popup.classList.add("show_popup");
      body.style.overflow = "hidden";
      popupTitle.classList.add("hide_title");
      emptyOrder.innerHTML = 'Please, check your order';
      popupThanks.classList.add("show_thanks");
      timer = setTimeout(() => {
        popup.classList.remove("show_popup");
        body.style.overflow = "";
      }, 4000);
      closeModal();
    });
  }
}
showPopup();


/* Close first window */

function popupTitleClose() {
  inputs.forEach((item) => {
    popupButtonConfirm.addEventListener("click", (event) => {
      event.preventDefault();
      hideTitle();
    });

    popupButtonConfirm.addEventListener("click", (e) => {
      if (item.value.trim().length === 0) {
        e.preventDefault();
        wrongInput(item);
        item.addEventListener("keydown", () => {
          item.style = "";
        });
      }
    });
  });
}
popupTitleClose();

/* Close modal window */

function closeModal() {
  popupCloseButton.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.remove("show_popup");
    body.style.overflow = "";
  });
}

function closeModalOutside() {
  popupBody.addEventListener("click", (e) => {
    if (e.target === popupBody) {
      popup.classList.remove("show_popup");
      body.style.overflow = "";
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.code === "Escape") {
      popup.classList.remove("show_popup");
      body.style.overflow = "";
    }
  });
}
closeModalOutside();

/* Check wrong input */

function wrongInput(element) {
  element.style = "border: 3px solid red; animation: justshake 0.3s forwards";
}

function hideTitle() {
  let isEmpty = false;
  inputs.forEach((item) => {
    if (item.value.trim().length === 0) {
      isEmpty = true;
    }
  });

  if (!isEmpty) {
    popupTitle.classList.add("hide_title");
    popupThanks.classList.add("show_thanks");
    setTimeout(() => {
      popup.classList.remove("show_popup");
      body.style.overflow = "";
    }, 4000);
    localStorage.clear();
  }
}

/* function sum order */

function sumOrder() {
  const windowListOrder = document.querySelector(".window__list");
  const totalSum = document.querySelector('.main__total');
  const headerLogo = document.querySelector('.header__text');

  let counter = 0;

  if (localStorage.length > 0) {
    for (let i = 2; i <= localStorage.length; i++) { 
      counter++;
      let li = document.createElement('li');
      li.innerHTML = localStorage.getItem(`Burger #${counter}`);
      windowListOrder.append(li);
    }

    let totalSumOrder = document.createElement('a');
    totalSumOrder.innerHTML = `<span>Total:</span> ${localStorage.getItem('Total')}$`;
    totalSum.append(totalSumOrder);
  } else {
    const aFirstTag = document.createElement('a');
    aFirstTag.innerHTML = 'There is nothing to order :(';
    windowListOrder.append(aFirstTag);
    const aSecondTag = document.createElement('a');
    aSecondTag.innerHTML = '* Before ordering, create your burger in the "kitchen" section *';
    windowListOrder.append(aSecondTag);

    let totalSumOrder = document.createElement('a');
    totalSumOrder.innerHTML = `<span>Total:</span> 0$`;
    totalSum.append(totalSumOrder);
  }

  headerLogo.addEventListener('click', () => {
    localStorage.clear();
  });
}
sumOrder();
