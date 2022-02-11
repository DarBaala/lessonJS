"use strict";

const todoControl = document.querySelector(".todo-control");
const headerInput = document.querySelector(".header-input");
const todoList = document.querySelector(".todo-list");
const todoRemove = document.querySelector(".todo-remove");
const todoCompleted = document.querySelector(".todo-completed");
const todoData = [];
const loadLocalStorage = function () {
  const locStor = localStorage.getItem("todoList");
  if (locStor !== null) {
    const saveTodo = JSON.parse(locStor);
    saveTodo.forEach(function (item) {
      todoData.push(item);
    });
  }
};

const saveLocalStorage = function () {
  const json = JSON.stringify(todoData);
  localStorage.setItem("todoList", json);
};

const render = function () {
  todoList.textContent = "";
  todoCompleted.textContent = "";
  todoData.forEach(function (item, i) {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.innerHTML =
      '<span class="text-todo">' +
      item.value +
      "</span>" +
      '<div class="todo-buttons">' +
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
      "</div>";
    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }
    const todoComplete = li.querySelector(".todo-complete");
    todoComplete.addEventListener("click", function () {
      item.completed = !item.completed;
      render();
      saveLocalStorage();
    });
    const btnTodoRemove = li.querySelector(".todo-remove");
    btnTodoRemove.addEventListener("click", function () {
      li.remove();
      todoData.splice(i, 1);
      render();
      if (todoData.length !== 0) {
        saveLocalStorage();
      } else {
        localStorage.removeItem("todoList");
      }
    });
  });
};

todoControl.addEventListener("submit", function (event) {
  event.preventDefault();
  const newTodo = {
    value: headerInput.value,
    completed: false,
  };
  if (headerInput.value !== "") {
    todoData.push(newTodo);
    headerInput.value = "";
    saveLocalStorage();
    render();
  }
});

loadLocalStorage();
document.addEventListener("DOMContentLoaded", render);
