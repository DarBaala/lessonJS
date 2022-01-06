"use strict";
let money = +prompt("Ваш месячный доход?");
let income = "Фриланс: 15500";
let addExpenses = prompt(
  "Перечислите возможные расходы за рассчитываемый период через запятую"
);
let deposit = confirm("Есть ли у вас депозит в банке?");
let mission = 100000;
let period = 6;
let expenses1 = prompt("Введите обязательную статью расходов?");
let expenses2 = prompt("Введите обязательную статью расходов?");
let amount1 = +prompt(`Во сколько ${expenses1} обойдется?`);
let amount2 = +prompt(`Во сколько ${expenses2} обойдется?`);
let budgetMonth = money + parseFloat(income.match(/\d+/)) - amount1 - amount2;
console.log(budgetMonth);
console.log(
  `Цель будет достигнута за: ${Math.ceil(mission / budgetMonth)} месяцев`
);
let budgetDay = budgetMonth / 30;
console.log("Бюджет на день: ", Math.floor(budgetDay));
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
