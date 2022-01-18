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
    appData.addExpenses = addExpenses.toLowerCase().split(", ");
    appData.deposit = confirm("Есть ли у вас депозит в банке?");
    for (let i = 0; i < 2; i++) {
      appData.expenses[prompt("Введите обязательную статью расходов?")] =
        (() => {
          let n = 0;
          do {
            n = prompt("Во сколько это обойдется?");
          } while (!isNumber(n));
          return +n;
        })();
    }
    console.log("appData.expenses:", appData.expenses);
  },
  getExpensesMonth: function () {
    appData.expensesMonth = 0;
    for (let elem in appData.expenses) {
      appData.expensesMonth += appData.expenses[elem];
    }
  },
  getBudget: function () {
    if (!appData.budget) {
      appData.budget = 0;
    }
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

const targetMonth = appData.getTargetMonth();

console.log("Расходы за месяц: ", appData.expensesMonth);
console.log(
  targetMonth >= 0
    ? `Цель будет достигнута за: ${targetMonth} месяца`
    : "Цель не будет достигнута"
);
console.log("Уровень дохода: ", appData.getStatusIncome());

console.log("Данные: ");
for (let elem in appData) {
  console.log(elem, appData[elem]);
}
