const toggleModal = () => {
  const popUp = document.querySelector(".popup");
  const popUpBtn = document.querySelectorAll(".popup-btn");
  popUp.style.display = "block";
  popUp.style.transform = "translateX(100%)";
  let animation,
    count = 20;
  const transform = () => {
    animation = requestAnimationFrame(transform);
    count--;
    if (count >= 0) {
      popUp.style.transform = `translateX(${count}%)`;
    } else {
      cancelAnimationFrame(animation);
    }
  };
  popUpBtn.forEach((elem) => {
    elem.addEventListener("click", () => {
      if (document.body.clientWidth > 768) {
        requestAnimationFrame(transform);
      } else {
        popUp.style.transform = "translateX(0)";
      }
    });
  });
  popUp.addEventListener("click", (event) => {
    let target = event.target;
    if (target.classList.contains("popup-close")) {
      count = 100;
      popUp.style.transform = "translateX(100%)";
    } else {
      target = target.closest(".popup-content");
      if (!target) {
        count = 100;
        popUp.style.transform = "translateX(100%)";
      }
    }
  });
};
export default toggleModal;
