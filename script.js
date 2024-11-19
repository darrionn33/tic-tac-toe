const gameBoard = document.querySelector(".game-board");

let computer = false;
let playing = false;

const start1 = document.querySelector("#p1");
const start2 = document.querySelector("#p2");

start1.onclick = () => {
  computer = true;
  startGame();
};
start2.onclick = () => {
  startGame();
};

let ended = false;
let moves = 0;
let turn = true;
let scoreArray = ["", "", "", "", "", "", "", "", ""];

const startGame = () => {
  ended = false;
  gameBoard.replaceChildren();

  for (let i = 0; i < 9; i++) {
    const button = document.createElement("button");
    gameBoard.appendChild(button);

    button.onclick = () => {
      if (scoreArray[i] === "" && !playing) {
        button.classList.add("fade-in");
        setTimeout(() => {
          button.classList.remove("fade-in");
          checkWin();
        }, 700);
        button.textContent = turn ? "X" : "O";
        scoreArray[i] = turn ? "X" : "O";
        moves++;
        turn = !turn;

        if (computer && !ended) {
          const randomMove = () => Math.floor(Math.random() * 9) + 1;

          let computerMove;
          playing = true;

          do {
            computerMove = randomMove();
          } while (scoreArray[computerMove] !== "");
          setTimeout(() => {
            document.querySelectorAll("button")[computerMove].textContent = "O";
            document
              .querySelectorAll("button")
              [computerMove].classList.add("fade-in");
            scoreArray[computerMove] = "O";
            moves++;
            turn = !turn;
            setTimeout(() => {
              document
                .querySelectorAll("button")
                [computerMove].classList.remove("fade-in");
              playing = false;
              checkWin();
            }, 200);
          }, 700);
        }
      }
    };
  }
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

  const endGame = (winner = "draw") => {
    ended = true;
    turn = true;
    scoreArray = scoreArray.map(() => "");
    gameBoard.replaceChildren();

    const winnerDiv = document.createElement("div");
    winnerDiv.textContent = winner !== "draw" ? winner + " won!" : "Draw!";

    const restartButton = document.createElement("button");
    restartButton.textContent = "RESTART";
    winnerDiv.classList.add("winner");
    winnerDiv.appendChild(restartButton);
    gameBoard.appendChild(winnerDiv);
    restartButton.onclick = () => {
      startGame();
    };
    moves = 0;
  };

  if (moves === 9) {
    endGame();
  } else {
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
      }
    });
  }
};
