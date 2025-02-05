const board = document.getElementById("sudoku-board");
const nextBtn = document.querySelector('.next');
const playButton = document.querySelector('.play');
const checkButton = document.getElementById('check-btn');
const content = document.querySelector('.content');
const levelBlock = document.querySelector('#levelBlock')
const levelInput = document.querySelector('#levelInput-js')
const showLevel = document.querySelector('#showLevel');
const completedBtn = document.querySelector('#completed');
const modal = document.querySelector('#modal');
const h1Modal = document.querySelector('.message-md');
const iconModal = document.querySelector('#modal .modal .checkbox i');
const checkBoxModal = document.querySelector('#modal .modal .checkbox');
const imgYes = document.querySelector('#modal .yes-img');
const imgNo = document.querySelector('#modal .no-img');
const volumeBtn = document.querySelector('.volume');

document.addEventListener("DOMContentLoaded", function () {
  let audio = document.getElementById("bgAudio");
  audio.play().catch(error => console.log("Autoplay bị chặn:", error));
  });


// Chia block 3x3 Đẩy giá trị 3x3 vào mãng 1 chiều
function getBlock (boards, blockRow, blockCol) {
  const block = [];
  for(let row = blockRow*3; row < ((blockRow+1) * 3); row++){
    for(let col = blockCol*3; col < ((blockCol+1) * 3); col++){
      block.push(boards[row][col]);
    }
  }
  return block;
}

// Đưa mãng 1 chiều chứa giá trị của 3x3 vào 1 mãng khác (2 chiều)
function getAllBlock (boards){
  var allBlocks = [];
  for(let blockRow = 0; blockRow < 3; blockRow++){
    for(let blockCol = 0; blockCol < 3; blockCol++){
      const block = getBlock(boards, blockRow, blockCol);
      allBlocks.push(block);
    }
  }
  return allBlocks;
}


//Kiểm tra Array có trùng giá trị hay không. Ápp dụng cho block 3x3 sau khi conversion thành mãng 1 chiều
function checkRow(array){
  for(let i = 0; i < 8; i++){
    for(let j = i+1; j+1 < 9; j++){
      if(array[i] === array[j] && array[i] !== 0) return false;
    }
  }
  return true;
}

//Kiểm tra cột x có chứa giá trị trùng lắp hay không bằng Set()
function checkColX(boards,x) {
  var tmp = new Set();
  for(let row = 0; row < 9; row++){
    const value = boards[row][x];
    if(value !== 0 ){
      if(tmp.has(value)){
        return false;
      } else {
        tmp.add(value);
      }
    }
  }
  return true;
}

//Kiểm tra toàn bộ mãng
function checkAllCol(boards){
  for(let col = 0; col < 9; col++){
    if(!checkColX(boards,col)) return false;
  }
  return true;
}

// Kiểm tra các block 3x3 có hợp lệ hay không
function checkBlock(boards){
  var tmp = []
  tmp = getAllBlock(boards);
  for(let row = 0; row < 9; row ++){
    if(!checkRow(tmp[row])) return false;
  }
  return true;
}


// kiểm tra điều kiện
function checkValue (board, value, x, y) {
  for(let col = 0; col < 9; col++){
    if(value === board[x][col]){
      return false;
    }
  }
  for(let row = 0; row < 9; row++){
    if(value === board[row][y]){
      return false;
    }
  }
  const blockRow = Math.floor(x / 3);
  const blockCol = Math.floor(y / 3);

  for (let row = blockRow * 3; row < (blockRow + 1) * 3; row++) {
    for (let col = blockCol * 3; col < (blockCol + 1) * 3; col++) {
      if (board[row][col] === value) {
        return false;
      }
    }
  }
  return true;
}

// Xáo trộn mảng (để chọn số ngẫu nhiên)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}


