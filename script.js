const gameBoard = document.querySelector(".game-board");
const scoreArray = ["", "", "", "", "", "", "", "", ""];

const endGame = (winner) => {
  scoreArray.forEach((item, index) => {
    scoreArray[index] = "";
    console.log(winner + " wins!");
  });
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.textContent = "";
  });
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
    } else {
      // console.log("Draw!");
    }
  });
};

scoreArray.forEach((score, index) => {
  const button = document.createElement("button");
  button.textContent = score;
  button.setAttribute("data-index", index);
  gameBoard.appendChild(button);

  button.onclick = () => {
    button.textContent = button.textContent === "X" ? "O" : "X";
    scoreArray[index] = button.textContent;
    checkWin();
  };
});
