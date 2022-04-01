const calculator = (price = 100) => {
  const checkCalcBlock = () => {
    const calcBlock = document.querySelector(".calc-block");
    calcBlock.addEventListener("input", (event) => {
      if (event.target.matches("input")) {
        event.target.value = event.target.value.replace(/\D/, "");
      }
    });
  };
  checkCalcBlock();
  const calcBlock = document.querySelector(".calc-block");
  const calcType = document.querySelector(".calc-type");
  const calcSquare = document.querySelector(".calc-square");
  const calcCount = document.querySelector(".calc-count");
  const calcDay = document.querySelector(".calc-day");
  const totalValue = document.getElementById("total");
  const countSum = () => {
    let total = 0,
      countValue = 1,
      dayValue = 1;
    const typeValue = calcType.options[calcType.selectedIndex].value;
    const squareValue = +calcSquare.value;
    if (calcCount.value > 1) {
      countValue += (calcCount.value - 1) / 10;
    }
    if (calcDay.value && calcDay.value < 5) {
      dayValue *= 2;
    } else if (calcDay.value && calcDay.value < 10) {
      dayValue *= 1.5;
    }
    if (typeValue && squareValue) {
      total = price * typeValue * squareValue * countValue * dayValue;
    }
    totalValue.textContent = total;
  };
  calcBlock.addEventListener("change", (event) => {
    const target = event.target;
    if (target.matches("select") || target.matches("input")) {
      countSum();
    }
  });
  calcBlock.addEventListener("input", (event) => {
    if (event.target.matches("input")) {
      event.target.value = event.target.value.replace(/\D/, "");
    }
  });
};
export default calculator();
