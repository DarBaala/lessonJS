"use strict";

let start = document.getElementById("start");
let btnPlus = document.getElementsByTagName("button");
let incomePlus = btnPlus[0];
let expensesPlus = btnPlus[1];
let depositCheck = document.querySelector("#deposit-check");
let additionalIncomeItem = document.querySelectorAll(".additional_income-item");
let budgetMonthValue = document.querySelector(".budget_month-value");
let budgetDayValue = document.querySelector(".budget_day-value");
let expensesMonthValue = document.querySelector(".expenses_month-value");
let additionalIncomeValue = document.querySelector(".additional_income-value");
let additionalExpensesValue = document.querySelector(
  ".additional_expenses-value"
);
let incomePeriodValue = document.querySelector(".income_period-value");
let targetMonthValue = document.querySelector(".target_month-value");
let periodSelect = document.querySelector(".period-select");
let salaryAmount = document.querySelector(".salary-amount");
let incomeItems = document.querySelectorAll(".income-items");
let incomeTitle = document.querySelectorAll(".income-title")[1];
let incomeAmount = document.querySelector(".income-amount");
let expensesTitle = document.querySelectorAll(".expenses-title")[1];
let expensesItems = document.querySelectorAll(".expenses-items");
let additionalExpensesItem = document.querySelector(
  ".additional_expenses-item"
);
let depositAmount = document.querySelector(".deposit-amount");
let depositPercent = document.querySelector(".deposit-percent");
let targetAmount = document.querySelector(".target-amount");
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
let appData = {
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  period: 5,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  start: function () {
    appData.budget = +salaryAmount.value;
    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getBudget();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.showResult();
  },
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(", ");
    additionalIncomeValue.value = appData.addIncome.join(", ");
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcSavedMoney();
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 3) {
      expensesPlus.style.display = "none";
    }
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll(".income-items");
    if (incomeItems.length === 3) {
      incomePlus.style.display = "none";
    }
  },
  getExpenses: function () {
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector(".expenses-title").value;
      let cashExpenses = item.querySelector(".expenses-amount").value;
      if (itemExpenses !== "" && cashExpenses !== "") {
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },
  getIncome: function () {
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector(".income-title").value;
      let cashIncome = item.querySelector(".income-amount").value;
      if (itemIncome !== "" && cashIncome !== "") {
        appData.income[itemIncome] = +cashIncome;
        appData.incomeMonth += +cashIncome;
      }
    });
  },
  getExpensesMonth: function () {
    appData.expensesMonth = 0;
    for (let elem in appData.expenses) {
      appData.expensesMonth += appData.expenses[elem];
    }
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(",");
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== "") {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getBudget: function () {
    appData.budgetMonth =
      appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return targetAmount.value / appData.budgetMonth;
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
    return appData.budgetMonth * periodSelect.value;
  },
  changePeriodSelect: function (event) {
    document.querySelector(".period-amount").textContent = event.target.value;
    incomePeriodValue.value = appData.calcSavedMoney();
  },
  blockStart: function () {
    appData.start.disabled = !salaryAmount.value.trim();
  },
};
appData.blockStart();
start.addEventListener("click", appData.start);
expensesPlus.addEventListener("click", appData.addExpensesBlock);
incomePlus.addEventListener("click", appData.addIncomeBlock);
periodSelect.addEventListener("input", appData.changePeriodSelect);
appData.getInfoDeposit();
