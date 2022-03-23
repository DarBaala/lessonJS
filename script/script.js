window.addEventListener("DOMContentLoaded", function () {
  "use strict";
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
    const handlerMenu = () => {
      const target = event.target;
      const displayMenu = () => {
        document.querySelector("menu").classList.toggle("active-menu");
      };
      if (
        target.closest(".menu") ||
        (!target.closest("menu") &&
          document.querySelector("menu").classList.contains("active-menu"))
      ) {
        displayMenu();
      } else if (target.closest("menu") && target.closest('[href^="#"]')) {
        displayMenu();
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
    const dot = document.querySelectorAll(".dot");
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
      prevSlide(dot, currentSlide, "dot-active");
      currentSlide++;
      if (currentSlide >= slide.length) {
        currentSlide = 0;
      }
      nextSlide(slide, currentSlide, "portfolio-item-active");
      nextSlide(dot, currentSlide, "dot-active");
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
      prevSlide(dot, currentSlide, "dot-active");
      if (target.matches("#arrow-right")) {
        currentSlide++;
      } else if (target.matches("#arrow-left")) {
        currentSlide--;
      } else if (target.matches(".dot")) {
        dot.forEach((elem, index) => {
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
      nextSlide(dot, currentSlide, "dot-active");
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
  const setCommandImg = () => {
    const command = document.querySelector("#command .row");
    const changingPhotos = () => {
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
});
