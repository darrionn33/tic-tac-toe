const gameBoard = document.querySelector(".game-board");
const scoreArray = ["", "", "", "", "", "", "", "", ""];
let currentTurn = "X";
let currentMove = 0;

const endGame = (winner) => {
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
  winnerDiv.classList.add("winner");
  gameBoard.appendChild(winnerDiv);
  setTimeout(() => {
    gameBoard.removeChild(winnerDiv);
  }, 1000);
  currentMove = 0;
};
const checkWin = () => {
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
  winConditionsArray.forEach((winCondition) => {
    if (
      scoreArray[winCondition[0]] === "X" &&
      scoreArray[winCondition[1]] === "X" &&
      scoreArray[winCondition[2]] === "X"
    ) {
      endGame("X");
    } else if (
      scoreArray[winCondition[0]] === "O" &&
      scoreArray[winCondition[1]] === "O" &&
      scoreArray[winCondition[2]] === "O"
    ) {
      endGame("O");
    } else if (currentMove === 9) {
      endGame("Draw");
    }
  });
};

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
      checkWin();
    }
  };
});
