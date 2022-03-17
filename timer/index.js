"use strict";

const twoDigits = (num) => {
  return ("0" + num).slice(-2);
};

const currentDate = document.getElementById("today");
const days = [
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресенье",
];

const timeFormat = () => {
  const date = new Date();
  const day = days[new Date().getDay() - 1];
  const hour = date.getHours();
  let greeting = "";
  if (hour >= 5 && hour < 12) {
    greeting = "Доброе утро";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Добрый день";
  } else if (hour >= 18 && hour < 24) {
    greeting = "Добрый вечер";
  } else if (hour >= 0 && hour < 5) {
    greeting = "Доброй ночи";
  }
  const amPM = hour >= 12 ? "PM" : "AM";
  const hours = hour > 12 ? hour - 12 : hour;
  const minutes = twoDigits(date.getMinutes());
  const seconds = twoDigits(date.getSeconds());
  return {
    greeting,
    amPM,
    day,
    hours,
    minutes,
    seconds,
  };
};

const getTimeRemaining = () => {
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
};

const textDate = () => {
  const time = timeFormat();
  const timer = getTimeRemaining();
  currentDate.innerHTML = `${time.greeting} <br>
  Сегодня: ${time.day} <br>
  Текущее время: ${twoDigits(time.hours)}:${time.minutes}:${time.seconds} ${
    time.amPM
  }<br>
  До нового года осталось ${timer.day} дней`;
};
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
