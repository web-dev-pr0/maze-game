// Stopwatch
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");

const timer = document.getElementById("timer");

let counter = null;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;

function start() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    counter = setInterval(update, 10);
    isRunning = true;
  }
}

function stop() {
  if (isRunning) {
    clearInterval(counter);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
  }
}

function reset() {
  clearInterval(counter);
  startTime = 0;
  elapsedTime = 0;
  isRunning = false;
  timer.textContent = "00:00";
}

function update() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;

  let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
  let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  let seconds = Math.floor((elapsedTime / 1000) % 60);
  let miliseconds = Math.floor((elapsedTime % 1000) / 10);

  seconds = String(seconds).padStart(2, "0");
  minutes = String(minutes).padStart(2, "0");

  timer.textContent = `${minutes}:${seconds}`;
}
// End of Stopwatch

// Creates the boxes inside the maze
const mazeMedium = document.getElementById("maze-medium");
