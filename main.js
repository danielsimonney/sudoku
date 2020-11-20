const { performance } = require('perf_hooks');

const t0 = performance.now();
var board=[
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 3, 0, 8, 5],
  [0, 0, 1, 0, 2, 0, 0, 0, 0],
  [0, 0, 0, 5, 0, 7, 0, 0, 0],
  [0, 0, 4, 0, 0, 0, 1, 0, 0],
  [0, 9, 0, 0, 0, 0, 0, 0, 0],
  [5, 0, 0, 0, 0, 0, 0, 7, 3],
  [0, 0, 2, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 4, 0, 0, 0, 9],
];

var currentHeight=0


function printBoard(board) {
  for (let line = 0; line < board.length; line++) {
    if(line % 3 === 0 && line!==0){
      console.log("- - - - - - - - - - - - - ");
    }
    for (let row = 0; row < board[0].length; row++) {
      if(row % 3 === 0 && row !== 0){
        process.stdout.write("|")
      }
      if(row===8){
        // Juste pour avoir un retour à la ligne je le différencie
        console.log(board[line][row])
      }else{
        process.stdout.write(board[line][row] + " ")
      }
    }
  }
}

function preview(board){
  let emptyCase =[]
  for (let height = 0; height < board.length; height++) {
    for (let x = 0; x < board[0].length; x++) {     
      if(board[height][x]===0){
        emptyCase.push({y:height,x:x})
      }
    }
  }
  for (const pos of emptyCase) {
    let possibilities = [1,2,3,4,5,6,7,8,9]

    for (let i = 0; i < board[0].length; i++) {
      if(board[pos.y][i]!==0){
        for(var len = possibilities.length -1; len >= 0 ; len--){
          if(possibilities[len] == board[pos.y][len]){
              possibilities.splice(len, 1);
          }
      }
      }
    }
    for (let i = 0; i < board[0].length; i++) {
      if(board[i][pos.x]!==0 ){
        for(var len = possibilities.length -1; len >= 0 ; len--){
          if(possibilities[len] == board[len][pos.x]){
              possibilities.splice(len, 1);
          }
      }
      }
    }
    squareX = Math.floor(pos.x/3);
    squareY = Math.floor(pos.y/3);
  
    for (let  yInSquare = squareY*3; yInSquare < squareY*3+3; yInSquare++) {
      for (let XInSquare = squareX*3; XInSquare < squareX*3+3; XInSquare++) {
        if(board[yInSquare][XInSquare] !== 0){
          if(pos.x != XInSquare && pos.y != yInSquare){
            for(var len = possibilities.length -1; len >= 0 ; len--){
              if(possibilities[len] == board[yInSquare][XInSquare]){
                  possibilities.splice(len, 1);
              }
          }
          }
        }
      }
    }
    pos.numberPossible = possibilities
  }
  return emptyCase;
}

let emptyArray = preview(board)


let sudoku=(board,verifNum)=>{
  if(verifNum>emptyArray.length -1){
    return true
  }else{
  empty = emptyArray[verifNum];
    let {y,x,numberPossible} = empty
    for (let num of numberPossible) {
      if(valid(board,num,x,y)){
        board[y][x] = num;
        if(!sudoku(board,verifNum+1)){
          board[y][x] = 0;
        }else{
          return true
        }
      }
    }
  }
  return false
}

function valid(board,insertNumber,x,y){

  for (let i = 0; i < board[0].length; i++) {
    if(board[y][i]===insertNumber || board[i][x]===insertNumber ){
      return false;
    }
  }
  squareX = Math.floor(x/3);
  squareY = Math.floor(y/3);

  for (let  yInSquare = squareY*3; yInSquare < squareY*3+3; yInSquare++) {
    for (let XInSquare = squareX*3; XInSquare < squareX*3+3; XInSquare++) {
      if(board[yInSquare][XInSquare] === insertNumber){
        if(x != XInSquare && y != yInSquare){
          return false
        }
      }
    }
  }
  return true
}


sudoku(board,0)
printBoard(board)
const t1 = performance.now();
console.log(`time check :${t1 - t0} ms.`);
