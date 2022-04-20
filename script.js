// alert("Connected...");
let winner = null;
let warWinner = null;
let victoryX = 0;
let victory0 = 0;
let win = false;
let player = "X";
let arrSquares = [null, null, null, null, null, null, null, null, null];

const numberOfSquares = document.querySelectorAll(".small-square").length;
const winnerSet = document.querySelector(".winner");
const winnerDiv = document.querySelector("#id-winner");
const markScore = document.querySelector(".score");
const playerTime = document.querySelector(".playertime");
const restartButton = document.querySelector(".restart");
const setButton = document.querySelector(".set");
// const boxWinner = document.querySelector("#id-player");

// event - loop for mounting squares
for (let i = 0; i < numberOfSquares; i++) {
  document.querySelectorAll(".small-square")[i].addEventListener("click", function () {
    if (win) {
      console.log("Restart the game?!");
    } else {
      // console.log(`Got clicked! ${this.outerHTML}`);
      // <div id="1" class="small-square" style="background-color: rgb(17, 187, 170);">X</div>
      let numberSquare = this.outerHTML.substring(9, 10);
      // console.log(`numberSquare length -> ${arrSquares.length}`);
      arrSquares[numberSquare - 1] = player;
      console.log(`Array -> ${arrSquares}`);
      changePlayer(this, player);
    }
  });
}

// event - restart the game without zero values
restartButton.addEventListener("click", function () {
  console.log("restart pressed");
  arrSquares = [null, null, null, null, null, null, null, null, null];
  win = false;
  playerTime.textContent = "PLAYER TIME - X";
  winnerDiv.style.backgroundColor = "lightsteelblue";
  winnerSet.textContent = "WINNER - ";
  player = "X";

  for (let i = 0; i < numberOfSquares; i++) {
    const square = document.querySelectorAll(".small-square")[i];
    square.style.backgroundColor = "#fff";
    square.textContent = "-";
    square.style.color = "#fff";
  }
  return;
});

// event - restart the game all with zero values
setButton.addEventListener("click", function () {
  console.log("set 0 pressed");
  arrSquares = [null, null, null, null, null, null, null, null, null];
  console.log(`Array -> ${arrSquares}`);
  win = false;
  playerTime.textContent = "PLAYER TIME - X";
  winnerDiv.style.backgroundColor = "lightsteelblue";
  winnerSet.textContent = "WINNER - ";
  markScore.textContent = "0 - SCORE - 0";
  player = "X";
  victoryX = 0;
  victory0 = 0;

  for (let i = 0; i < numberOfSquares; i++) {
    const square = document.querySelectorAll(".small-square")[i];
    square.style.backgroundColor = "#fff";
    square.textContent = "-";
    square.style.color = "#fff";
  }
  return;
});

// all functions
// changePlayer(), here we have to change player time (X or 0)
// and check every step if there's a winner or a deuce
// checkWinner(), there's a winner or not? please restart
// with winner score will be marked with getWinner()
// or set 0 to start counting total score again with all zero values
function changePlayer(value, playertime) {
  switch (value.textContent) {
    case "-":
      value.textContent = playertime;
      let audioChoose = new Audio("tap.mp3");
      audioChoose.play();

      // just style
      if (playertime === "X") {
        value.style.backgroundColor = "#25a";
        // player = "0";
      }
      if (playertime === "0") {
        value.style.backgroundColor = "#da0463";
        // player = "X";
        playerTime.textContent = `PLAYER TIME - ${player}`;
      }

      win = checkWinner(arrSquares, player);
      if (!win) {
        if (playertime === "X") {
          player = "0";
          playerTime.textContent = `PLAYER TIME - ${player}`;
        }
        if (playertime === "0") {
          player = "X";
          playerTime.textContent = `PLAYER TIME - ${player}`;
        }
        break;
      } else {
        getWinner();
        break;
      }

    case "X" || "0":
      break;
  }
}

function checkWinner(array, playertime) {
  if (
    (array[0] === playertime && array[1] === playertime && array[2] === playertime) ||
    (array[3] === playertime && array[4] === playertime && array[5] === playertime) ||
    (array[6] === playertime && array[7] === playertime && array[8] === playertime) ||
    (array[0] === playertime && array[3] === playertime && array[6] === playertime) ||
    (array[1] === playertime && array[4] === playertime && array[7] === playertime) ||
    (array[2] === playertime && array[5] === playertime && array[8] === playertime) ||
    (array[0] === playertime && array[4] === playertime && array[8] === playertime) ||
    (array[2] === playertime && array[4] === playertime && array[6] === playertime)
  ) {
    if (playertime === "X") {
      victoryX += 1;
    }
    if (playertime === "0") {
      victory0 += 1;
    }
    return true;
  } else {
    return false;
  }
}

function getWinner() {
  // console.log("inside " + win);
  // console.log("There's a winner!");
  console.log("X-Wins: " + victoryX, "/ 0-Wins: " + victory0);
  winnerDiv.style.backgroundColor = "#0f0";
  winnerSet.textContent = `WE HAVE A WINNER - ${player}`;
  markScore.textContent = victoryX + " - SCORE - " + victory0;
  let audioWin = new Audio("winner.mp3");
  audioWin.play();
}
