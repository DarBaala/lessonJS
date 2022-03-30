window.addEventListener("DOMContentLoaded", function () {
  ("use strict");
  /// TImer
  function countTimer(deadline) {
    let timerHours = document.querySelector("#timer-hours"),
      timerMinutes = document.querySelector("#timer-minutes"),
      timerSeconds = document.querySelector("#timer-seconds"),
      idInterval = 0;
    function getTimeRemaining() {
      let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining = (dateStop - dateNow) / 1000,
        seconds = 0,
        minutes = 0,
        hours = 0;
      if (timeRemaining > 0) {
        seconds = Math.floor(timeRemaining % 60);
        minutes = Math.floor((timeRemaining / 60) % 60);
        hours = Math.floor(timeRemaining / 60 / 60);
      }
      return { timeRemaining, hours, minutes, seconds };
    }

    function addZero(elem) {
      if (String(elem).length === 1) {
        return "0" + elem;
      } else {
        return String(elem);
      }
    }

    function updateClock() {
      let timer = getTimeRemaining();

      timerHours.textContent = addZero(timer.hours);
      timerMinutes.textContent = addZero(timer.minutes);
      timerSeconds.textContent = addZero(timer.seconds);

      if (timer.timeRemaining < 0) {
        clearInterval(idInterval);
      }
    }
    idInterval = setInterval(updateClock, 1000);
  }
  countTimer("22 march 2022");
  /// MENU
  const toggleMenu = () => {
    const handlerMenu = (event) => {
      const target = event.target;
      const menu = document.querySelector("menu");
      if (target.closest(".menu")) {
        menu.classList.add("active-menu");
      } else if (target !== menu) {
        menu.classList.remove("active-menu");
      }
    };
    document.body.addEventListener("click", handlerMenu);
  };
  toggleMenu();
  ///POPUP
  const toggleModal = () => {
    const popUp = document.querySelector(".popup");
    const popUpBtn = document.querySelectorAll(".popup-btn");
    popUp.style.display = "block";
    popUp.style.transform = "translateX(100%)";
    let animation,
      count = 20;
    const transform = () => {
      animation = requestAnimationFrame(transform);
      count--;
      if (count >= 0) {
        popUp.style.transform = `translateX(${count}%)`;
      } else {
        cancelAnimationFrame(animation);
      }
    };
    popUpBtn.forEach((elem) => {
      elem.addEventListener("click", () => {
        if (document.body.clientWidth > 768) {
          requestAnimationFrame(transform);
        } else {
          popUp.style.transform = "translateX(0)";
        }
      });
    });
    popUp.addEventListener("click", (event) => {
      let target = event.target;
      if (target.classList.contains("popup-close")) {
        count = 100;
        popUp.style.transform = "translateX(100%)";
      } else {
        target = target.closest(".popup-content");
        if (!target) {
          count = 100;
          popUp.style.transform = "translateX(100%)";
        }
      }
    });
  };
  toggleModal();

  //Таб
  const tabs = () => {
    const tabHeader = document.querySelector(".service-header");
    const tab = document.querySelectorAll(".service-header-tab");
    const tabContent = document.querySelectorAll(".service-tab");
    const toggleTabContent = (index) => {
      for (let i = 0; i < tabContent.length; i++) {
        if (index === i) {
          tab[i].classList.add("active");
          tabContent[i].classList.remove("d-none");
        } else {
          tab[i].classList.remove("active");
          tabContent[i].classList.add("d-none");
        }
      }
    };
    tabHeader.addEventListener("click", (event) => {
      let target = event.target;
      target = target.closest(".service-header-tab");
      if (target) {
        tab.forEach((item, i) => {
          if (item === target) {
            toggleTabContent(i);
          }
        });
      }
    });
  };
  tabs();
  /// Слайдер
  const slider = () => {
    const slider = document.querySelector(".portfolio-content"),
      slide = document.querySelectorAll(".portfolio-item"),
      btnDot = document.querySelector(".portfolio-dots");
    for (let i = 0; i < slide.length; i++) {
      const dots = document.createElement("li");
      dots.classList.add("dot");
      if (i === 0) {
        dots.classList.add("dot-active");
      }
      btnDot.append(dots);
    }
    const dots = document.querySelectorAll(".dot");
    let currentSlide = 0,
      interval;
    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };
    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };
    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dots, currentSlide, "dot-active");
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dots, currentSlide, "dot-active");
    };
    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time);
    };
    const stopSlide = () => {
      clearTimeout(interval);
    };
    slider.addEventListener("click", (event) => {
      event.preventDefault();
      let target = event.target;
      if (!target.matches(".portfolio-btn, .dot")) {
        return;
      }
      prevSlide(slide, currentSlide, "portfolio-item-active");
      prevSlide(dots, currentSlide, "dot-active");
      if (target.matches("#arrow-right")) {
        currentSlide++;
      } else if (target.matches("#arrow-left")) {
        currentSlide--;
      } else if (target.matches(".dot")) {
        dots.forEach((elem, index) => {
          if (elem === target) {
            currentSlide = index;
          }
        });
      }
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      if (currentSlide < 0) {
        currentSlide = slide.length - 1;
      }
      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dots, currentSlide, "dot-active");
    });
    slider.addEventListener("mouseover", (event) => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      ) {
        stopSlide();
      }
    });
    slider.addEventListener("mouseout", (event) => {
      if (
        event.target.matches(".portfolio-btn") ||
        event.target.matches(".dot")
      ) {
        startSlide();
      }
    });
    startSlide(1500);
  };
  slider();
  const setCommandImg = (event) => {
    const command = document.querySelector("#command .row");
    const changingPhotos = (event) => {
      const target = event.target;
      if (target.classList.contains("command__photo")) {
        const lastSrc = target.src;
        target.src = target.dataset.img;
        target.dataset.img = lastSrc;
      }
    };
    command.addEventListener("mouseover", changingPhotos);
    command.addEventListener("mouseout", changingPhotos);
  };
  setCommandImg();
  const checkCalcBlock = () => {
    const calcBlock = document.querySelector(".calc-block");
    calcBlock.addEventListener("input", (event) => {
      if (event.target.matches("input")) {
        event.target.value = event.target.value.replace(/\D/, "");
      }
    });
  };
  checkCalcBlock();

  /// Calc
  const calculator = (price = 100) => {
    const calcBlock = document.querySelector(".calc-block");
    const calcType = document.querySelector(".calc-type");
    const calcSquare = document.querySelector(".calc-square");
    const calcCount = document.querySelector(".calc-count");
    const calcDay = document.querySelector(".calc-day");
    const totalValue = document.getElementById("total");
    const countSum = () => {
      let total = 0,
        countValue = 1,
        dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value;
      const squareValue = +calcSquare.value;
      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }
      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }
      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }
      totalValue.textContent = total;
    };
    calcBlock.addEventListener("change", (event) => {
      const target = event.target;
      if (target.matches("select") || target.matches("input")) {
        countSum();
      }
    });
    calcBlock.addEventListener("input", (event) => {
      if (event.target.matches("input")) {
        event.target.value = event.target.value.replace(/\D/, "");
      }
    });
  };
  calculator(100);

  // send-ajax-form
  //Валидация форм
  const validFormName = () => {
    const formName = document.querySelectorAll('[placeholder="Ваше имя"]');
    formName.forEach((item) => {
      item.addEventListener("input", () => {
        item.value = item.value.replace(/[^а-яё\s]/gi, "");
      });
      item.addEventListener("blur", () => {
        item.value = item.value
          .split(/\s+/)
          .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
          .join(" ");
      });
    });
  };
  validFormName();
  const validFormEmail = () => {
    //Выбираем все поля плейсхолдер которых содержит строку "E-mail"
    const formEmail = document.querySelectorAll('[placeholder="E-mail"]');
    formEmail.forEach((item) => {
      item.addEventListener("input", () => {
        item.value = item.value.replace(/[^a-z@\-_.!~*^1-9']{1,}/gi, "");
      });
      item.addEventListener("blur", () => {
        item.value = item.value
          .replace(/^[\s-]+|[\s-]+$/gi, "")
          .replace(/-+/g, "-");
      });
    });
  };
  validFormEmail();
  const validFormPhone = () => {
    //Выбираем все поля плейсхолдер которых содержит подстроку "телефон"
    const formPhone = document.querySelectorAll('[placeholder*="телефон"]');
    formPhone.forEach((item) => {
      item.addEventListener("input", () => {
        item.value = item.value.replace(/[^+\d]/g, "");
      });
      item.addEventListener("blur", () => {
        item.value = item.value.replace(/^[\s]+|[\s\+]{1,}$/g, "");
      });
    });
  };
  validFormPhone();
  //Блок Контакты
  const contacts = () => {
    const message = document.getElementById("form2-message");
    message.addEventListener("input", () => {
      message.value = message.value.replace(/[^а-яё\d\s\-\?;:,.!]/gi, "");
    });
    message.addEventListener("blur", () => {
      message.value = message.value
        .trim()
        .replace(/\s+/g, " ")
        .replace(/-+/g, "-");
    });
  };
  contacts();
  const sendForm = (formId) => {
    const errorMessage = "Что-то пошло не так!",
      loadedMessage = "Загрузка...",
      successMessage = "Спасибо! Мы скоро с Вами свяжемся!";
    const form = document.getElementById(formId);
    const statusMessage = document.createElement("div"); // Cоздаем див
    statusMessage.style.cssText = "font-size: 2rem;"; // Стили для дива
    const postData = (body, outputData, errorData) => {
      const request = new XMLHttpRequest(); // Создаем объект для работы с AJAX
      request.addEventListener("readystatechange", () => {
        if (request.readyState !== 4) {
          return;
        }
        if (request.status === 200) {
          outputData();
        } else {
          errorData(request.status);
        }
      }); // Отлавливаем событие(пошаговый статус отправки - 'readystatechange'
      request.open("POST", "./server.php"); // Отправляем на сервер данные
      request.setRequestHeader("Content-Type", "application/json"); // Метод настройки заголовка, имя|значение. В случае с AJAX multipart/form-data
      // request.send(formData); // отправляем данные
      request.send(JSON.stringify(body)); // отправляем данные
    };
    form.addEventListener("submit", (event) => {
      event.preventDefault(); // Отменяет событие ПО УМОЛЧАНИЮ
      form.appendChild(statusMessage); // Добавляем созданный див в form
      const formData = new FormData(form); // Форма, с которой будем получать данные
      statusMessage.textContent = loadedMessage;
      let body = {};
      form.reset(); //Сбрасываем значения
      // for (let val of formData.entries()) {
      //   body[val[0]] = val[1];
      // } // Достаем значeние из FormData
      formData.forEach((val, key) => {
        body[key] = val; // Достаем значение из FormData, но с помощью forEach
      });
      postData(
        body,
        () => {
          statusMessage.textContent = successMessage;
        },
        (error) => {
          statusMessage.textContent = errorMessage;
          console.error(error);
        }
      );
    });
  };
  sendForm("form1");
  sendForm("form2");
  sendForm("form3");
});
