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
    const btnMenu = document.querySelector(".menu"),
      menu = document.querySelector("menu"),
      closeBtn = document.querySelector(".close-btn"),
      menuItem = menu.querySelectorAll("ul>li");
    const handlerMenu = () => {
      menu.classList.toggle("active-menu");
    };
    btnMenu.addEventListener("click", handlerMenu);
    closeBtn.addEventListener("click", handlerMenu);
    menuItem.forEach((elem) => elem.addEventListener("click", handlerMenu));
  };
  toggleMenu();
  ///POPUP
  const togglePopUp = () => {
    const popup = document.querySelector(".popup"),
      popUpBtn = document.querySelectorAll(".popup-btn"),
      popUpClose = document.querySelector(".popup-close");
    popup.style.display = "block";
    popup.style.transform = "translateX(100%)";
    let animation,
      count = 100;
    const transform = () => {
      animation = requestAnimationFrame(transform);
      count--;
      if (count >= 0) {
        popup.style.transform = `translateX(${count}%)`;
      } else {
        cancelAnimationFrame(animation);
      }
    };
    popUpBtn.forEach((elem) => {
      elem.addEventListener("click", () => {
        if (document.body.clientWidth > 768) {
          requestAnimationFrame(transform);
        } else {
          popup.style.transform = "translateX(0)";
        }
      });
    });
    popUpClose.addEventListener("click", () => {
      count = 100;
      popup.style.transform = "translateX(100%)";
    });
  };
  togglePopUp();
});