// Hàm tạo giá trị ngẫu nhiên cho bảng Sudoku
var array = Array.from({length : 9}, () => Array(9).fill(0)); // Bien cuc bo
function fillBoard (board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if(board[row][col] === 0){
        const numbers = shuffle(Array.from({length : 9}, (_,i) => (i+1)));
        for(num of numbers){
          if(checkValue(board, num, row, col)){
            board[row][col] = num;
            if(fillBoard(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  } 
  return true;
}

function generatePuzzle (arr, level) {
  const n = level;
  for(let i = 0; i < n; i++){
    x = Math.floor(Math.random() * 9);
    y = Math.floor(Math.random() * 9);
    arr[x][y] = 0;
  }
  return arr;
}

// Tạo bảng Sudoku
function createBoard (boards) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.createElement("input");
      cell.type = "text";
      // cell.classList.add('input');
      cell.maxLength = 1;
      cell.classList.add("cell");
      //
      if (boards[row][col] !== 0) {        
        cell.value = boards[row][col];
        cell.classList.add('trueCell');
        cell.disabled = true;
      }
      if (row % 3 === 0) cell.style.borderTop = "2px solid black";
      if (col % 3 === 0) cell.style.borderLeft = "2px solid black";
      if (row === 8) cell.style.borderBottom = "2px solid black";
      if (col === 8) cell.style.borderRight = "2px solid black";
      board.appendChild(cell);
    }
  }
}

// Xoa thong tin bang 


function getValues(){
  var values;
  values = [];
  const cells = document.querySelectorAll(".cell");
  for(let row = 0; row < 9; row++) {
    var rowValues = [];
    for(let col = 0; col < 9; col++) {
        const index = row*9 + col; //1 row 9 col => CT tính chỉ số index(vị trí: max 81)
        const value = cells[index].value; // gán giá trị của mỗi ô
        rowValues.push(value == "" || isNaN(value) ? 0: parseInt(value)); //
    }
    values.push(rowValues);
  }
  return values;
}


// Kiểm tra người dùng đã nhập đủ chưa: Nhập thiếu trả quề false
function isEmpty(values){
  for(let row = 0; row < 9; row++){
    for(let col = 0; col < 9; col++){
      if(values[row][col] === 0) {
        return false;
      }
    }
  }
  return true;
}

// Kiểm tra kết quả
function isValid (values) {
  const cells = document.querySelectorAll(".cell");  
  if(!isEmpty(values)) {
    Array.from(cells).forEach((cell) => {
        cell.classList.add('false');
    });
    return false;
  }
  if(!checkAllCol(values)) {
    Array.from(cells).forEach((cell) => {
      cell.classList.add('false');
    });
    return false;
  }
  if(!checkBlock(values)){
    Array.from(cells).forEach((cell) => {
      cell.classList.add('false');
    });
    return false;
  }
  for(let row = 0; row < 9; row++){
    if(!checkRow(values[row])){
      Array.from(cells).forEach((cell) => {
        cell.classList.add('false');
      });
      return false;
    }
  }
  Array.from(cells).forEach((cell) => {
    if(!cell.classList.contains("trueCell")){
      cell.classList.add('true');
    }
  });
  return true;
}

var level;
playButton.addEventListener('click', function () {
  fillBoard(array);
  if(levelInput.value <= 100){
    level = levelInput.value;
  }else level = 100;
  createBoard(generatePuzzle(array, level));
  content.classList.toggle('resize');
  playButton.classList.toggle('hide');
  checkButton.classList.toggle('hide');
  levelBlock.classList.toggle('hide');
  completedBtn.classList.toggle('hide');
  nextBtn.classList.toggle('hide');
  showLevel.innerHTML = `Cấp độ ${level}`;
})

// Nút kiểm tra
checkButton.addEventListener("click", () => {
  var values = getValues();
  if(isValid(values)){
    checkButton.classList.add('disable');
    checkButton.disabled = true;
    imgNo.style.display = 'none';
    completedBtn.classList.remove('disable');
    modal.style.display = 'flex';
    h1Modal.innerHTML = 'Yeahhhhh!';
    checkBoxModal.classList.add('bg-green');
    iconModal.classList.add('fa','fa-check');
    setTimeout( () => {
      modal.style.display = 'none';
      imgNo.style.display = 'block';
      iconModal.classList.remove('fa','fa-check');
      checkBoxModal.classList.remove('bg-green');
    }, 2000)
    completedBtn.disabled = false;
  }else {
    modal.style.display = 'flex';
    completedBtn.disabled = false;
    h1Modal.innerHTML = 'Nooooo';
    iconModal.innerHTML = '!';
    imgYes.style.display = 'none';
    checkBoxModal.classList.add('bg-red');
    setTimeout( () => {
      modal.style.display = 'none';
      iconModal.innerHTML = null;
      imgYes.style.display = 'block';
      checkBoxModal.classList.remove('bg-red');
    }, 2000);
  }
});

completedBtn.addEventListener('click', () => {
  level++;
  checkButton.classList.remove('disable');
  checkButton.disabled = false;
  completedBtn.classList.add('disable');
  completedBtn.disabled = 'true';
  checkButton.disabled = false;
  board.innerHTML = '';
  array = Array.from({length : 9}, () => Array(9).fill(0));
  fillBoard(array); 
  createBoard(generatePuzzle(array, level));
  showLevel.innerHTML = `Cấp độ ${level}`;
});

nextBtn.addEventListener('click', () => {
  level++;
  checkButton.classList.remove('disable');
  completedBtn.classList.add('disable');
  completedBtn.disabled = 'true';
  checkButton.disabled = false;
  board.innerHTML = '';
  array = Array.from({length : 9}, () => Array(9).fill(0));
  fillBoard(array); 
  createBoard(generatePuzzle(array, level));
  showLevel.innerHTML = `Cấp độ ${level}`;
})



