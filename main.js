"use strict";

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let income = "Фриланс: 15500";
let addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую"
);
let deposit = confirm("Есть ли у вас депозит в банке?");
let mission = 100000;
let period = 6;

do {
  money = prompt("Ваш месячный доход?");
} while (!isNumber(money));

function showTypeOf(data) {
  console.log(typeof data);
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log(addExpenses.split(", "));

let expenses = [];

let getExpensesMonth = function () {
  let sum = 0;
  for (let i = 0; i < 2; i++) {
    expenses[i] = prompt("Введите обязательную статью расходов?");
    sum += (() => {
      let n = 0;
      do {
        n = prompt("Во сколько это обойдется?");
      } while (!isNumber(n));
      return +n;
    })();
  }
  console.log(sum);
  return sum;
};
let expensesAmount = getExpensesMonth();

console.log("expensesAmount:", expensesAmount);

function getAccumulatedMonth() {
  return money - expensesAmount;
}
const accumulatedMonth = getAccumulatedMonth();

function getTargetMonth() {
  return Math.ceil(mission / accumulatedMonth);
}

let targetMonth = getTargetMonth();

if (targetMonth >= 0) {
  console.log(`Цель будет достигнута за: ${targetMonth} месяцев`);
} else {
  console.log(`Цель не будет достигнута`);
}

let budgetDay = accumulatedMonth / 30;
console.log("budgetDay:", Math.floor(budgetDay));

function getStatusIncome() {
  if (budgetDay === 1200) {
    return "У вас почти получилось попасть в группу с высоким уровнем дохода";
  } else if (budgetDay === 600) {
    return "У вас почти средний уровень дохода";
  } else if (budgetDay > 1200) {
    return "У вас высокий уровень дохода";
  } else if (budgetDay < 1200 && budgetDay > 600) {
    return "У вас средний уровень дохода";
  } else if (budgetDay < 0) {
    return "Ты какой-то бомж";
  } else {
    return "Ваш уровень дохода ниже среднего";
  }
}
console.log("getStatusIncome():", getStatusIncome());
