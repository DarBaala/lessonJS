"use strict";
const validForm = () => {
  //Функции обработки инпутов
  const formNameInput = (event) => {
    const target = event.target;
    target.value = target.value.replace(/[^а-яё\s]/gi, "");
  };
  const formNameBlur = (event) => {
    const target = event.target;
    target.value = target.value
      .split(/\s+/)
      .map((str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase())
      .join(" ");
  };
  const formeEmailInput = (event) => {
    const target = event.target;
    target.value = target.value.replace(/[^a-z0-9@\-_.!~*']/gi, "");
  };
  const formEmailBlur = (event) => {
    const target = event.target;
    target.value = target.value
      .replace(/^[\s-]+|[\s-]+$/gi, "")
      .replace(/-+/g, "-");
  };
  const formePhoneInput = (event) => {
    const target = event.target;
    target.value = target.value.replace(/[^+\d]/g, "");
  };
  const formPhoneBlur = (event) => {
    const target = event.target;
    target.value = target.value.replace(/^[\s]+|[\s\+]{1,}$/g, "");
  };
  //Вешаем слушатель по клику на body и внутри вешаем слушатель на нужный инпут с вызовом соответствущей функции
  document.body.addEventListener("click", (event) => {
    const target = event.target;
    if (target.matches('[placeholder="Ваше имя"]')) {
      target.addEventListener("input", formNameInput);
      target.addEventListener("blur", formNameBlur);
    } else if (target.matches('[placeholder="E-mail"]')) {
      //Вешаем слушатель на поле плейсхолдер которого содержит строку "E-mail"
      target.addEventListener("input", formeEmailInput);
      target.addEventListener("blur", formEmailBlur);
    } else if (target.matches('[placeholder*="телефон"]')) {
      //Вешаем слушатель на поле плейсхолдер которого содержит подстроку "телефон"
      target.addEventListener("input", formePhoneInput);
      target.addEventListener("blur", formPhoneBlur);
    }
    //Удалять слушатели не нужно, повторного навешивания нет. Проверено.
  });
};

export default validForm;
