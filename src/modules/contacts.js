const contacts = () => {
  const message = document.getElementById("form2-message");
  message.addEventListener("input", () => {
    message.value = message.value.replace(/[^а-яё\d\s\-\?;:,.!]/gi, "");
  });
  message.addEventListener("blur", () => {
    message.value = message.value
      .trim()
      .replace(/\s+/g, " ")
      .replace(/-+/g, "-");
  });
};
export default contacts;
