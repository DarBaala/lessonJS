"use strict";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const angle = (degrees = 360) => (Math.PI / 180) * degrees;

ctx.arc(150, 150, 50, 0, angle(360), false);
ctx.lineWidth = "3";
ctx.strokeStyle = "#008800";
ctx.stroke();

ctx.moveTo(325, 150);
ctx.arc(275, 150, 50, 0, angle(360), false);
ctx.lineWidth = "3";
ctx.strokeStyle = "#a52a2a";
ctx.stroke();

ctx.moveTo(450, 150);
ctx.arc(400, 150, 50, 0, angle(360), false);
ctx.lineWidth = "3";
ctx.strokeStyle = "#3511d4";
ctx.stroke();

ctx.moveTo(260, 300);
ctx.arc(215, 275, 50, 0, angle(360), false);
ctx.lineWidth = "3";
ctx.strokeStyle = "#3511d4";
ctx.stroke();

ctx.moveTo(385, 300);
ctx.arc(340, 275, 50, 0, angle(360), false);
ctx.lineWidth = "3";
ctx.strokeStyle = "#3511d4";
ctx.stroke();
