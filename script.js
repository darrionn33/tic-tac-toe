const gameBoard = document.querySelector(".game-board");

const endGame = (winner, scoreArray) => {
  scoreArray.forEach((item, index) => {
    scoreArray[index] = "";
  });
  const buttons = document.querySelectorAll(".game-board > button");
  buttons.forEach((button) => {
    button.textContent = "";
  });
  const winnerDiv = document.createElement("div");
  if (winner === "Draw") {
    winnerDiv.textContent = winner + "!";
  } else {
    winnerDiv.textContent = winner + " won!";
  }
  const restartButton = document.createElement("button");
  restartButton.textContent = "RESTART";
  winnerDiv.classList.add("winner");
  winnerDiv.appendChild(restartButton);
  gameBoard.appendChild(winnerDiv);
  restartButton.onclick = () => {
    console.log("reset");
    gameBoard.removeChild(winnerDiv);
  };
  currentMove = 0;
  console.log("currentMove:", currentMove);
};
const checkWin = (scoreArray, currentMove, reset) => {
  const winConditionsArray = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
  ];
  winConditionsArray.every((winCondition) => {
    if (
      scoreArray[winCondition[0]] === "X" &&
      scoreArray[winCondition[1]] === "X" &&
      scoreArray[winCondition[2]] === "X"
    ) {
      reset();
      endGame("X", scoreArray);
    } else if (
      scoreArray[winCondition[0]] === "O" &&
      scoreArray[winCondition[1]] === "O" &&
      scoreArray[winCondition[2]] === "O"
    ) {
      reset();
      endGame("O", scoreArray);
    } else if (currentMove === 9) {
      reset();
      endGame("Draw", scoreArray);
    }
    if (currentMove === 9) {
      return false;
    } else {
      return true;
    }
  });
};

const startGame = (players) => {
  gameBoard.removeChild(document.querySelector(".menu"));
  const scoreArray = ["", "", "", "", "", "", "", "", ""];
  let currentTurn = "X";
  let currentMove = 0;
  const resetCurrentMove = () => {
    currentMove = 0;
    console.log(currentMove);
  };
  switch (players) {
    case 1:
      break;
    case 2:
      scoreArray.forEach((score, index) => {
        const button = document.createElement("button");
        button.textContent = score;
        button.setAttribute("data-index", index);
        gameBoard.appendChild(button);

        button.onclick = () => {
          if (scoreArray[index] === "") {
            switch (currentTurn) {
              case "X":
                button.textContent = "X";
                currentTurn = "O";
                document.querySelector(".x").classList.toggle("active");
                document.querySelector(".o").classList.toggle("active");
                break;
              case "O":
                button.textContent = "O";
                currentTurn = "X";
                document.querySelector(".x").classList.toggle("active");
                document.querySelector(".o").classList.toggle("active");
                break;
            }
            scoreArray[index] = button.textContent;
            currentMove = currentMove + 1;
            console.log("currentMove:", currentMove);
            checkWin(scoreArray, currentMove, resetCurrentMove);
          }
        };
      });
      break;
  }
};

document.querySelector("#start-button").onclick = () => {
  document.querySelector(".menu").replaceChildren();
  const btn1 = document.createElement("button");
  btn1.id = "1P";
  btn1.textContent = "1 Player";
  btn1.setAttribute("disabled", "true");
  const btn2 = document.createElement("button");
  btn2.id = "2P";
  btn2.textContent = "2 Players";
  document.querySelector(".menu").appendChild(btn1);
  document.querySelector(".menu").appendChild(btn2);

  btn1.onclick = () => {
    startGame(1);
  };
  btn2.onclick = () => {
    startGame(2);
  };
};
