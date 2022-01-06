"use strict";
let money = 30000;
let income = "Фриланс: 2500";
let addExpenses = "Еда, такси, отдых";
let deposit = 0;
let mission = 100000;
let period = 6;
let num = 266219;
let res = 1;
num
  .toString()
  .split("")
  .forEach(function (el) {
    res *= el;
  });
console.log(res);

console.log((res ** 3).toString().substring(0, 2));
