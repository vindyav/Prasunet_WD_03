let boxes = document.querySelectorAll(".box");

let turn = "X";
let isGameOver = false;
let scores = { X: 0, O: 0 };

function updateTurnDisplay() {
  document.querySelector("#currentTurn").textContent = turn;
}

function updateScores() {
  document.querySelector("#xScore").textContent = scores.X;
  document.querySelector("#oScore").textContent = scores.O;
}

boxes.forEach((e) => {
  e.innerHTML = "";
  e.addEventListener("click", () => {
    if (!isGameOver && e.innerHTML === "") {
      e.innerHTML = turn;
      checkWin();
      checkDraw();
      if (!isGameOver) {
        changeTurn();
        updateTurnDisplay();
      }
    }
  });
});

function changeTurn() {
  if (turn === "X") {
    turn = "O";
    document.querySelector(".bg").style.left = "85px";
  } else {
    turn = "X";
    document.querySelector(".bg").style.left = "0";
  }
}

function checkWin() {
  let winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winConditions.length; i++) {
    let v0 = boxes[winConditions[i][0]].innerHTML;
    let v1 = boxes[winConditions[i][1]].innerHTML;
    let v2 = boxes[winConditions[i][2]].innerHTML;

    if (v0 != "" && v0 === v1 && v0 === v2) {
      isGameOver = true;
      document.querySelector("#results").innerHTML =
        turn +
        " wins!! <br> Want to Continue with the scores? <br/> Then continue!!";
      document.querySelector("#Restart").style.display = "inline";
      document.querySelector("#Continue").style.display = "inline";
      scores[turn]++;
      updateScores();

      for (let j = 0; j < 3; j++) {
        boxes[winConditions[i][j]].style.backgroundColor = "rgb(218, 168, 168)";
        boxes[winConditions[i][j]].style.color = "black";
      }
    }
  }
}

function checkDraw() {
  if (!isGameOver) {
    let isDraw = true;
    boxes.forEach((e) => {
      if (e.innerHTML === "") isDraw = false;
    });

    if (isDraw) {
      isGameOver = true;
      document.querySelector("#results").innerHTML =
        "Draw!! <br> Want to Continue with the scores? <br/> Then continue!!";
      document.querySelector("#Restart").style.display = "inline";
      document.querySelector("#Continue").style.display = "inline";
    }
  }
}

document.querySelector("#Restart").addEventListener("click", () => {
  isGameOver = false;
  turn = "X";
  updateTurnDisplay();
  document.querySelector("#results").innerHTML = "";
  document.querySelector("#Restart").style.display = "none";
  document.querySelector("#Continue").style.display = "none";
  scores = { X: 0, O: 0 };
  updateScores();

  boxes.forEach((e) => {
    e.innerHTML = "";
    e.style.removeProperty("background-color");
    e.style.color = "black";
  });
});

document.querySelector("#Continue").addEventListener("click", () => {
  isGameOver = false;
  turn = "X";
  updateTurnDisplay();
  document.querySelector("#results").innerHTML = "";
  document.querySelector("#Restart").style.display = "none";
  document.querySelector("#Continue").style.display = "none";

  boxes.forEach((e) => {
    e.innerHTML = "";
    e.style.removeProperty("background-color");
    e.style.color = "black";
  });
});

updateTurnDisplay();
updateScores();
