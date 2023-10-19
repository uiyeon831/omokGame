const boardEl = document.getElementById("board");
const resetEl = document.getElementById("reset");
const result = document.getElementById("result");
const replayEl = document.getElementById("replay");
const scoreText = document.getElementById("score");
const replay = document.getElementById("replay");
const playerwho = document.getElementsByClassName("who");
const scoreP = document.createElement("span");
const scoreP2 = document.createElement("span");

let board = [];
let currentPlayer = "Black";
let previousPlayer = "White";
const boardSize = 15;
let WhiteScore = 0;
let BlackScore = 0;


//게임 초기화
function resetBoard() {
  result.innerHTML = "Play the Omok Game!";
  replay.innerHTML = "다시하기";
  scoreP.innerHTML = "";
  scoreP2.innerHTML = "";
  board = Array(boardSize).fill().map(() => Array(boardSize).fill(""));
  drawBoard();
}

//"처음부터" 버튼
resetEl.addEventListener("click", () => {
  currentPlayer = "Black";
  WhiteScore = 0;
  BlackScore = 0;
  resetBoard();
});

//"다음판" 버튼
replayEl.addEventListener("click", () => {
  if(WhiteScore === 0 && BlackScore === 0){
    currentPlayer = "Black";
  }else {
    previousPlayer = currentPlayer;
    currentPlayer = currentPlayer === "Black" ? "White" : "Black";  
  }
  resetBoard();
});

//현재 플레이어 표시
function playerDisplay() {
  if(currentPlayer === "Black"){
    playerwho[0].className = "who";
    playerwho[1].className = "who player_focus";

  } else if(currentPlayer === "White") {
    playerwho[0].className = "who player_focus";
    playerwho[1].className = "who";
  } 
}

//스코어 표시
function score() {
  scoreText.className = "resultBlock";
  scoreP.innerHTML = `White  ${WhiteScore} : `;
  scoreP2.innerHTML = `${BlackScore}  Black`;
  scoreText.appendChild(scoreP);
  scoreText.appendChild(scoreP2);
}

// 승리 확인 메소드
function checkWin(i, j) {
  return (
    checkLine(i, j, -1, 0) ||   //가로 체크
    checkLine(i, j, 0, -1) ||   //세로 체크
    checkLine(i, j, -1, -1) ||  //대각선 체크
    checkLine(i, j, -1, 1)      //반대 대각선 체크
  );
}

// 승리 판단
function checkLine(row, col, dRow, dCol) {
  let count = 0;
  for (let i = -4; i <= 4; i++) {
    let r = row + i * dRow;
    let c = col + i * dCol;
    if (r >= 0 && r < boardSize && c >= 0 && c < boardSize && board[r][c] === currentPlayer) {
      if (++count === 5) return true;
    } else {
      count = 0;
    }
  }
  return false;
}

//바둑알 놓기
function playGo(i, j, e){
  console.log(i, j)
  if (board[i][j] !== "") return;
  if(board[i][j] === "Block") return;
  board[i][j] = currentPlayer;

  const cellEl = document.getElementsByClassName("i"+i+"j"+j);

  const stoneEl = document.createElement("div");
  if(board[i][j] === "Black") {
    stoneEl.className = "stone black";
  } else if(board[i][j] === "White") {
    stoneEl.className = "stone white";
  } else {
    stoneEl.className = "stone none";
  }
  cellEl[0].appendChild(stoneEl);

  //승부 결과
  if (checkWin(i, j)) {
    playerwho[0].className = "who";
    playerwho[1].className = "who";
    result.innerHTML = `Player ${currentPlayer} Wins!`;

    if(currentPlayer === "Black"){
      BlackScore += 1;
    } else {
      WhiteScore += 1;
    }
    score();
    
    //게임이 끝나고 바둑알을 놓지 못하게
    for(let i = 0; i<boardSize; i++) {
      for(let j = 0; j <boardSize; j++) {
        if(board[i][j] === "") {
          board[i][j] = "resultBlock";
        }
      }
    }
    replay.innerHTML = "다음판";
  } else {
    previousPlayer = currentPlayer;
    currentPlayer = currentPlayer === "Black" ? "White" : "Black";  
    playerDisplay();
  }
}

//바둑판 그리기
function drawBoard() {
  boardEl.innerHTML = '';
  for(let i = 0; i < boardSize; i++){
    const rowEl = document.createElement("div");
    rowEl.className = "row";
    for(let j = 0; j < boardSize; j++){
      const cellEl = document.createElement("div");
      cellEl.className = "cell " + "i" + i + "j" + j;
      cellEl.addEventListener("click", (e) => {
        if(board[i][j] === "") playGo(i, j, e)
      });
      rowEl.appendChild(cellEl);
    }
    boardEl.appendChild(rowEl);
  }
  playerDisplay();
  score();
}

//게임시작
resetBoard();


//참고
//https://stickode.tistory.com/912
//https://stickode.tistory.com/914