"use strict";

const start = document.getElementById("start");
const btnPlus = document.getElementsByTagName("button");
const incomePlus = btnPlus[0];
const expensesPlus = btnPlus[1];
const depositCheck = document.getElementById("deposit-check");
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
const incomeTitle = document.querySelectorAll(".income-items .income-title");
const incomeAmount = document.querySelector(".income-amount");
const expensesTitle = document.querySelectorAll(
  ".expenses-items .expenses-title"
);
let expensesItems = document.querySelectorAll(".expenses-items");
const additionalExpensesItem = document.querySelector(
  ".additional_expenses-item"
);
const depositBank = document.querySelector(".deposit-bank");
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
    this.getExpInc();
    this.getExpensesMonth();
    this.getInfoDeposit();
    this.getBudget();
    this.getAddExpInc();
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
  remIncExpBlock(element) {
    const elemLength = element.length;
    for (let i = 1; i < elemLength; i++) {
      element[i].remove();
    }
  }
  reset() {
    for (let i = incomeItems.length - 1; i > 0; i--) {
      incomeItems[0].parentNode.removeChild(incomeItems[i]);
    }
    for (let i = expensesItems.length - 1; i > 0; i--) {
      expensesItems[0].parentNode.removeChild(expensesItems[i]);
    }
    this.remIncExpBlock(document.querySelectorAll(".income-items"));
    this.remIncExpBlock(document.querySelectorAll(".expenses-items"));
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
    periodAmount.textContent = periodSelect.value = 1;
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
  addIncExpBlock(event) {
    const target = event.target;
    const startStr = target.parentNode.className;
    const cloneItem = document
      .querySelector(`.${startStr}-items`)
      .cloneNode(true);
    const clone = target.parentNode.insertBefore(cloneItem, target);
    const cloneItems = document.querySelectorAll(`.${startStr}-items`);
    for (let i = 1; i <= cloneItems.length; i++) {
      clone.querySelector(`.${startStr}-title`).value = "";
      clone.querySelector(`.${startStr}-amount`).value = "";
    }
    if (cloneItems.length === 3) {
      target.style.display = "none";
    }
  }
  getExpInc() {
    const _this = this;
    const count = (item) => {
      const startStr = item.className.split("-")[0],
        itemTitle = item.querySelector(`.${startStr}-title`).value,
        itemAmount = item.querySelector(`.${startStr}-amount`).value;

      if (itemTitle !== "" && itemAmount !== "") {
        _this[startStr][itemTitle] = +itemAmount;
      }
    };

    incomeItems.forEach(count);

    expensesItems.forEach(count);
    for (let key in this.income) {
      _this.incomeMonth += this.income[key];
    }
  }
  getExpensesMonth() {
    this.expensesMonth = 0;
    for (let elem in this.expenses) {
      this.expensesMonth += this.expenses[elem];
    }
  }
  getAddExpInc() {
    const addExpenses = additionalExpensesItem.value.split(",");
    this.addExpenses = addExpenses
      .map((elem) => elem.trim())
      .filter((elem) => elem !== "");
    const addIncomeArray = [...additionalIncomeItem];
    this.addIncome = addIncomeArray
      .map((elem) => elem.value.trim())
      .filter((elem) => elem !== "");
  }
  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth =
      this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
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
  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }
  percentInput() {
    depositPercent.value = depositPercent.value.replace(/[^\d]/g, "");
    if (
      (depositPercent.value !== "" && depositPercent.value < 1) ||
      depositPercent.value > 100
    ) {
      depositPercent.value = depositPercent.value.replace(/[\d]$/, "");
      alert("Введите корректное значение в поле проценты от 0 до 100");
    } else if (depositPercent.value === "") {
      start.disabled = true;
    } else if (salaryAmount.value !== "" && depositPercent.value !== "") {
      start.disabled = false;
    }
  }
  changePercent() {
    const valueSelect = this.value;
    if (valueSelect === "other") {
      depositPercent.value = "";
      depositPercent.style.display = "inline-block";
    } else {
      start.disabled = false;
      depositPercent.value = valueSelect;
      depositPercent.style.display = "none";
    }
  }
  depositHandler() {
    if (depositCheck.checked) {
      if (depositBank.value === "") {
        start.disabled = true;
      }
      depositBank.style.display = "inline-block";
      depositAmount.style.display = "inline-block";
      this.deposit = true;
      depositBank.addEventListener("change", this.changePercent);
      depositPercent.addEventListener("input", this.percentInput);
    } else {
      depositBank.style.display = "none";
      depositAmount.style.display = "none";
      depositPercent.style.display = "none";
      depositAmount.value = "";
      depositBank.value = "";
      depositPercent.value = "";
      this.deposit = false;
      depositBank.removeEventListener("change", this.changePercent);
      depositPercent.removeEventListener("input", this.percentInput);
    }
  }
  eventsListeners() {
    const _this = this;
    start.addEventListener("click", _this.start.bind(appData));
    _this.blockStart();
    expensesPlus.addEventListener("click", (event) =>
      this.addIncExpBlock(event)
    );
    incomePlus.addEventListener("click", (event) => this.addIncExpBlock(event));
    salaryAmount.addEventListener("input", _this.blockStart);
    periodSelect.addEventListener("input", () => {
      periodAmount.textContent = periodSelect.value;
    });
    const collectName = document.querySelectorAll(
      'input[placeholder="Наименование"]'
    );

    collectName.forEach(function (elem) {
      elem.addEventListener("input", function () {
        this.value = this.value.replace(/[^а-я А-Я,]/g, "");
      });
    });

    const collectAmount = document.querySelectorAll(
      'input[placeholder="Сумма"]'
    );

    collectAmount.forEach(function (elem) {
      elem.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/, "");
      });
    });
    depositCheck.addEventListener("change", this.depositHandler.bind(this));
  }
}
const appData = new AppData();
appData.eventsListeners();
