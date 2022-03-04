"use strict";

const start = document.getElementById("start");
const btnPlus = document.getElementsByTagName("button");
const incomePlus = btnPlus[0];
const expensesPlus = btnPlus[1];
const depositCheck = document.querySelector("#deposit-check");
const additionalIncomeItem = document.querySelectorAll(
  ".additional_income-item"
);
const budgetMonthValue = document.querySelector(".budget_month-value");
const budgetDayValue = document.querySelector(".budget_day-value");
const expensesMonthValue = document.querySelector(".expenses_month-value");
const additionalIncomeValue = document.querySelector(
  ".additional_income-value"
);
const additionalExpensesValue = document.querySelector(
  ".additional_expenses-value"
);
const incomePeriodValue = document.querySelector(".income_period-value");
const targetMonthValue = document.querySelector(".target_month-value");
const periodSelect = document.querySelector(".period-select");
const salaryAmount = document.querySelector(".salary-amount");
let incomeItems = document.querySelectorAll(".income-items");
const incomeTitle = document.querySelectorAll(".income-title")[1];
const incomeAmount = document.querySelector(".income-amount");
const expensesTitle = document.querySelectorAll(".expenses-title")[1];
let expensesItems = document.querySelectorAll(".expenses-items");
const additionalExpensesItem = document.querySelector(
  ".additional_expenses-item"
);
const depositAmount = document.querySelector(".deposit-amount");
const depositPercent = document.querySelector(".deposit-percent");
const targetAmount = document.querySelector(".target-amount");
const periodAmount = document.querySelector(".period-amount");
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

class AppData {
  constructor() {
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
  }
  start() {
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
  }
  blockInputs = (disabled = true) => {
    document.querySelectorAll(".data input[type=text]").forEach((item) => {
      item.disabled = disabled;
    });
  };
  reset() {
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
  }
  showResult() {
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
  }
  addExpensesBlock() {
    const cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector(".expenses-title").value = "";
    cloneExpensesItem.querySelector(".expenses-amount").value = "";
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll(".expenses-items");
    if (expensesItems.length === 3) {
      expensesPlus.style.display = "none";
    }
  }
  addIncomeBlock() {
    const cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector(".income-title").value = "";
    cloneIncomeItem.querySelector(".income-amount").value = "";
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll(".income-items");
    if (incomeItems.length === 3) {
      incomePlus.style.display = "none";
    }
  }
  getExpenses() {
    const _this = this;
    expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector(".expenses-title").value;
      let cashExpenses = item.querySelector(".expenses-amount").value;
      if (itemExpenses !== "" && cashExpenses !== "") {
        _this.expenses[itemExpenses] = +cashExpenses;
      }
    });
  }
  getIncome() {
    const _this = this;
    incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector(".income-title").value;
      let cashIncome = item.querySelector(".income-amount").value;
      if (itemIncome !== "" && cashIncome !== "") {
        _this.income[itemIncome] = +cashIncome;
        _this.incomeMonth += +cashIncome;
      }
    });
  }
  getExpensesMonth() {
    this.expensesMonth = 0;
    for (let elem in this.expenses) {
      this.expensesMonth += this.expenses[elem];
    }
  }
  getExpensesMonth() {
    this.expensesMonth = 0;
    for (let elem in this.expenses) {
      this.expensesMonth += this.expenses[elem];
    }
  }
  getAddExpenses() {
    let addExpenses = additionalExpensesItem.value.split(",");
    const _this = this;
    addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== "") {
        _this.addExpenses.push(item);
      }
    });
  }
  getAddIncome() {
    const _this = this;
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== "") {
        _this.addIncome.push(itemValue);
      }
    });
  }
  getBudget() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.ceil(this.budgetMonth / 30);
  }
  getTargetMonth() {
    return targetAmount.value / this.budgetMonth;
  }
  calcSavedMoney() {
    const _this = this;
    return this.budgetMonth * periodSelect.value;
  }
  blockStart() {
    start.disabled = !salaryAmount.value.trim();
  }

  eventsListeners() {
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
  }
}
const appData = new AppData();
appData.eventsListeners();
