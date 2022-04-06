"use strict";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const color = document.getElementById("color");
const range = document.getElementById("range");
const clearButton = document.getElementById("button");
color.addEventListener("input", () => {
  ctx.strokeStyle = color.value;
});
range.addEventListener("input", () => {
  ctx.lineWidth = range.value;
});
canvas.addEventListener("mousemove", (event) => {
  const x = event.offsetX,
    y = event.offsetY,
    mx = event.movementX,
    my = event.movementY;
  if (event.buttons > 0) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - mx, y - my);
    ctx.stroke();
    ctx.closePath();
  }
});
canvas.addEventListener("touchstart", (event) => {
  const x = event.offsetX,
    y = event.offsetY,
    mx = event.movementX,
    my = event.movementY;
  if (event.buttons > 0) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - mx, y - my);
    ctx.stroke();
    ctx.closePath();
  }
});
clearButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, 600, 600);
});
