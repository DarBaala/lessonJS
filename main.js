"use strict";

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let money;
do {
  money = prompt("Ваш месячный доход?");
} while (!isNumber(money));
let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 60000,
  period: 5,
  budget: +money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    let addExpenses = prompt(
      "Перечислите возможные расходы за рассчитываемый период через запятую"
    );
    appData.addExpenses = addExpenses.toLowerCase().split(",");
    appData.deposit = confirm("Есть ли у вас депозит в банке?");
    let sum = 0,
      res = 0,
      question;
    for (let i = 0; i < 2; i++) {
      question = prompt("Введите обязательную статью расходов?");
      sum = prompt("Во сколько это обойдется?");
      while (!isNumber(sum)) {
        sum = prompt("Во сколько это обойдется?");
      }
      appData.expenses[question] = +sum;
    }
    console.log("appData.expenses:", appData.expenses);

    return res;
  },
  getExpensesMonth: function () {
    let sum = 0;
    for (let elem in appData.expenses) {
      sum += appData.expenses[elem];
    }
    appData.expensesMonth = sum;
  },
  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return Math.ceil(appData.mission / appData.budgetMonth);
  },
  getStatusIncome: function () {
    if (appData.budgetDay === 1200) {
      return "У вас почти получилось попасть в группу с высоким уровнем дохода";
    } else if (appData.budgetDay === 600) {
      return "У вас почти средний уровень дохода";
    } else if (appData.budgetDay > 1200) {
      return "У вас высокий уровень дохода";
    } else if (appData.budgetDay < 1200 && appData.budgetDay > 600) {
      return "У вас средний уровень дохода";
    } else if (appData.budgetDay < 0) {
      return "Ты какой-то бомж";
    } else {
      return "Ваш уровень дохода ниже среднего";
    }
  },
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log("Расходы за месяц: ", appData.expensesMonth);
if (appData.getTargetMonth() > 0) {
  console.log("Цель достигнется за: ", appData.getTargetMonth());
} else {
  console.log("Цель не будет достигнута");
}
console.log("Уровень дохода: ", appData.getStatusIncome());

console.log("Данные: ");
for (let elem in appData) {
  console.log(elem, appData[elem]);
}
