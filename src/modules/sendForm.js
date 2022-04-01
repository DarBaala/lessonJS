const sendForm = (formId) => {
  const errorMessage = "Что-то пошло не так!",
    loadedMessage = "Загрузка...",
    successMessage = "Спасибо! Мы скоро с Вами свяжемся!";
  const form = document.getElementById(formId);
  const statusMessage = document.createElement("div"); // Cоздаем див
  statusMessage.style.cssText = "font-size: 2rem;"; // Стили для дива
  const postData = (formData) => {
    return fetch("./server.php", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
  };
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Отменяет событие ПО УМОЛЧАНИЮ
    form.appendChild(statusMessage); // Добавляем созданный див в form
    const formData = new FormData(form); // Форма, с которой будем получать данные
    statusMessage.textContent = loadedMessage;
    let body = {};
    form.reset(); //Сбрасываем значения
    // for (let val of formData.entries()) {
    //   body[val[0]] = val[1];
    // } // Достаем значeние из FormData
    formData.forEach((val, key) => {
      body[key] = val; // Достаем значение из FormData, но с помощью forEach
    });
    postData(formData)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Status network not 200");
        }
        statusMessage.textContent = successMessage;
      })
      .catch((error) => {
        statusMessage.textContent = errorMessage;
        console.error(error);
      });
  });
};
export default sendForm;
