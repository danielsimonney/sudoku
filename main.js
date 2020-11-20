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


function sudoku(board,y=0){
  empty = empty_case(board,y);
  if (empty===null)
    return true
  else{
    let {x,y} = empty
    for (let digit = 1; digit < 10; digit++) {
      if(valid(board,digit,x,y)){
        board[y][x] = digit;
        if(sudoku(board,y)===true){
          return true
        }else{
          board[y][x] = 0
        }
        
      }else{
        // console.log(x)
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

const empty_case=(board,y=0)=>{
  if(y!=currentHeight){
    currentHeight=y
  }
  for (let height = currentHeight; height < board.length; height++) {
    for (let x = 0; x < board[0].length; x++) {     
      if(board[height][x]===0){
        return({y:height,x:x})
      }
    }
  }
return null
}
// console.log(empty_case(board))
// printBoard(board)
sudoku(board)
printBoard(board)
const t1 = performance.now();
console.log(`time check :${t1 - t0} ms.`);
