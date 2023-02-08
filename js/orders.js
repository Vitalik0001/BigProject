window.addEventListener("load", () => {
  loadIntoBurgerSlider();

  const buttonConfirm = document.querySelector(".button__main-confirm");
  const body = document.querySelector("body");
  const popup = document.querySelector(".popup");
  const popupBody = document.querySelector(".popup__body");
  const popupCloseButton = document.querySelector(".popup__close");
  const popupButtonConfirm = document.querySelector(".popup__button button");
  const popupTitle = document.querySelector(".popup__title");
  const popupThanks = document.querySelector(".popup__thanks");
  const popupEmptyOrder = document.querySelector(".popup__empty-order");

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
      localStorage.clear();
      setTimeout(() => {
        popup.classList.remove("show_popup");
        body.style.overflow = "";
        location.reload();
      }, 4000);
    }
  }

  function loadIntoBurgerSlider() {
    const burgersCarousel = document.querySelector("#burgers-carousel");
    let burgersFromLocalStorage = JSON.parse(localStorage.getItem("burgers"));
    const totalBurgersCounter = document.querySelector(
      ".header__order-counter a"
    );
    if (burgersFromLocalStorage) {
      totalBurgersCounter.textContent = burgersFromLocalStorage.length;
    } else {
      burgersFromLocalStorage = [];

      totalBurgersCounter.remove();
      localStorage.removeItem("burgers");
    }

    let burgersCarouselInside = "";
    if (burgersFromLocalStorage) {
      burgersFromLocalStorage.forEach((burger) => {
        let burgerInside = "";
        burger.forEach((ingridientUrl) => {
          burgerInside += `<img class="burger-ingridient" src="${ingridientUrl}">`;
        });
        burgersCarouselInside += `<div class="burger">${burgerInside}</div>`;
      });
    }
    burgersCarousel.innerHTML += burgersCarouselInside;

    const burgersInside = document.querySelectorAll(".burger");

    burgersInside.forEach((burger) => {
      const ingridientsInBurger = burger.querySelectorAll(".burger-ingridient");
      const zIndices = [...Array(ingridientsInBurger.length).keys()]
        .reverse()
        .map((i) => i);

      ingridientsInBurger.forEach((ingridient, i) => {
        ingridient.style.position = "relative";
        ingridient.style.zIndex = zIndices[i];
        ingridient.setAttribute("draggable", false);
      });
    });
    if (burgersFromLocalStorage == null) {
      localStorage.removeItem('burgers');
    }
  }
  function setPrice(number) {
    switch (number) {
      case 1:
        return 1;
      case 2:
        return 1;
      case 3:
        return 1;
      case 4:
        return 1;
      case 25:
        return 1;
      case 6:
        return 1;
      case 7:
        return 1;
      case 8:
        return 1;
      case 9:
        return 1;
      case 10:
        return 2;
      case 11:
        return 2;
      case 12:
        return 3;
      case 13:
        return 1;
      case 14:
        return 2;
      case 15:
        return 1;
      case 16:
        return 4;
      case 17:
        return 1;
      case 18:
        return 2;
      case 19:
        return 1;
      case 20:
        return 4;
      case 21:
        return 2;
      case 22:
        return 1;
      case 23:
        return 3;
      case 24:
        return 1;
      default:
        return;
    }
  }
  function extractNumberFromString(string) {
    var result = string.match(/\d+/g);
    if (result) {
      return result.join("");
    }
    return "";
  }

  function sumOrder() {
    const burgersFromLocalStorage = JSON.parse(localStorage.getItem("burgers"));
    const windowListOrder = document.querySelector(".window__list");
    const mainTotal = document.querySelector(".main__total");
    const totalSum = document.querySelector(".main__total");
    const textOrderEmpty = document.querySelector(".window__text");
    const mainWindow = document.querySelector(".main__window");
    const burgersCarousel = document.getElementById('burgers-carousel');

    windowListOrder.innerHTML = "";
    totalSum.innerHTML = "";
    let counter = 0;

    if (burgersFromLocalStorage && burgersFromLocalStorage.length > 0) {
      burgersFromLocalStorage.forEach((burger) => {
        counter++;
        let priceOfBurger = 0;
        let li = document.createElement("li");
        burger.forEach((ingridient) => {
          priceOfBurger += setPrice(+extractNumberFromString(ingridient));
        });
        li.innerHTML = `Burger #${counter} - ${priceOfBurger}$`;
        windowListOrder.append(li);
      });
      burgersCarousel.style = 'overflow: visibility; opacity: 1;';
      let totalSumOrder = document.createElement("a");
      mainTotal.style = 'overflow: visibility; opacity: 1;';
      let totalPrice = 0;
      burgersFromLocalStorage.forEach((burger) => {
        burger.forEach((ingridient) => {
          totalPrice += setPrice(+extractNumberFromString(ingridient));
        });
      });
      totalSumOrder.innerHTML = `<span>Total:</span> ${totalPrice}$`;
      totalSum.append(totalSumOrder);
      showPopup();
    } else {
      const aFirstTag = document.createElement("a");
      textOrderEmpty.style = 'align-self: center';
      mainWindow.style = 'padding-left: 55px;';
      aFirstTag.innerHTML = "There is nothing to order :(";
      windowListOrder.append(aFirstTag);
      mainTotal.style = 'overflow: hidden; opacity: 0;';
      const aSecondTag = document.createElement("a");
      aSecondTag.innerHTML =
        '* Before ordering, create your burger in the "kitchen" section *';
      windowListOrder.append(aSecondTag);
      let timer;
      burgersCarousel.style = 'display: none';
      buttonConfirm.addEventListener("click", (e) => {
        e.preventDefault();
        clearTimeout(timer);
        popup.classList.add("show_popup");
        body.style.overflow = "hidden";
        popupTitle.classList.add("hide_title");
        popupEmptyOrder.classList.add("show_thanks");
        timer = setTimeout(() => {
          popup.classList.remove("show_popup");
          body.style.overflow = "";
          location.reload();
        }, 4000);
        closeModal();
      });

      let totalSumOrder = document.createElement("a");
      totalSumOrder.innerHTML = `<span>Total:</span> 0$`;
      totalSum.append(totalSumOrder);
    }
  }
  sumOrder();

  let burgerList = document.querySelectorAll(".burger");
  const burgerNumber = document.querySelector(".burger-number");
  const prevButton = document.querySelector(".arrow-previous");
  const nextButton = document.querySelector(".arrow-next");
  const burgersCarousel = document.querySelector("#burgers-carousel");
  const deleteBurger = document.querySelector(".delete-burger");

  let currentIndex = 0;
  burgerNumber.innerHTML = "#" + `${currentIndex + 1}`;

  loadBurgerOnSlider();

  deleteBurger.addEventListener("click", (e) => {
    e.preventDefault();
    // const totalBurgersCounter = document.querySelector('.header__order-counter a');
    const activeBurger = document.querySelector(".burger.active");
    activeBurger.remove();
    burgerList = document.querySelectorAll(".burger");
    currentIndex = (currentIndex - 1 + burgerList.length) % burgerList.length;
    burgerNumber.innerHTML = "#" + `${currentIndex + 1}`;

    loadBurgerOnSlider();
    saveBurgers();
    sumOrder();
  });

  nextButton.addEventListener("click", () => {
    burgerList[currentIndex].classList.remove("active");
    currentIndex = (currentIndex - 1 + burgerList.length) % burgerList.length;
    loadBurgerOnSlider();
    burgersCarousel.style.height =
      burgerList[currentIndex].children.length * 40 + "px";
    if (burgerList[currentIndex].children.length * 50 < 300) {
      burgersCarousel.style.height = "300px";
    }
    burgerNumber.innerHTML = "#" + `${currentIndex + 1}`;
  });

  prevButton.addEventListener("click", () => {
    burgerList[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % burgerList.length;
    loadBurgerOnSlider();
    burgersCarousel.style.height =
      burgerList[currentIndex].children.length * 40 + "px";
    if (burgerList[currentIndex].children.length * 50 < 300) {
      burgersCarousel.style.height = "300px";
    }
    burgerNumber.innerHTML = "#" + `${currentIndex + 1}`;
  });

  function loadBurgerOnSlider() {
    if (burgerList[currentIndex] == undefined) {
      return;
    }
    burgerList[currentIndex].classList.add("active");
  }

  function saveBurgers() {
    const burgersToLocalStorage = [];
    const burgersToSave = document.querySelectorAll(".burger");
    burgersToSave.forEach((burger) => {
      const ingridientsInBurger = burger.querySelectorAll(
        "img.burger-ingridient"
      );
      if (ingridientsInBurger.length > 0) {
        const burgerIngridientsArray = [];
        ingridientsInBurger.forEach((ingridient) => {
          const url = new URL(ingridient.src);
          burgerIngridientsArray.push(url.pathname);
        });
        burgersToLocalStorage.push(burgerIngridientsArray);
        localStorage.setItem(`burgers`, JSON.stringify(burgersToLocalStorage));
        console.log("success");
      }
    });

    localStorage.setItem("burgers", JSON.stringify(burgersToLocalStorage));
  }
});


