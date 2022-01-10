"use strict";
let money = +prompt("Ваш месячный доход?", 50000);
let income = "Фриланс: 15500";
let addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую"
);
console.log(addExpenses.split(", "));
let deposit = confirm("Есть ли у вас депозит в банке?");
let mission = 100000;
let period = 6;
let expenses1 = prompt("Введите обязательную статью расходов?", "Бензин");
let expenses2 = prompt("Введите обязательную статью расходов?", "Еда");
let amount1 = +prompt(`Во сколько ${expenses1} обойдется?`, "5000");
let amount2 = +prompt(`Во сколько ${expenses2} обойдется?`, "8000");
function showTypeOf(data) {
  console.log(typeof data);
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

function getExpensesMonth() {
  return amount1 + amount2;
}
console.log("getExpensesMonth():", getExpensesMonth());

function getAccumulatedMonth() {
  return money - amount1 - amount2;
}
const accumulatedMonth = getAccumulatedMonth(getExpensesMonth());

function getTargetMonth() {
  return Math.ceil(mission / accumulatedMonth);
}
console.log("getTargetMonth():", getTargetMonth());

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
