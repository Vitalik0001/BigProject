window.addEventListener("load", () => {


    let draggables = document.querySelectorAll('.draggable');

    const burger = document.querySelector('.burger'),
        trash = document.querySelector('.trash'),
        trashLid = document.querySelector('.trash-lid'),
        saveButton = document.querySelector('.button__main-confirm'),
        clearButton = document.querySelector('.button__main-clear'),
        buttonField = document.querySelector('.button'),
        popUp = document.querySelector('#popup'),
        deleteModalButtonYes = document.querySelector('.delete-modal__main-clear'),
        deleteModalButtonNo = document.querySelector('#button-cancel'),
        body = document.querySelector('body'),
        deleteModal = document.querySelector('.delete-modal'),
        deleteModalBody = document.querySelector('.delete-modal__body'),
        deleteModalCloseButton = document.querySelector('.delete-modal__close'),
        instructionsButtonOk = document.querySelector('.instructions__main-ok'),
        instructionsModal = document.querySelector('.instructions'),
        instructionsModalBody = document.querySelector('.instructions__body'),
        instructionsModalCloseButton = document.querySelector('.instructions__close');


    //instructions
    function showInstructionsModal() {
        instructionsButtonOk.addEventListener('click', (e) => {
            e.preventDefault();
            closeInstructionsModalAtAll()
        })
        instructionsModal.classList.add('show_popup');

        closeInstructionsModal();
        closeInstructionsModalOutside();

    }
    showInstructionsModal();
    /* Close modal window */
    function closeInstructionsModalAtAll() {
        instructionsModal.remove();
    }
    function closeInstructionsModal() {
        instructionsModalCloseButton.addEventListener('click', (e) => {
            e.preventDefault();
            closeInstructionsModalAtAll()
        });
    }

    function closeInstructionsModalOutside() {
        instructionsModalBody.addEventListener('click', (e) => {
            if (e.target === instructionsModalBody) {
                closeInstructionsModalAtAll()
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.code === 'Escape') {
                closeInstructionsModalAtAll()
            }
        });
    }
    //lid 
    const lidAnimations = ['trash-open', 'trash-open2', 'trash-open3'];

    function setRandomLidAnimation() {
        return lidAnimations[Math.floor(Math.random() * lidAnimations.length)];
    }

    let copyIngridient, copy;
    let firstCalled = true;

    trash.ondragover = (e) => {
        if (!e.target.classList.contains("space-for-lid")) {
            e.preventDefault();
            if (firstCalled) {
                let randomAnimation = setRandomLidAnimation();
                trashLid.classList.add(randomAnimation);
                trashLid.classList.remove('trash-closed');
                firstCalled = false;
            }
        }


    }
    trash.ondragleave = (e) => {
        e.preventDefault();

        trashLid.classList.remove('trash-open');
        trashLid.classList.remove('trash-open2');
        trashLid.classList.remove('trash-open3');

        trashLid.classList.add('trash-closed');
        firstCalled = true;
    }
    trash.ondrop = (e) => {
        e.preventDefault();
        trashLid.classList.remove('trash-open');
        trashLid.classList.remove('trash-open2');
        trashLid.classList.remove('trash-open3');
        trashLid.classList.add('trash-closed');
        const draggable = document.querySelector('.dragging');
        draggable.remove();
        firstCalled = true;
    }


    //drag and drop 
    function setDragListener() {
        draggables.forEach(draggable => {


            draggable.addEventListener('dragstart', () => {

                copyIngridient = draggable.parentElement.dataset.ingridient;

                draggable.classList.add('dragging')

                copy = draggable.cloneNode(true);

                copy.classList.remove('dragging');
            })


            draggable.addEventListener('dragend', () => {
                draggable.classList.remove('dragging')


                const ingridientOrigin = document.querySelector(`[data-ingridient='${copyIngridient}']`);

                if (!ingridientOrigin || ingridientOrigin.children.length > 0) {
                    return
                } else {
                    ingridientOrigin.append(copy);
                }
                draggables = document.querySelectorAll('.draggable');

                setDragListener()

                setRemove();

            })


        })
    }

    setDragListener()



    burger.addEventListener('dragover', (e) => {
        e.preventDefault()

        const afterElement = getDragAfterElement(burger, e.clientY)
        const draggable = document.querySelector('.dragging')
        if (afterElement == null) {

            burger.appendChild(draggable)
        } else {
            burger.insertBefore(draggable, afterElement)
        }


        const draggablesInBurger = burger.querySelectorAll('.draggable');
        const zIndices = [...Array(draggablesInBurger.length).keys()].reverse().map(i => i);

        draggablesInBurger.forEach((draggable, i) => {
            draggable.style.zIndex = zIndices[i];
            draggable.style.cursor = 'move';
        })




    });

    function getDragAfterElement(burger, y) {
        const draggableElements = [...burger.querySelectorAll('.draggable:not(.dragging)')]

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect()
            const offset = y - box.top - box.height / 2
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child }
            } else {
                return closest
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element
    }

    function setRemove() {
        burger.querySelectorAll('.draggable').forEach(ingridient => {

            ingridient.style.content = "'before'";
        });
    }


    //button
    let isSaved = false;
    const addToBasket = document.createElement('button');

    addToBasket.classList.add('button__main-submit');
    addToBasket.innerHTML = 'Add To Basket';
    buttonField.insertBefore(addToBasket, saveButton)
    addToBasket.style.display = 'none';

    addToBasket.addEventListener('click', (e) => {
        e.preventDefault();
    })




    function setToSave() {

        clearButton.innerHTML = 'Clear';

        allowedToDrag = true;

        saveButton.innerHTML = 'Save';
        isSaved = false;
        document.querySelectorAll('.draggable').forEach(ingridient => {

            ingridient.setAttribute('draggable', true);
        })
        burger.querySelectorAll('.draggable').forEach(ingridient => {
            ingridient.style.marginTop = '-9%';

        })


    }
    function sayCantDoIt(text) {
        let sayCantDoIt = document.createElement('div');
        sayCantDoIt.classList.add('cant-do-it');
        sayCantDoIt.innerHTML = `${text}`;
        if (!popUp.children.length > 0) {
            popUp.append(sayCantDoIt);
            setTimeout(() => {
                popUp.querySelector('.cant-do-it').remove();
            }, 3000);
        } else {
            popUp.innerHTML = '';
            popUp.append(sayCantDoIt);
            setTimeout(() => {
                popUp.querySelector('.cant-do-it').remove();
            }, 3000);
        }


    }



    function setToEdit() {
        allowedToDrag = false

        clearButton.innerHTML = 'Delete';

        saveButton.innerHTML = 'Edit';
        isSaved = true;
        document.querySelectorAll('.draggable').forEach(ingridient => {

            ingridient.setAttribute('draggable', false);
        })
        burger.querySelectorAll('.draggable').forEach(ingridient => {
            ingridient.style.marginTop = '-20%';

        })
        let saved = document.createElement('div')
        saved.classList.add('saved');
        saved.innerHTML = 'Saved';
        popUp.innerHTML = '';
        popUp.append(saved);
        setTimeout(() => {
            if (popUp.querySelector('.saved'))
                popUp.querySelector('.saved').remove();
        }, 3000);




    }
    let allowedToDrag = true;
    saveButton.addEventListener('click', (e) => {
        e.preventDefault();

        draggables.forEach(draggable => {
            draggable.addEventListener('mousedown', () => {
                if (!allowedToDrag) {
                    sayCantDoIt("Can't do it");
                }
            })
        });

        if (burger.children.length > 1) {
            saveButton.classList.toggle('button__main-confirm');
            saveButton.classList.toggle('button__main-edit');


            if (!isSaved) {
                addToBasket.style.display = 'block';
                setToEdit()

            } else {
                addToBasket.style.display = 'none';
                setToSave();

            }
        } else {
            sayCantDoIt('Nothing to Save');
        }



    })
    function showDeleteModal() {
        deleteModal.classList.add('show_popup');
        body.style.overflow = 'hidden';
        closeDeleteModal();

    }
    /* Close modal window */
    function closeDeleteModalAtAll() {
        deleteModal.classList.remove('show_popup');
        body.style.overflow = '';
    }
    function closeDeleteModal() {
        deleteModalCloseButton.addEventListener('click', (e) => {
            e.preventDefault();
            closeDeleteModalAtAll()
        });
    }

    function closeDeleteModalOutside() {
        deleteModalBody.addEventListener('click', (e) => {
            if (e.target === deleteModalBody) {
                closeDeleteModalAtAll()
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.code === 'Escape') {
                closeDeleteModalAtAll()
            }
        });
    }
    deleteModalButtonYes.addEventListener('click', (e) => {
        e.preventDefault();
        burger.querySelectorAll('.draggable').forEach(ingridient => {
            ingridient.remove();
        })
        closeDeleteModalAtAll();
        addToBasket.style.display = 'none';
        setToSave();
        saveButton.classList.toggle('button__main-confirm');
        saveButton.classList.toggle('button__main-edit');
    })
    deleteModalButtonNo.addEventListener('click', (e) => {
        e.preventDefault();
        closeDeleteModalAtAll();
    })
    closeDeleteModalOutside()
    closeDeleteModal()
    clearButton.addEventListener('click', (e) => {
        e.preventDefault();

        if (burger.children.length < 1) {
            sayCantDoIt('Nothing to Clear')
        } else if (isSaved) {
            showDeleteModal()
        } else {
            burger.innerHTML = '';


        }

    })

    //slider for draggables
    const sliderLeft = document.querySelector('.kitchen-elements-left'),
        sliderRight = document.querySelector('.kitchen-elements-right'),
        draggablesInSliderLeft = sliderLeft.querySelectorAll('.draggable'),
        draggablesInSliderRight = sliderRight.querySelectorAll('.draggable'),
        nextArrowLeft = document.querySelector('.arrow-next-left'),
        prevArrowLeft = document.querySelector('.arrow-previous-left'),
        nextArrowRight = document.querySelector('.arrow-next-right'),
        prevArrowRight = document.querySelector('.arrow-previous-right');

    let currentIndexLeft = 0,
        currentIndexRight = 0;
    //left draggables scroll
    nextArrowLeft.addEventListener('click', function () {
        currentIndexLeft += 4;
        if (currentIndexLeft >= draggablesInSliderLeft.length) {
            currentIndexLeft = 0;
        }
        scrollToIndex(currentIndexLeft, draggablesInSliderLeft, sliderLeft);
    });

    prevArrowLeft.addEventListener('click', function () {
        currentIndexLeft -= 4;
        if (currentIndexLeft < 0) {
            currentIndexLeft = draggablesInSliderLeft.length - 4;
        }
        scrollToIndex(currentIndexLeft, draggablesInSliderLeft, sliderLeft);
    });
    //right draggables scroll
    nextArrowRight.addEventListener('click', function () {
        currentIndexRight += 4;
        if (currentIndexRight >= draggablesInSliderRight.length) {
            currentIndexRight = 0;
        }
        scrollToIndex(currentIndexRight, draggablesInSliderRight, sliderRight);
    });

    prevArrowRight.addEventListener('click', function () {
        currentIndexRight -= 4;
        if (currentIndexRight < 0) {
            currentIndexRight = draggablesInSliderRight.length - 4;
        }
        scrollToIndex(currentIndexRight, draggablesInSliderRight, sliderRight);
    });

    function scrollToIndex(index, draggablesInSlider, slider) {
        slider.scrollTop = draggablesInSlider[index].offsetTop;
    }
});