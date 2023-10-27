const gameBoard = document.querySelector(".game-board");
const scoreArray = ["X", "O", "X", "O", "X", "O", "X", "O", "O"];

scoreArray.forEach((score, index) => {
  const button = document.createElement("button");
  button.textContent = score;
  button.setAttribute("data-index", index);
  gameBoard.appendChild(button);

  button.onclick = () => {
    button.textContent = button.textContent === "X" ? "O" : "X";
    scoreArray[index] = button.textContent;
  };
});
