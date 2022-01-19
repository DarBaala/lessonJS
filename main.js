"use strict";

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};
const isStr = function (str) {
  const strReg = /\D/;
  return !strReg.test(str) || str === "" || str === null;
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
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 60000,
  period: 5,
  budget: +money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  asking: function () {
    if (confirm("Есть у Вас дополнительный источник заработка?")) {
      let itemIncome, cashIncome;
      do {
        itemIncome = prompt(
          "Какой дополнительный заработок у Вас есть?",
          "Таксую"
        );
      } while (isStr(itemIncome));
      do {
        cashIncome = prompt("Сколько в месяц Вы на этом зарабатываете?", 10000);
      } while (!isNumber(cashIncome));
      appData.income[itemIncome] = cashIncome;
    }
    let addExpenses;
    do {
      addExpenses = prompt(
        "Перечислите возможные расходы за рассчитываемый период через запятую",
        "Шины,бильярд"
      );
    } while (isStr(addExpenses));
    appData.addExpenses = addExpenses.toLowerCase().split(",");
    appData.deposit = confirm("Есть ли у вас депозит в банке?");
    let sum = 0,
      res = 0,
      question;
    for (let i = 0; i < 2; i++) {
      do {
        question = prompt("Введите обязательную статью расходов?");
      } while (isStr(question));
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
  getInfoDeposit: function () {
    if (appData.deposit) {
      let percentDeposit, moneyDeposit;
      do {
        percentDeposit = prompt("Какой годовой процент ?", "8");
      } while (!isNumber(percentDeposit));
      appData.percentDeposit = percentDeposit;
      do {
        moneyDeposit = prompt("Какая сумма заложена?", 15000);
      } while (!isNumber(moneyDeposit));
      appData.moneyDeposit = moneyDeposit;
    }
  },
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
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
appData.getInfoDeposit();
console.log(
  appData.calcSavedMoney(),
  appData.percentDeposit,
  appData.moneyDeposit
);
console.log(
  appData.addExpenses
    .map((val, i) => val[0].toUpperCase() + val.slice(1))
    .join(", ")
);
