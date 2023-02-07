window.addEventListener('load', () => {

  loadIntoBurgerSlider();

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

  /* Show modal */

  function showPopup() {
    buttonConfirm.addEventListener("click", (e) => {
      e.preventDefault();
      popup.classList.add("show_popup");
      body.style.overflow = "hidden";
      closeModal();
    });
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
    }
  }



  function loadIntoBurgerSlider() {
    const burgersFromLocalStorage = JSON.parse(localStorage.getItem('burgers'));
    const totalBurgersCounter = document.querySelector('.header__order-counter a');
    if (burgersFromLocalStorage === null) {

      totalBurgersCounter.textContent = '0';
    } else {
      totalBurgersCounter.textContent = burgersFromLocalStorage.length;
    }

    const burgersCarousel = document.querySelector('#burgers-carousel');


    let burgersCarouselInside = '';

    burgersFromLocalStorage.forEach(burger => {
      let burgerInside = '';
      burger.forEach(ingridientUrl => {

        burgerInside += `<img class="burger-ingridient" src="${ingridientUrl}">`


      });
      burgersCarouselInside += `<div class="burger">${burgerInside}</div>`;
    });
    burgersCarousel.innerHTML = burgersCarouselInside;

    const burgersInside = document.querySelectorAll('.burger');

    burgersInside.forEach(burger => {
      const ingridientsInBurger = burger.querySelectorAll('.burger-ingridient');
      const zIndices = [...Array(ingridientsInBurger.length).keys()].reverse().map(i => i);

      ingridientsInBurger.forEach((ingridient, i) => {
        ingridient.style.position = 'relative';
        ingridient.style.zIndex = zIndices[i];

      })
    })

  }

  function sumOrder() {
    const burgersFromLocalStorage = JSON.parse(localStorage.getItem('burgers'));
    const windowListOrder = document.querySelector(".window__list");
    const totalSum = document.querySelector('.main__total');


    let counter = 0;

    if (burgersFromLocalStorage.length > 0) {
      burgersFromLocalStorage.forEach(burger => {
        counter++;
        let li = document.createElement('li');
        li.innerHTML = `Burger #${counter} - ${burger.length}$`;
        windowListOrder.append(li);
      })



      let totalSumOrder = document.createElement('a');
      let totalPrice = 0;
      burgersFromLocalStorage.forEach(burger => {
        totalPrice += burger.length;
      })
      totalSumOrder.innerHTML = `<span>Total:</span> ${totalPrice}$`;
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


  }
  sumOrder();

});