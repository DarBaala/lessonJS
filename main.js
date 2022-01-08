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

let showTypeOf = (data) => {
  console.log(typeof data);
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let getExpensesMonth = () => {
  return amount1 + amount2;
};
console.log(getExpensesMonth());

let getAccumulatedMonth = () => {
  return money - amount1 - amount2;
};
let accumulatedMonth = getAccumulatedMonth(getExpensesMonth());

let getTargetMonth = () => {
  return Math.ceil(mission / accumulatedMonth);
};
console.log(getTargetMonth());

let budgetDay = accumulatedMonth / 30;
console.log(Math.floor(budgetDay));

let getStatusIncome = () => {
  if (budgetDay === 1200) {
    return console.log(
      "У вас почти получилось попасть в группу с высоким уровнем дохода"
    );
  } else if (budgetDay === 600) {
    return console.log("У вас почти средний уровень дохода");
  } else if (budgetDay > 1200) {
    return console.log("У вас высокий уровень дохода");
  } else if (budgetDay < 1200 && budgetDay > 600) {
    return console.log("У вас средний уровень дохода");
  } else if (budgetDay < 0) {
    return console.log("Ты какой-то бомж");
  } else {
    return console.log("Ваш уровень дохода ниже среднего");
  }
};
console.log(getStatusIncome());
