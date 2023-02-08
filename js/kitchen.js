window.addEventListener("load", () => {
  let draggables = document.querySelectorAll(".draggable");

  const burger = document.querySelector(".burger"),
    trash = document.querySelector(".trash"),
    trashLid = document.querySelector(".trash-lid"),
    saveButton = document.querySelector(".button__main-confirm"),
    clearButton = document.querySelector(".button__main-clear"),
    buttonField = document.querySelector(".button"),
    popUp = document.querySelector("#popup"),
    deleteModalButtonYes = document.querySelector(".delete-modal__main-clear"),
    deleteModalButtonNo = document.querySelector("#button-cancel"),
    body = document.querySelector("body"),
    deleteModal = document.querySelector(".delete-modal"),
    deleteModalBody = document.querySelector(".delete-modal__body"),
    deleteModalCloseButton = document.querySelector(".delete-modal__close"),
    instructionsButtonOk = document.querySelector(".instructions__main-ok"),
    instructionsModal = document.querySelector(".instructions"),
    instructionsModalBody = document.querySelector(".instructions__body"),
    instructionsModalCloseButton = document.querySelector(
      ".instructions__close"
    ),
    burgerMakerKitchen = document.querySelector(".burger-maker__kitchen"),
    wrapper = document.querySelector(".wrapper");

  //check phone direction
  const rotateModal = document.querySelector(".rotate-gif-modal");
  if (screen.height < 520) {
    burgerMakerKitchen.style.marginTop = "17vh";
  }
  if (screen.height < 1200 && screen.height > 520) {
    burgerMakerKitchen.style.marginTop = "-5vh";
  }
  if (window.matchMedia("(orientation:portrait)").matches) {
    rotateModal.style.display = "block";
    body.style.overflow = "hidden";
    wrapper.style.display = "none";
  }
  function checkOrientation() {
    if (screen.height < 520) {
      burgerMakerKitchen.style.marginTop = "25vh";
    }
    if (!window.matchMedia("(orientation:portrait)").matches) {
      wrapper.style.display = "none";
      rotateModal.style.display = "block";
      body.style.overflow = "hidden";
    } else {
      rotateModal.style.display = "none";
      body.style.overflow = "";
      wrapper.style.display = "block";
    }
  }

  window.addEventListener("orientationchange", checkOrientation);

  //instructions
  let isInstructed = JSON.parse(localStorage.getItem("isInstructed"));
  console.log(isInstructed);
  if (isInstructed != true) {
    showInstructionsModal();
    localStorage.setItem("isInstructed", JSON.stringify(true));
  } else {
    closeInstructionsModalAtAll();
  }
  function showInstructionsModal() {
    instructionsButtonOk.addEventListener("click", (e) => {
      e.preventDefault();
      closeInstructionsModalAtAll();
    });
    instructionsModal.classList.add("show_popup");

    closeInstructionsModal();
    closeInstructionsModalOutside();
  }

  /* Close modal window */
  function closeInstructionsModalAtAll() {
    instructionsModal.remove();
  }
  function closeInstructionsModal() {
    instructionsModalCloseButton.addEventListener("click", (e) => {
      e.preventDefault();
      closeInstructionsModalAtAll();
    });
  }

  function closeInstructionsModalOutside() {
    instructionsModalBody.addEventListener("click", (e) => {
      if (e.target === instructionsModalBody) {
        closeInstructionsModalAtAll();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.code === "Escape") {
        closeInstructionsModalAtAll();
      }
    });
  }
  //lid
  const lidAnimations = ["trash-open", "trash-open2", "trash-open3"];

  function setRandomLidAnimation() {
    return lidAnimations[Math.floor(Math.random() * lidAnimations.length)];
  }

  // let copyIngridient, copy;
  let firstCalled = true;

  trash.ondragover = (e) => {
    if (!e.target.classList.contains("space-for-lid")) {
      e.preventDefault();
      if (firstCalled) {
        let randomAnimation = setRandomLidAnimation();
        trashLid.classList.add(randomAnimation);
        trashLid.classList.remove("trash-closed");
        firstCalled = false;
      }
    }
  };
  trash.ondragleave = (e) => {
    e.preventDefault();

    trashLid.classList.remove("trash-open");
    trashLid.classList.remove("trash-open2");
    trashLid.classList.remove("trash-open3");

    trashLid.classList.add("trash-closed");
    firstCalled = true;
  };
  trash.ondrop = (e) => {
    e.preventDefault();
    trashLid.classList.remove("trash-open");
    trashLid.classList.remove("trash-open2");
    trashLid.classList.remove("trash-open3");
    trashLid.classList.add("trash-closed");
    firstCalled = true;
    // const draggable = document.querySelector('.dragging');
    // draggable.remove();
  };

  //button

  let isSaved = false;
  const addToBasket = document.createElement("button");

  addToBasket.classList.add("button__main-submit");
  addToBasket.innerHTML = "Add To Basket";
  buttonField.insertBefore(addToBasket, saveButton);
  addToBasket.style.display = "none";

  addToBasket.addEventListener("click", (e) => {
    e.preventDefault();
  });

  function setToSave() {
    clearButton.innerHTML = "Delete";

    allowedToDrag = true;

    saveButton.innerHTML = "Preview";
    isSaved = false;

    burger.querySelectorAll(".draggable").forEach((ingridient) => {
      ingridient.style.marginTop = "-9%";
    });
  }
  function setToEdit() {
    allowedToDrag = false;

    clearButton.innerHTML = "Delete";

    saveButton.innerHTML = "Edit";
    isSaved = true;

    burger.querySelectorAll(".draggable").forEach((ingridient) => {
      ingridient.style.marginTop = "-18%";
      if (screen.height < 600) {
        ingridient.style.marginTop = "-26%";
      }
    });
    let saved = document.createElement("div");
    saved.classList.add("saved");
    saved.innerHTML = "Previewing";
    popUp.innerHTML = "";
    popUp.append(saved);

    setTimeout(() => {
      if (popUp.querySelector(".saved")) {
        popUp.querySelector(".saved").remove();
      }
    }, 3000);
  }
  function sayCantDoIt(text) {
    let sayCantDoIt = document.createElement("div");
    sayCantDoIt.classList.add("cant-do-it");
    sayCantDoIt.innerHTML = `${text}`;
    if (popUp.children.length < 0) {
      popUp.append(sayCantDoIt);
      setTimeout(() => {
        popUp.querySelector(".cant-do-it").remove();
      }, 3000);
    } else {
      popUp.innerHTML = "";
      popUp.append(sayCantDoIt);
      setTimeout(() => {
        popUp.querySelector(".cant-do-it").remove();
      }, 3000);
    }
  }

  function addBurgerToBasket() {
    addToBasket.addEventListener("click", () => {
      let saved = document.createElement("div");
      saved.classList.add("added");
      saved.innerHTML = "Added to basket";
      popUp.innerHTML = "";
      popUp.append(saved);
      saveBurger();
      clearBurger();

      setTimeout(() => {
        if (popUp.querySelector(".added")) {
          popUp.querySelector(".added").remove();
        }
      }, 3000);
    });
  }
  addBurgerToBasket();
  function setZindicesForIngridients() {
    const draggablesInBurger = burger.querySelectorAll(".draggable");
    const zIndices = [...Array(draggablesInBurger.length).keys()]
      .reverse()
      .map((i) => i);

    draggablesInBurger.forEach((draggable, i) => {
      draggable.style.zIndex = zIndices[i];
      draggable.style.cursor = "move";
    });
  }

  let allowedToDrag = true;
  saveButton.addEventListener("click", (e) => {
    e.preventDefault();

    draggables.forEach((draggable) => {
      draggable.addEventListener("mousedown", () => {
        if (!allowedToDrag) {
          sayCantDoIt('Press "Edit" for better experience');
        }
      });
    });

    if (burger.children.length > 1) {
      saveButton.classList.toggle("button__main-confirm");
      saveButton.classList.toggle("button__main-edit");

      if (!isSaved) {
        addToBasket.style.display = "block";
        setToEdit();
      } else {
        addToBasket.style.display = "none";
        setToSave();
      }
    } else {
      sayCantDoIt("Nothing to Preview");
    }
  });
  function showDeleteModal() {
    deleteModal.classList.add("show_popup");
    body.style.overflow = "hidden";
    closeDeleteModal();
  }
  /* Close modal window */
  function closeDeleteModalAtAll() {
    deleteModal.classList.remove("show_popup");
    body.style.overflow = "";
  }
  function closeDeleteModal() {
    deleteModalCloseButton.addEventListener("click", (e) => {
      e.preventDefault();
      closeDeleteModalAtAll();
    });
  }

  function closeDeleteModalOutside() {
    deleteModalBody.addEventListener("click", (e) => {
      if (e.target === deleteModalBody) {
        closeDeleteModalAtAll();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.code === "Escape") {
        closeDeleteModalAtAll();
      }
    });
  }
  deleteModalButtonYes.addEventListener("click", (e) => {
    e.preventDefault();
    closeDeleteModalAtAll();
    clearBurger();
  });

  const clearBurger = () => {
    burger.querySelectorAll(".draggable").forEach((ingridient) => {
      ingridient.remove();
    });

    addToBasket.style.display = "none";
    setToSave();
    saveButton.classList.toggle("button__main-confirm");
    saveButton.classList.toggle("button__main-edit");
  };
  deleteModalButtonNo.addEventListener("click", (e) => {
    e.preventDefault();
    closeDeleteModalAtAll();
  });
  closeDeleteModalOutside();
  closeDeleteModal();
  clearButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (burger.children.length < 1 && !isSaved) {
      sayCantDoIt("Nothing to Delete");
    } else {
      showDeleteModal();
    }
  });

  //slider for draggables
  const sliderLeft = document.querySelector(".kitchen-elements-left"),
    sliderRight = document.querySelector(".kitchen-elements-right"),
    draggablesInSliderLeft = sliderLeft.querySelectorAll(".draggable"),
    draggablesInSliderRight = sliderRight.querySelectorAll(".draggable"),
    nextArrowLeft = document.querySelector(".arrow-next-left"),
    prevArrowLeft = document.querySelector(".arrow-previous-left"),
    nextArrowRight = document.querySelector(".arrow-next-right"),
    prevArrowRight = document.querySelector(".arrow-previous-right");

  let currentIndexLeft = 0,
    currentIndexRight = 0;
  //left draggables scroll
  nextArrowLeft.addEventListener("click", function () {
    currentIndexLeft += 4;
    if (currentIndexLeft >= draggablesInSliderLeft.length) {
      currentIndexLeft = 0;
    }
    scrollToIndex(currentIndexLeft, draggablesInSliderLeft, sliderLeft);
  });

  prevArrowLeft.addEventListener("click", function () {
    currentIndexLeft -= 4;
    if (currentIndexLeft < 0) {
      currentIndexLeft = draggablesInSliderLeft.length - 4;
    }
    scrollToIndex(currentIndexLeft, draggablesInSliderLeft, sliderLeft);
  });
  //right draggables scroll
  nextArrowRight.addEventListener("click", function () {
    currentIndexRight += 4;
    if (currentIndexRight >= draggablesInSliderRight.length) {
      currentIndexRight = 0;
    }
    scrollToIndex(currentIndexRight, draggablesInSliderRight, sliderRight);
  });

  prevArrowRight.addEventListener("click", function () {
    currentIndexRight -= 4;
    if (currentIndexRight < 0) {
      currentIndexRight = draggablesInSliderRight.length - 4;
    }
    scrollToIndex(currentIndexRight, draggablesInSliderRight, sliderRight);
  });

  function scrollToIndex(index, draggablesInSlider, slider) {
    slider.scrollTop = draggablesInSlider[index].offsetTop;
  }
  //wtf
  // save burger elems

  let burgersInLocalStorage = JSON.parse(localStorage.getItem("burgers"));
  const totalBurgersCounter = document.querySelector(
    ".header__order-counter a"
  );

  if (burgersInLocalStorage !== null) {
    if (burgersInLocalStorage.length > 0) {
      totalBurgersCounter.parentElement.style.display = "flex";

      totalBurgersCounter.textContent = burgersInLocalStorage.length;
    } else {
      totalBurgersCounter.parentElement.style.display = "none";
    }
  } else {
    burgersInLocalStorage = [];
    console.log(burgersInLocalStorage);
    totalBurgersCounter.remove();
  }

  function saveBurger() {
    const draggablesInBurger = burger.querySelectorAll("img.draggable");
    if (draggablesInBurger.length > 0) {
      const burgerIngridientsArray = [];
      draggablesInBurger.forEach((draggable) => {
        const url = new URL(draggable.src);
        burgerIngridientsArray.push(url.pathname);
      });
      burgersInLocalStorage.push(burgerIngridientsArray);
      localStorage.setItem(`burgers`, JSON.stringify(burgersInLocalStorage));
      console.log("success");

      let burgersInLSUpdated = JSON.parse(localStorage.getItem("burgers"));
      // totalBurgersCounter.textContent = burgersInLSUpdated.length;
      const counter = document.querySelector(".header__order-counter a");

      if (burgersInLSUpdated.length !== 0) {
        counter.parentElement.style.display = "flex";

        counter.textContent = burgersInLSUpdated.length;
      } else {
        burgersInLSUpdated = [];

        counter.parentElement.style.display = "none";
      }
    } else {
      sayCantDoIt("You can't add an empty burger-_-");
    }
  }

  // drag and drop
  document
    .querySelectorAll(".kitchen-ingridients")
    .forEach((listOfIngridients) => {
      new Sortable(listOfIngridients, {
        group: {
          name: "shared",
          pull: "clone",
          put: false, // Do not allow items to be put into this list
        },
        chosenClass: "dragging",
        animation: 150,
        sort: false,

        onEnd: function (/**Event*/ evt) {
          if (evt.to.classList.contains("trash")) {
            evt.item.parentNode.removeChild(evt.item);
          }
          setZindicesForIngridients();
        },
      });
    });

  new Sortable(burger, {
    group: "shared",
    chosenClass: "dragging",

    animation: 150,

    onEnd: function (/**Event*/ evt) {
      if (evt.to.classList.contains("trash")) {
        evt.item.parentNode.removeChild(evt.item);
      }
      setZindicesForIngridients();
    },
  });
  new Sortable(trash, {
    group: {
      name: "shared",
      put: true, // Do not allow items to be put into this list
      pull: false,
    },
    dragClass: "dragging",
    animation: 150,
    sort: false,
  });
});
