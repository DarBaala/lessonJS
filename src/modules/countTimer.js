const countTimer = (deadline) => {
  const timerHours = document.getElementById("timer-hours");
  const timerMinutes = document.getElementById("timer-minutes");
  const timerSeconds = document.getElementById("timer-seconds");

  const twoDigits = (num) => {
    return num < 10 ? "0" + num : num;
  };

  const getTimeRemaining = () => {
    const dateStop = new Date(deadline).getTime();
    const dateNow = new Date().getTime();
    const fullStop = dateNow > dateStop ? true : false;
    const timeRemaining = (dateStop - dateNow) / 1000;
    const seconds = twoDigits(Math.floor(timeRemaining % 60));
    const minutes = twoDigits(Math.floor((timeRemaining / 60) % 60));
    const hours = twoDigits(Math.floor(timeRemaining / 60 / 60));
    return {
      timeRemaining,
      hours,
      minutes,
      seconds,
      fullStop,
    };
  };

  const updateClock = () => {
    const timer = getTimeRemaining();
    timerHours.textContent = timer.hours;
    timerMinutes.textContent = timer.minutes;
    timerSeconds.textContent = timer.seconds;
  };
  if (getTimeRemaining().timeRemaining > 0) {
    updateClock();
    const timerId = setInterval(() => {
      if (getTimeRemaining().fullStop) {
        clearInterval(timerId);
      } else {
        updateClock();
      }
    }, 1000);
  } else if (getTimeRemaining().fullStop) {
    document.getElementById("timer").style.color = "#FF0000";
  }
};

export default countTimer;
