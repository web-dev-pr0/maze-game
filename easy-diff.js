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
const mazeEasy = document.getElementById("maze-easy");

// Maze Layout
const easyMaze = [
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 0, 1, 1, 1, 0, 1, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 3, 0, 0, 1, 1, 3, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 0, 1],
  [1, 3, 1, 0, 0, 0, 0, 0, 1, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 1, 1],
  [1, 0, 1, 3, 1, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 1, 0, 1],
  [1, 0, 3, 1, 1, 1, 1, 1, 0, 0],
];

// Default position of the cat
let catPosition = { row: 0, col: 0 };

// Creates each block inside the maze
easyMaze.forEach((row, rowIndex) => {
  row.forEach((value, colIndex) => {
    const box = document.createElement("div");
    mazeEasy.appendChild(box);

    // Adds color to the boxes that you can't walk on
    if (value === 1) {
      box.style.backgroundColor = "var(--maze-color)";
    }

    // Adds the cat
    if (rowIndex === 0 && colIndex === 0) {
      box.style.background = "url(images/ginger-cat.png) center";
      box.style.backgroundSize = "cover";
      catPosition.row = rowIndex;
      catPosition.col = colIndex;
    }

    // Adds the Final Cat Food
    if (rowIndex === 9 && colIndex === 9) {
      box.style.background = "url(images/cat-food.png) center";
      box.style.backgroundSize = "cover";
    }

    // Adds the random stuff scattered around the maze
    if (rowIndex === 7 && colIndex === 3) {
      box.style.background = "url(images/dead-fish.png) center";
      box.style.backgroundSize = "cover";
    }

    if (rowIndex === 3 && colIndex === 3) {
      box.style.background = "url(images/ball-of-yarn.png) center";
      box.style.backgroundSize = "cover";
    }

    if (rowIndex === 5 && colIndex === 1) {
      box.style.background = "url(images/dead-fish.png) center";
      box.style.backgroundSize = "cover";
    }
    if (rowIndex === 9 && colIndex === 2) {
      box.style.background = "url(images/ball-of-yarn.png) center";
      box.style.backgroundSize = "cover";
    }

    if (rowIndex === 3 && colIndex === 8) {
      box.style.background = "url(images/dead-fish.png) center";
      box.style.backgroundSize = "cover";
    }

    if (rowIndex === 5 && colIndex === 1) {
      box.style.background = "url(images/dead-fish.png) center";
      box.style.backgroundSize = "cover";
    }
  });
});

// End of Creating Boxes

// Moves the player
let score = 0; // Initialize score

function moveUp() {
  start();
  if (
    catPosition.row > 0 &&
    easyMaze[catPosition.row - 1][catPosition.col] !== 1
  ) {
    catPosition.row--;
    updateCatPosition();
  }
}

function moveDown() {
  start();

  if (
    catPosition.row < easyMaze.length - 1 &&
    easyMaze[catPosition.row + 1][catPosition.col] !== 1
  ) {
    catPosition.row++;
    updateCatPosition();
  }
}

function moveRight() {
  start();

  if (
    catPosition.col < easyMaze[0].length - 1 &&
    easyMaze[catPosition.row][catPosition.col + 1] !== 1
  ) {
    catPosition.col++;
    updateCatPosition();
  }
}

function moveLeft() {
  start();

  if (
    catPosition.col > 0 &&
    easyMaze[catPosition.row][catPosition.col - 1] !== 1
  ) {
    catPosition.col--;
    updateCatPosition();
  }
}

function updateScore() {
  const scoreDisplay = document.getElementById("score");
  score += 20;
  scoreDisplay.textContent = score.toString().padStart(3, "0");
}

// Upates cat's position
let previousCatBox = null;

function updateCatPosition() {
  // Clear the background of the previous position
  if (previousCatBox) {
    previousCatBox.style.background = "";
  }

  // Get the new position element
  const newCatBox =
    mazeEasy.children[catPosition.row * easyMaze[0].length + catPosition.col];

  // Check if the new position contains a collectible item
  const newValue = easyMaze[catPosition.row][catPosition.col];
  if (newValue === 3) {
    updateScore();
  }

  // Set the background of the new position
  newCatBox.style.background = "url(images/ginger-cat.png) center";
  newCatBox.style.backgroundSize = "cover";

  // Update the previousCatBox reference
  previousCatBox = newCatBox;

  if (catPosition.row === 9 && catPosition.col === 9) {
    stop();
    const endGameScreen = document.getElementById("end-game");
    const timeEndScreen = document.getElementById("time-end");
    const scoreTimeEnd = document.getElementById("score-end");

    endGameScreen.style.display = "flex";

    timeEndScreen.textContent = `Time: ${timer.textContent}`;
    scoreTimeEnd.textContent = `Score: ${
      document.getElementById("score").textContent
    }`;
  }
}

// Play Again?
function restartGame() {
  location.reload();
}
