"use strict";

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
let money;
do {
  money = prompt("Ваш месячный доход?");
} while (!isNumber(money));
let addData = {
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
    addData.addExpenses = addExpenses.toLowerCase().split(", ");
    appData.deposit = confirm("Есть ли у вас депозит в банке?");
    for (i = 0; i < 2; i++) {
      addData.expenses[prompt("Введите обязательную статью расходов?")];
      {
        let sum = 0;
        do {
          sum = prompt("Во сколько это обойдется?");
        } while (!isNumber(sum));
        return sum;
      }
    }
    console.log("addData.expenses:", addData.expenses);
  },
  getExpensesMonth: function () {
    addData.expensesMonth = 0;
    for (let elem in addData.expenses);
    {
      addData.expensesMonth += addData.expenses[elem];
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
  },
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

const targetMonth = appData.getTargetMonth();

if (targetMonth >= 0) {
  console.log(`Цель будет достигнута за: ${targetMonth} месяцев`);
} else {
  console.log(`Цель не будет достигнута`);
}

console.log("Данные:");
for (let elem in appData) {
  console.log(elem, appData[elem]);
}
