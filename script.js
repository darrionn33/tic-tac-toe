const gameBoard = document.querySelector(".game-board");

const renderButtons = (active = "X") => {
  const xButton = document.createElement("button");
  const oButton = document.createElement("button");
  xButton.textContent = "X";
  oButton.textContent = "O";

  switch (active) {
    case "X":
      xButton.classList.add("active");
      oButton.classList.remove("active");
      break;
    case "O":
      oButton.classList.add("active");
      xButton.classList.remove("active");
      break;
  }
  document.querySelector(".buttons").replaceChildren();
  document.querySelector(".buttons").appendChild(xButton);
  document.querySelector(".buttons").appendChild(oButton);
};
renderButtons();
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
    gameBoard.removeChild(winnerDiv);
  };
  currentMove = 0;
};
const checkWin = (scoreArray, currentMove, reset, currentTurnSetter) => {
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
      currentTurnSetter();
      endGame("X", scoreArray);
      renderButtons("X");
    } else if (
      scoreArray[winCondition[0]] === "O" &&
      scoreArray[winCondition[1]] === "O" &&
      scoreArray[winCondition[2]] === "O"
    ) {
      reset();
      currentTurnSetter("O");
      renderButtons("O");
      endGame("O", scoreArray);
    } else if (currentMove === 9) {
      reset();
      endGame("Draw", scoreArray);
      currentTurnSetter();
      renderButtons();
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
  const currentTurnSetter = (turn = "X") => {
    currentTurn = turn;
  };
  const resetCurrentMove = () => {
    currentMove = 0;
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
                renderButtons("O");
                break;
              case "O":
                button.textContent = "O";
                currentTurn = "X";
                renderButtons();
                break;
            }
            scoreArray[index] = button.textContent;
            currentMove = currentMove + 1;
            checkWin(
              scoreArray,
              currentMove,
              resetCurrentMove,
              currentTurnSetter
            );
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
