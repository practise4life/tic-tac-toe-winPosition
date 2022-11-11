// //Get all the gameSquares node using query Query Selector
// //for each game Square add a click event listener then if clicked add callback to makeMove passing gameSquare
// //makeMove Function : for the gameSquare -> update text content, disable and increment count
// //makeMove Function : Check if anyPlayerWin if update heading and endGame
// //makeMove Function : Check if tied game based on no of moves and endGame
// //makeMove Function : Else update current player and call setPlayerHeading()
// //didPlayer Function : for some WIN_CONDITION where every condition is controlled by textContent of the currentPlayer
// //endGame Function : forEach gameSquare disable it and show restart button
// //restartGame : add a click event to global scope and call restartGame when clicked
// //restartGame Function :

// let currentPlayer = 1;
// let numOfMoves = 0;
// const BOARD_WIDTH = 3;

// const gameSquares = document.querySelectorAll(".game-square");
// const gameHeading = document.querySelector("game-heading");
// const restartButton = document.getElementById("restart-button");

// const WIN_CONDITION = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [2, 4, 6],
// ];

// gameSquares.forEach((gameSquare) => {
//   gameSquare.addEventListener("click", () => {
//     makeMove(gameSquare);
//   });
// });

// restartGame.addEventListener("click", restartGame);

// function makeMove(gameSquare) {
//   gameSquare.textContent = currentPlayer === 1 ? "X" : "O";
//   gameSquare.disabled = true;
//   numOfMoves++;

//   if (didPlayerWin()) {
//     gameHeading.textContent = `Player ${currentPlayer} Won!`;
//     endGame();
//   } else if (numOfMoves >= BOARD_WIDTH * BOARD_WIDTH) {
//     gameHeading.textContent = "Game tied!";
//     endGame();
//   } else {
//     currentPlayer = currentPlayer === 1 ? 2 : 1;
//     setPlayerHeading();
//   }
// }

// function didPlayerWin() {
//   const relevantText = currentPlayer === 1 ? "X" : "O";
//   return WIN_CONDITION.some((condition) => {
//     return condition.every((gameSquarePosition) => {
//       return gameSquares[gameSquarePosition].textContent === relevantText;
//     });
//   });
// }

// function endGame() {
//   restartButton.style.display = "block";
//   gameSquares.forEach((gameSquare) => {
//     gameSquare.disables = true;
//   });
// }

// function setCurrentPlayerHeader() {
//   gameHeading.textContent = `Player ${currentPlayer}'s turn`;
// }

// function restartGame() {
//   currentPlayer = 1;
//   numOfMoves = 0;
//   setCurrentPlayerHeader();
//   gameSquares.forEach((gameSquare) => {
//     gameSquare.textContent = "";
//     gameSquare.disabled = false;
//   });
//   restartButton.style.display = "none";
// }

//Step 1 : on clicking a game sqaure show X or O and update heading depending on whose turn it is
//Step 2 : determine when the game ends -> clicking on square caused the player to win
//Step 3 : End game phase -> show restart button and then reset the board

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
