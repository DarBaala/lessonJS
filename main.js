"use strict";
let money = +prompt("Ваш месячный доход?", 50000);
let income = "Фриланс: 15500";
let addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую"
);
let deposit = confirm("Есть ли у вас депозит в банке?");
let mission = 100000;
let period = 6;
let expenses1 = prompt("Введите обязательную статью расходов?", "Бензин");
let expenses2 = prompt("Введите обязательную статью расходов?", "Еда");
let amount1 = +prompt(`Во сколько ${expenses1} обойдется?`, "5000");
let amount2 = +prompt(`Во сколько ${expenses2} обойдется?`, "8000");

const showTypeOf = (data) => {
  console.log(typeof data);
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

const getExpensesMonth = () => {
  return amount1 + amount2;
};

const getAccumulatedMonth = () => {
  return money - amount1 - amount2;
};

const accumulatedMonth = getAccumulatedMonth;

const getTargetMonth = () => {
  return Math.ceil(mission / accumulatedMonth);
};

let budgetDay = accumulatedMonth / 30;
if (budgetDay === 1200) {
  console.log(
    "У вас почти получилось попасть в группу с высоким уровнем дохода"
  );
} else if (budgetDay === 600) {
  console.log("У вас почти средний уровень дохода");
} else if (budgetDay > 1200) {
  console.log("У вас высокий уровень дохода");
} else if (budgetDay < 1200 && budgetDay > 600) {
  console.log("У вас средний уровень дохода");
} else if (budgetDay < 0) {
  console.log("Ты какой-то бомж");
} else {
  console.log("Ваш уровень дохода ниже среднего");
}
