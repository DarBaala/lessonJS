const toggleMenu = () => {
  const handlerMenu = (event) => {
    const target = event.target;
    const menu = document.querySelector("menu");
    if (target.closest(".menu")) {
      menu.classList.add("active-menu");
    } else if (target !== menu) {
      menu.classList.remove("active-menu");
    }
  };
  document.body.addEventListener("click", handlerMenu);
};
export default toggleMenu;
