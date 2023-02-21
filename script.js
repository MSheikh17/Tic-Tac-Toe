const cells = document.querySelectorAll(".cell");
const resetBtn = document.querySelector("#reset");
const playBtn = document.querySelector("#startGame");
const opponents = document.querySelector("#opponents");

const gameboard = (() => {
  board = ["", "", "", "", "", "", "", "", ""];

  return { board };
})();

console.log(board);

//Factory functions to Create Player
const player = (name, symbol) => {
  return { name, symbol };
};

const player1 = player("Player 1", "X");
const player2 = player("Player 2", "O");

//Plays Game and Checks Winner
const playGame = (() => {
  const winner = document.querySelector(".winnerDisplay");
  let newArr = [];

  //Human vs Human
  function markSpot(e) {
    console.log(e.target.id);
    const indexOftarget = e.target.id;
    if (this.textContent === "") {
      this.textContent =
        newArr.at(-1) !== player1.symbol ? player1.symbol : player2.symbol;
    }
    newArr.push(this.textContent);
    board[indexOftarget] = this.textContent;
    console.log(board);
    console.log(this.textContent);
    checkWinner();
  }

  //Human vs Computer

  //Random Position Generator
  let compArray = [];
  let gameArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  function nextPosition(e) {
    console.log(gameArr);
    const indexOftarget = Number(e.target.id);
    compArray.push(indexOftarget);
    if (this.textContent === "") {
      this.textContent = player1.symbol;
    }
    board[indexOftarget] = this.textContent;
    console.log(board);

    const deletedNumber = gameArr.indexOf(indexOftarget);
    gameArr.splice(deletedNumber, 1);
    console.log(gameArr);

    // Random Number Generator
    let randNum = Math.trunc(Math.random() * gameArr.length);
    console.log(randNum);
    let delNum2 = gameArr.at(randNum);
    console.log(delNum2);
    gameArr.splice(randNum, 1);
    console.log(gameArr);
    compArray.push(delNum2);
    console.log(compArray);

    checkWinner();

    let randomPosition = "";

    if (gameArr.length !== 0) {
      randomPosition = document.getElementById(`${delNum2}`);
    }
    if (randomPosition.textContent === "" && winner.textContent === "") {
      randomPosition.textContent = player2.symbol;
    }

    board[delNum2] = randomPosition.textContent;
    console.log(board);

    console.log(winner.textContent);

    checkWinner();
  }

  // Human vs AI
  function aImoves(e) {
    console.log(gameArr);
    const indexOftarget = Number(e.target.id);
    compArray.push(indexOftarget);
    if (this.textContent === "") {
      this.textContent = player1.symbol;
    }
    board[indexOftarget] = this.textContent;
    console.log(board);

    const deletedNumber = gameArr.indexOf(indexOftarget);
    gameArr.splice(deletedNumber, 1);
    console.log(gameArr);
  }

  function aI() {
    cells.forEach((cell) => cell.addEventListener("click", aImoves));
  }

  function compClick() {
    cells.forEach((cell) => cell.addEventListener("click", nextPosition));
  }

  function addClick() {
    cells.forEach((cell) => cell.addEventListener("click", markSpot));
  }

  playBtn.addEventListener("click", () => {
    console.log(opponents.value);
    if (opponents.value === "Human vs Human") {
      addClick();
    }
    if (opponents.value === "Human vs Computer") {
      compClick();
    }
    if (opponents.value === "Human vs AI") {
      aI();
    }
    if (winner.textContent !== "") {
      cells.forEach((cell) => (cell.textContent = ""));
      winner.textContent = "";
      newArr.push("");
      board = ["", "", "", "", "", "", "", "", ""];
      console.log(board);
      addClick();
    }
  });

  function removeClick() {
    cells.forEach((cell) => cell.removeEventListener("click", markSpot));
  }

  function removeClick2() {
    cells.forEach((cell) => cell.removeEventListener("click", nextPosition));
  }

  function reset() {
    resetBtn.addEventListener("click", () => {
      if (opponents.value === "Human vs Human") {
        cells.forEach((cell) => (cell.textContent = ""));
        winner.textContent = "";
        board = ["", "", "", "", "", "", "", "", ""];
        newArr = [];
        addClick();
      } else if (opponents.value === "Human vs Computer") {
        cells.forEach((cell) => (cell.textContent = ""));
        winner.textContent = "";
        board = ["", "", "", "", "", "", "", "", ""];
        gameArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        compArray = [];
        compClick();
      }
    });
  }

  reset();

  function checkWinner() {
    if (board[0] === board[1] && board[1] === board[2] && board[0] !== "") {
      removeClick();
      removeClick2();
      winner.textContent = `${board[0]} wins`;
      return;
    }
    if (board[3] === board[4] && board[4] === board[5] && board[3] !== "") {
      removeClick();
      removeClick2();
      winner.textContent = `${board[3]} wins`;
      return;
    }
    if (board[6] === board[7] && board[7] === board[8] && board[6] !== "") {
      removeClick();
      removeClick2();
      winner.textContent = `${board[6]} wins`;
      return;
    }
    if (board[0] === board[3] && board[3] === board[6] && board[0] !== "") {
      removeClick();
      removeClick2();
      winner.textContent = `${board[0]} wins`;
      return;
    }
    if (board[1] === board[4] && board[4] === board[7] && board[1] !== "") {
      removeClick();
      removeClick2();
      winner.textContent = `${board[1]} wins`;
      return;
    }
    if (board[2] === board[5] && board[5] === board[8] && board[2] !== "") {
      removeClick();
      removeClick2();
      winner.textContent = `${board[2]} wins`;
      return;
    }
    if (board[0] === board[4] && board[4] === board[8] && board[0] !== "") {
      removeClick();
      removeClick2();
      winner.textContent = `${board[0]} wins`;
      return;
    }
    if (board[2] === board[4] && board[4] === board[6] && board[2] !== "") {
      removeClick();
      removeClick2();

      winner.textContent = `${board[2]} wins`;
      return;
    }
    if (
      board[0] !== "" &&
      board[1] !== "" &&
      board[2] !== "" &&
      board[3] !== "" &&
      board[4] !== "" &&
      board[5] !== "" &&
      board[6] !== "" &&
      board[7] !== "" &&
      board[8] !== ""
    ) {
      winner.textContent = "DRAW!";
    }
  }
})();
