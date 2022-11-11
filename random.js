// Step 1 : on clicking a game sqaure show X or O and update heading depending on whose turn it is
// Step 2 : determine when the game ends -> clicking on square caused the player to win
// Step 3 : End game phase -> show restart button and then reset the board

// To find row of the gameSqaure clicked we can use Math.floor(index of the gameSqaure / board width)
// To find the col of the gameSquare clicked we can index of the gameSquare % board width

const BOARD_WIDTH = 3;

//If gamesquares were numbered from 0 to 8

const WIN_CONDITIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]; //first 3 are for horizontal win, next 3 for vertical win and next 2 for diagonal win

let currentPlayer = 1;
let numMovesDone = 0;

const gameHeading = document.querySelector(".game-heading");

const gameSqaures = document.querySelectorAll(".game-square");

const restartButton = document.getElementById("restart-button");

gameSqaures.forEach((gameSqaure, i) => {
  gameSqaure.addEventListener("click", () => {
    makeMove(gameSqaure);
  });
});

restartButton.addEventListener("click", restartGame);

function makeMove(gameSqaure) {
  //Update text content of gameSquare depending on which player + disable gameSquare button + update heading as based on whose turn it is
  gameSqaure.textContent = currentPlayer === 1 ? "X" : "O";
  gameSqaure.disabled = true;
  numMovesDone++;

  if (didPlayerWin(currentPlayer)) {
    gameHeading.textContent = `Player ${currentPlayer} won`;
    endGame();
  } else if (numMovesDone >= BOARD_WIDTH * BOARD_WIDTH) {
    gameHeading.textContent = "Tie Game!";
    endGame();
  } else {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    setCurrentPlayerHeader();
  }
}

function didPlayerWin() {
  const relevantText = currentPlayer === 1 ? "X" : "O";
  return WIN_CONDITIONS.some((condition) => {
    return condition.every((gameSquarePosition) => {
      return gameSqaures[gameSquarePosition].textContent === relevantText;
    });
  });
}

function endGame() {
  restartButton.style.display = "block";
  gameSqaures.forEach((gameSquare) => {
    gameSquare.disabled = true;
  });
}

function setCurrentPlayerHeader() {
  gameHeading.textContent = `Player ${currentPlayer}'s Turn`;
}

function restartGame() {
  currentPlayer = 1;
  numMovesDone = 0;
  setCurrentPlayerHeader();
  gameSqaures.forEach((gameSquare) => {
    gameSquare.textContent = "";
    gameSquare.disabled = false;
  });
  restartButton.style.display = "none";
}
