/*-------------------------------- Constants --------------------------------*/
const squareEls = document.querySelectorAll(".sqr");
const messageEl = document.querySelector("#message");
// console.log(squareEls, messageEl);
const resetBtn = document.querySelector("#reset")

/*---------------------------- Variables (state) ----------------------------*/
let board = ["", "", "", "", "", "", "", "", ""];
let turn = "X";
let winner = false;
let tie = false;
const winningCombos = [
  // Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // Diagonals
  [0, 4, 8],
  [2, 4, 6],
];

/*------------------------ Cached Element References ------------------------*/


/*-------------------------------- Functions --------------------------------*/
// const updateBoard = function() {
//     squareEls.forEach((squ) => {
//      squ.textContent = board[squ.id]
//     })
// }

const updateBoard = function () {
  board.forEach((element, index) => {
    const square = squareEls[index];

    if (element === "X") {
      square.textContent = "X";
      square.style.color = "tomato";
    } else if (element === "O") {
      square.textContent = "O";
      square.style.color = "firebrick";
    //   square.classList.add("red-text-color")
    } else {
      square.textContent = "";
      //   square.style.color = "";
    }
  });
};

const updateMessage = function () {
  if (winner === false && tie === false) {
    messageEl.textContent = `${turn}'s turn`;
  } else if (winner === false && tie === true) {
    messageEl.textContent = "It's a tie";
  } else {
    messageEl.textContent = "Congatulations, you won!";
  }
};

const render = function () {
  updateBoard();
  updateMessage();
};

const init = function () {
    board = ["", "", "", "", "", "", "", "", ""];
    turn = "X";
    winner = false;
    tie = false;
    render()
};

init();

const placePiece = function (index) {
  board[index] = turn;
};

const checkForWinner = function () {
  winningCombos.forEach((combo) => {
    let values = {
      X: board[combo[0]],
      Y: board[combo[1]],
      Z: board[combo[2]],
    };
        
    if (!values.X) {
      return;
    } else if (values.X === values.Y && values.X === values.Z) {
      winner = true;
    }
  });
};

const checkForTie = function () {
  if (winner) {
    return;
  } else if (board.some((sqr) => sqr === "")) {
    return;
  } else {
    tie = true;
  }
};

const switchPlayerTurn = function () {
  if (winner) {
    return;
  } else {
    turn = turn === "X" ? "O" : "X";
  }
};

const handelClick = function (e) {
  const id = e.target.id;
  placePiece(id);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
};

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((sqr) => {
  sqr.addEventListener("click", handelClick);
});

resetBtn.addEventListener("click", init)