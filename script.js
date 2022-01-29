let bookNum = document.querySelector(".books");
let books = document.querySelectorAll(".book");
bookNum.prepend(books[1]);
bookNum.append(books[2]);
books[4].insertAdjacentElement("afterend", books[3]);
document.querySelector(".adv").remove();
document.body.style.backgroundImage = "url(./image/you-dont-know-js.jpg)";
books[4].querySelector("a").textContent = "Книга 3. this и Прототипы Объектов";

let books2 = books[0].querySelectorAll("li");
books2[3].insertAdjacentElement("afterend", books2[6]);
books2[4].insertAdjacentElement("beforebegin", books2[8]);
books2[10].insertAdjacentElement("beforebegin", books2[2]);

let books5 = books[5].querySelectorAll("li");
books5[1].insertAdjacentElement("afterend", books5[9]);
books5[9].insertAdjacentElement("afterend", books5[3]);
books5[8].insertAdjacentElement("beforebegin", books5[5]);
books5[6].insertAdjacentElement("beforebegin", books5[2]);

let books6 = books[2].querySelectorAll("li");
let li = document.createElement("li");
li.textContent = "Глава 8: За пределами ES6";
books6[8].insertAdjacentElement("afterend", li);
