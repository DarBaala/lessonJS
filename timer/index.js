"use strict";

function twoDigits(num) {
  return ("0" + num).slice(-2);
}

const currentDate = document.querySelector("#today");
const days = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];

function timeFormat() {
  let date = new Date(),
    day = days[new Date().getDay() - 1],
    hour = date.getHours(),
    greeting = "";
  if (hour >= 5 && hour < 12) {
    greeting = "Хуй ты проверишь в это время";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Добрый день, Ваша";
  } else if (hour >= 18 && hour < 24) {
    greeting = "Cуьйр дик йойл, Ваша";
  } else if (hour >= 0 && hour < 5) {
    greeting = "Д1авижа, ахь х1у джава юьйц....";
  }
  let amPM = hour >= 12 ? "PM" : "AM",
    hours = hour > 12 ? hour - 12 : hour,
    minutes = twoDigits(date.getMinutes()),
    seconds = twoDigits(date.getSeconds());
  return {
    greeting,
    amPM,
    day,
    hours,
    minutes,
    seconds,
  };
}

function getTimeRemaining() {
  const dateStop = new Date("1 January 2023").getTime();
  const dateNow = new Date().getTime();
  const newYear = dateNow > dateStop ? true : false;
  const timeRemaining = (dateStop - dateNow) / 1000;
  const day = Math.floor(timeRemaining / 60 / 60 / 24);
  return {
    timeRemaining,
    day,
    newYear,
  };
}

function textDate() {
  const time = timeFormat();
  const timer = getTimeRemaining();
  currentDate.innerHTML = `${time.greeting} <br>
  Сегодня: ${time.day} <br>
  Текущее время: ${twoDigits(time.hours)}:${time.minutes}:${time.seconds} ${
    time.amPM
  } <br>
  До нового осталось ${timer.day} дней`;
}
if (getTimeRemaining().timeRemaining > 0) {
  textDate();
  const timerId = setInterval(() => {
    if (getTimeRemaining().newYear) {
      clearInterval(timerId);
    } else {
      textDate();
    }
  }, 1000);
}
