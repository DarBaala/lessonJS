("use strict");
import countTimer from "./modules/countTimer";
import toggleMenu from "./modules/toggleMenu";
import toggleModal from "./modules/toggleModal";
import tabs from "./modules/tabs";
import slider from "./modules/slider";
import setCommandImg from "./modules/setCommandImg";
import calculator from "./modules/calculator";
import validForm from "./modules/validForm";
import contacts from "./modules/contacts";
import sendForm from "./modules/sendForm";

/// TImer
window.onload = countTimer("12 apr 2022");
/// MENU
toggleMenu();
///POPUP
toggleModal();
//Таб
tabs();
/// Слайдер
slider();
setCommandImg();
/// Calc
calculator(100);
//Валидация форм
validForm();
//Блок Контакты
contacts();
//sendForm
sendForm("form1");
sendForm("form2");
sendForm("form3");
