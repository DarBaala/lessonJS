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
let periodAmount = document.querySelector(".period-amount");
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
    this.budget = +salaryAmount.value;
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getBudget();
    this.getAddExpenses();
    this.getAddIncome();
    this.showResult();
    if (start.textContent === "Рассчитать") {
      this.blockInputs();
      start.textContent = "Сбросить";
      expensesPlus.style.display = "none";
      incomePlus.style.display = "none";
    } else {
      start.textContent = "Рассчитать";
      this.reset();
    }
  },
  blockInputs: (disabled = true) => {
    document.querySelectorAll(".data input[type=text]").forEach((item) => {
      item.disabled = disabled;
    });
  },
  reset: function () {
    for (let i = incomeItems.length - 1; i > 0; i--) {
      incomeItems[0].parentNode.removeChild(incomeItems[i]);
    }
    for (let i = expensesItems.length - 1; i > 0; i--) {
      expensesItems[0].parentNode.removeChild(expensesItems[i]);
    }
    incomePlus.style.display = "";
    expensesPlus.style.display = "";

    this.blockInputs(false);
    document.querySelectorAll("input[type=text]").forEach((item) => {
      item.value = "";
    });
    this.getBudget();
    periodSelect.value = 1;
    this.blockStart();
    this.budget = 0;
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
  },
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(", ");
    additionalIncomeValue.value = this.addIncome.join(", ");
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelect.addEventListener("input", this.changePeriodSelect);
  },
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector(".expenses-title").value = "";
    cloneExpensesItem.querySelector(".expenses-amount").value = "";
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 3) {
      expensesPlus.style.display = "none";
    }
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector(".income-title").value = "";
    cloneIncomeItem.querySelector(".income-amount").value = "";
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
    this.expensesMonth = 0;
    for (let elem in this.expenses) {
      this.expensesMonth += this.expenses[elem];
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
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.ceil(this.budgetMonth / 30);
  },
  getTargetMonth: function () {
    return targetAmount.value / this.budgetMonth;
  },
  calcSavedMoney: function () {
    return this.budgetMonth * periodSelect.value;
  },
  changePeriodSelect: function (event) {
    periodAmount.textContent = event.target.value;
    incomePeriodValue.value = appData.calcSavedMoney();
  },
  blockStart: function () {
    start.disabled = !salaryAmount.value.trim();
  },
};
start.addEventListener("click", appData.start.bind(appData));
appData.blockStart();
expensesPlus.addEventListener("click", appData.addExpensesBlock);
incomePlus.addEventListener("click", appData.addIncomeBlock);
salaryAmount.addEventListener("input", appData.blockStart);

let collectName = document.querySelectorAll(
  'input[placeholder="Наименование"]'
);

collectName.forEach(function (elem) {
  elem.addEventListener("input", function () {
    this.value = this.value.replace(/[^а-я А-Я,]/g, "");
  });
});

let collectAmount = document.querySelectorAll('input[placeholder="Сумма"]');

collectAmount.forEach(function (elem) {
  elem.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/, "");
  });
});
