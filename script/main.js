"use strict";

let start = document.getElementById("start");
console.log("start:", start);
let incomeAdd = document.getElementsByTagName("button"[0]);
console.log("incomeAdd:", incomeAdd);
let expensesAdd = document.getElementsByTagName("button"[1]);
console.log("expensesAdd:", expensesAdd);
let depositCheck = document.querySelector("#deposit-check");
console.log("depositCheck:", depositCheck);
let additionalIncomeItem = document.querySelectorAll(".additional_income-item");
console.log("additionalIncomeItem:", additionalIncomeItem);
let budgetMonthValue = document.querySelector(".budget_month-value");
console.log("budgetMonthValue: ", budgetMonthValue);
let budgetDayValue = document.querySelector(".budget_day-value");
console.log("budgetDayValue:", budgetDayValue);
let expensesMonthValue = document.querySelector(".expenses_month-value");
console.log("expensesMonthValue: ", expensesMonthValue);
let additionalIncomeValue = document.querySelector(".additional_income-value");
console.log("additionalIncomeValue: ", additionalIncomeValue);
let additionalExpensesValue = document.querySelector(
  ".additional_expenses-value"
);
console.log("additionalExpensesValue: ", additionalExpensesValue);
let incomePeriodValue = document.querySelector(".income_period-value");
console.log("incomePeriodValue: ", incomePeriodValue);
let targetMonthValue = document.querySelector(".target_month-value");
console.log("targetMonthValue:", targetMonthValue);
let periodSelect = document.querySelector(".period-select");
console.log("periodSelect: ", periodSelect);

let salaryAmount = document.querySelector(".salary-amount");
console.log("salaryAmount: ", salaryAmount);
let incomeItems = document.querySelector(".income-items");
console.log("incomeTitle: ", incomeItems.children[0]);
console.log("incomeAmount: ", incomeItems.children[1]);
let expensesItems = document.querySelector(".expenses-items");
console.log("expensesTitle: ", expensesItems.children[0]);
console.log("expensesAmount: ", expensesItems.children[1]);
let additionalExpensesItem = document.querySelector(
  ".additional_expenses-item"
);
console.log("additionalExpensesItem: ", additionalExpensesItem);
let depositAmount = document.querySelector(".deposit-amount");
console.log("depositAmount: ", depositAmount);
let depositPercent = document.querySelector(".deposit-percent");
console.log("depositPercent: ", depositPercent);
let targetAmount = document.querySelector(".target-amount");
console.log("targetAmount: ", targetAmount);
