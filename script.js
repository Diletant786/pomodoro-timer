// get elms
const timer = document.querySelector(".timer");
const startButton = document.querySelector(".start");
const stopButton = document.querySelector(".stop");
const resetButton = document.querySelector(".reset");
const workInput = document.querySelector("#work");
const breakInput = document.querySelector("#break");

// define vars
let minutes = workInput.value; // curr min
let seconds = 0; // curr sec
let interval; // ID
let isWork = true; // work or break interval
let isRunning = false; // running or not

// Update
function updateTimer() {
  timer.textContent = `${minutes.toString().padStart(2, "0")} : ${seconds
    .toString()
    .padStart(2, "0")}`;
}

// Start
function startTimer() {
  if (!isRunning) {
    // If the timer isn't running, start it
    isRunning = true;
    interval = setInterval(tick, 1000);
    startButton.disabled = true;
    stopButton.disabled = false;
    workInput.disabled = true;
    breakInput.disabled = true;
    // console.log("Timer started");
  }
}

// Stop
function stopTimer() {
  if (isRunning) {
    // If the timer is running, stop it
    isRunning = false;
    clearInterval(interval);
    startButton.disabled = false;
    stopButton.disabled = true;
    // console.log("Timer stopped");
  }
}

// Reset
function resetTimer() {
  stopTimer(); // Stop the timer if it is running
  minutes = workInput.value;
  seconds = 0;
  isWork = true;
  updateTimer();
  workInput.disabled = false;
  breakInput.disabled = false;
  console.log("Timer reset");
}

// Tick the timer
function tick() {
  if (seconds > 0) {
    seconds--;
  } else {
    if (minutes > 0) {
      minutes--;
      seconds = 59;
    } else {
      isWork = !isWork;
      if (isWork) {
        minutes = workInput.value;
        alert("Work time!");
      } else {
        minutes = breakInput.value;
        alert("Break time!");
      }
      seconds = 0;
    }
  }
  updateTimer();
}

// Add event listeners to the buttons and inputs
startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
workInput.addEventListener("change", function () {
  if (!isRunning && isWork) {
    minutes = workInput.value;
    updateTimer();
  }
});
breakInput.addEventListener("change", function () {
  if (!isRunning && !isWork) {
    minutes = breakInput.value;
    updateTimer();
  }
});
