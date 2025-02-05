const board = document.getElementById('board');
const scoreElement = document.querySelector('.score');
const modal = document.getElementById('modal');
const messageModal = document.querySelector('.message-md');
const imgYes = document.querySelector('.yes-img');
const imgNo = document.querySelector('.no-img');
const completedBtn = document.querySelector('.completed');
const mines = document.querySelector('.mines');
const sizeElement = document.querySelector('#size');
var size = sizeElement.value;
var totalMines = size - (size * 1 - 1);
var score = 0;
var arr = Array.from({length : size}, () => Array(size).fill({}));

function createBoard (arr, size, totalMines) {
  //tạo mãng rỗng
    size = size > 10 ? 10 : size;
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        arr[row][col] = {
          isMine: false, //Có mìn hay không
          neighborCount: 0, //Số mìn gần đó
          revealed: false, //Đã lật chưa  
        }
      }
    }

    let minesPlaced = 0;
    //cài đặt mìn
    while (minesPlaced < totalMines) {
      const x = Math.floor(Math.random() * size);
      const y = Math.floor(Math.random() * size);
      if(!arr[x][y].isMine){
        arr[x][y].isMine = true;
        minesPlaced++;
      }
    }

    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        arr[row][col].neighborCount = countNeighborMines(row, col);
      }
    }

    board.style.gridTemplateColumns = `repeat(${size}, 50px)`;
    board.style.gridTemplateRows = `repeat(${size}, 50px)`;
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.row = row;
        cell.dataset.col = col;
        board.appendChild(cell);
      }
    }
    mines.textContent = totalMines;
    board.addEventListener('click', handleClick);
}


//floot fill
function revealEmptyCells (row, col) {
  if(row < 0 || row >= size || col < 0 || col >= size) return; //ngoài phạm vi
  if(arr[row][col].revealed) return; // Đã lật

  arr[row][col].revealed = true;
  const cell = document.querySelector(`[data-row='${row}'][data-col='${col}']`);
  const minCount = arr[row][col].neighborCount;
  cell.textContent = minCount > 0 ? minCount : '';
  cell.style.backgroundColor = '#ccc';
  if(minCount > 0) return; // Gặp ô gần mìn thì dừng

  for(let i = -1; i <= 1; i++){
    for(let j = -1; j <= 1; j++){
      if (i === 0 && j === 0) continue;
      revealEmptyCells(row + i,col + j);
    }
  }
}

function handleClick (event) {
  const cell = event.target;
  if(!cell.classList.contains('cell')) return;

  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);
  if(arr[row][col].isMine){
    const cells = document.querySelectorAll('.cell');
    Array.from(cells).forEach((cell) => {
      cell.style.pointerEvents = 'none';
    });
    scoreElement.innerHTML = score;
    modal.style.display = 'flex';
    messageModal.innerHTML = 'You lose';
    imgNo.classList.toggle('hide');
    setTimeout(() => {
      modal.style.display = 'none';
      messageModal.innerHTML =  null;
      imgYes.classList.toggle('hide');
    }, 2000);
    revealAllMines();
  }else {
    const mineCount = countNeighborMines(row,col);
    if(!arr[row][col].revealed){
      score = score + 5;
    }
    if(score > 30) {
      scoreElement.style.color = 'yellow';
    }else if(score > 60) {
      scoreElement.style.color = 'green';
    }
    if(arr[row][col].neighborCount == 0) {
      revealEmptyCells(row,col);
    }
    arr[row][col].revealed = true;
    cell.textContent = mineCount;
    scoreElement.innerHTML = score;
    cell.disabled = true;
    cell.style.backgroundColor = '#ccc';
    if(checkWin()){
      const cells = document.querySelectorAll('.cell');
      Array.from(cells).forEach((cell) => {
        cell.style.pointerEvents = 'none';
      });
      revealAllMines();
      modal.style.display = 'flex';
      messageModal.innerHTML = 'You win';
      imgYes.classList.toggle('hide');
      setTimeout(() => {
        modal.style.display = 'none';
        messageModal.innerHTML =  null;
        imgYes.classList.toggle('hide');
      }, 2000);
      score+=100;
      scoreElement.innerHTML = score;
      completedBtn.classList.remove('disabled');
      completedBtn.disabled = false;
    }
  }
}

function countNeighborMines(row, col) {
  let count = 0;
  for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
          if (i >= 0 && i < size && j >= 0 && j < size) {
              if (arr[i][j].isMine) {
                  count++;
              }
          }
      }
  }
  return count;
}
function checkWin() {
  return arr.flat().every(cell => cell.isMine || cell.revealed);
}

function revealAllMines (){
  arr.forEach((row,rowIndex) => {
    row.forEach((cell,collIndex) => {
      if(cell.isMine){
        const minCell = board.querySelector(`[data-row = '${rowIndex}'][data-col = '${collIndex}']`);
        minCell.innerHTML = '💣';
        minCell.classList.add('cellFalse');
        minCell.style.backgroundColor = 'red';
      }
    });
  });
}

board.addEventListener('contextmenu', dropFlag);

function dropFlag (event) {
  event.preventDefault();
  const cell = event.target;
  if(!cell.classList.contains('cell')) return;

  const row = parseInt(cell.dataset.row);
  const col = parseInt(cell.dataset.col);

  if(arr[row][col].revealed) return;


  if(cell.textContent === '🚩'){
      cell.textContent = '';
      cell.classList.remove('bg-orange');
  }else {
    cell.textContent = '🚩';
    cell.classList.add('bg-orange');
  }

}

completedBtn.addEventListener('click', () => {
  size++;
  totalMines++;
  size = size > 10 ? 10 : size;
  completedBtn.classList.add('disabled');
  board.innerHTML = null;
  arr = Array.from({length : size}, () => Array(size).fill({}));
  createBoard(arr, size, totalMines);
  startCell();
})

function startCell() {
  let x, y;
  do {
      x = Math.floor(Math.random() * size);
      y = Math.floor(Math.random() * size);
  } while (arr[x][y].isMine);

  const cell = board.querySelector(`[data-row='${x}'][data-col='${y}']`);
  const mineCount = countNeighborMines(x, y);

  arr[x][y].revealed = true;
  cell.textContent = mineCount;
  scoreElement.innerHTML = score;
  cell.style.backgroundColor = '#ccc';
}

function startGame () {
  board.classList.remove('hide');
  document.querySelector('#info').classList.remove('hide');
  document.querySelector('#play').classList.add('hide');
  document.getElementById('size-block').classList.add('hide');
  completedBtn.classList.remove('hide');
  createBoard(arr, size, totalMines);
  startCell();
}