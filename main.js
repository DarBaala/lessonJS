"use strict";

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function randomNum() {
  return Math.floor(Math.random() * Math.floor(100));
}

function start() {
  let numMath = randomNum();
  function game() {
    const num = prompt("Угадай число от 1 до 100");
    if (num === null) {
      alert("Goodbay");
      return;
    }
    if (isNumber(num)) {
      let realNum = +num;
      if (realNum > numMath) {
        alert("Упс, число меньше!");
        game();
      } else if (realNum < numMath) {
        alert("Упс, число больше!");
        game();
      } else {
        if (confirm("Вы угадали! Давай ещё?")) {
          start();
        } else {
          alert("Goodbay");
          return;
        }
      }
    } else {
      alert("Введите число");
      game();
    }
  }
  game();
}
start();
