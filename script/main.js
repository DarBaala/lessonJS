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

const AppData = function () {
  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
  this.period = 5;
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
};

AppData.prototype.start = function () {
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
};
AppData.prototype.blockInputs = (disabled = true) => {
  document.querySelectorAll(".data input[type=text]").forEach((item) => {
    item.disabled = disabled;
  });
};
AppData.prototype.reset = function () {
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
};
AppData.prototype.showResult = function () {
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(", ");
  additionalIncomeValue.value = this.addIncome.join(", ");
  targetMonthValue.value = Math.ceil(this.getTargetMonth());
  incomePeriodValue.value = this.calcSavedMoney();
  const _this = this;
  periodSelect.addEventListener("input", function () {
    incomePeriodValue.value = _this.calcSavedMoney();
  });
};

AppData.prototype.addExpensesBlock = function () {
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  cloneExpensesItem.querySelector(".expenses-title").value = "";
  cloneExpensesItem.querySelector(".expenses-amount").value = "";
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
  expensesItems = document.querySelectorAll(".expenses-items");
  if (expensesItems.length === 3) {
    expensesPlus.style.display = "none";
  }
};
AppData.prototype.addIncomeBlock = function () {
  let cloneIncomeItem = incomeItems[0].cloneNode(true);
  cloneIncomeItem.querySelector(".income-title").value = "";
  cloneIncomeItem.querySelector(".income-amount").value = "";
  incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
  incomeItems = document.querySelectorAll(".income-items");
  if (incomeItems.length === 3) {
    incomePlus.style.display = "none";
  }
};
AppData.prototype.getExpenses = function () {
  const _this = this;
  expensesItems.forEach(function (item) {
    let itemExpenses = item.querySelector(".expenses-title").value;
    let cashExpenses = item.querySelector(".expenses-amount").value;
    if (itemExpenses !== "" && cashExpenses !== "") {
      _this.expenses[itemExpenses] = +cashExpenses;
    }
  });
};
AppData.prototype.getIncome = function () {
  const _this = this;
  incomeItems.forEach(function (item) {
    let itemIncome = item.querySelector(".income-title").value;
    let cashIncome = item.querySelector(".income-amount").value;
    if (itemIncome !== "" && cashIncome !== "") {
      _this.income[itemIncome] = +cashIncome;
      _this.incomeMonth += +cashIncome;
    }
  });
};
AppData.prototype.getExpensesMonth = function () {
  this.expensesMonth = 0;
  for (let elem in this.expenses) {
    this.expensesMonth += this.expenses[elem];
  }
};
AppData.prototype.getAddExpenses = function () {
  let addExpenses = additionalExpensesItem.value.split(",");
  const _this = this;
  addExpenses.forEach(function (item) {
    item = item.trim();
    if (item !== "") {
      _this.addExpenses.push(item);
    }
  });
};
AppData.prototype.getAddIncome = function () {
  const _this = this;
  additionalIncomeItem.forEach(function (item) {
    let itemValue = item.value.trim();
    if (itemValue !== "") {
      _this.addIncome.push(itemValue);
    }
  });
};
AppData.prototype.getBudget = function () {
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.ceil(this.budgetMonth / 30);
};
AppData.prototype.getTargetMonth = function () {
  return targetAmount.value / this.budgetMonth;
};
AppData.prototype.calcSavedMoney = function () {
  const _this = this;
  return this.budgetMonth * periodSelect.value;
};
AppData.prototype.blockStart = function () {
  start.disabled = !salaryAmount.value.trim();
};
AppData.prototype.eventsListeners = function () {
  const _this = this;
  start.addEventListener("click", _this.start.bind(appData));
  _this.blockStart();
  expensesPlus.addEventListener("click", _this.addExpensesBlock);
  incomePlus.addEventListener("click", _this.addIncomeBlock);
  salaryAmount.addEventListener("input", _this.blockStart);

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
};
const appData = new AppData();
appData.eventsListeners();
