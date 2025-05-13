const playerYellow = "Y";
const playerBlue = "B";
let currPlayer = playerYellow;

let gameOver = false;
let board;

const rows = 6;
const columns = 7;
let currColumns = []; // keeps track of which row each colun is at

window.onload = function(){
    setGame();
}

function setGame(){
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r=0; r<rows; r++){
        const row = [];
        for(let c= 0; c< columns; c++){
            row.push('');
            const tile = document.createElement("div");
            tile.id = `${r}-${c}`;
            tile.classList.add("tile");
            tile.addEventListener("click", setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(row);
    }
}

function setPiece(){

    if(gameOver){
        return;
    }

    const coords = this.id.split("-");
    let r = parseInt(coords[0]);
    const c = parseInt(coords[1]);

    r = currColumns[c];
    
    if( r<0){
        return;
    }

    board[r][c] = currPlayer;
    const tile = document.getElementById(`${r}-${c}`);
    if(currPlayer === playerYellow){
        tile.classList.add("yellow-piece");
        currPlayer = playerBlue;
    }else{
        tile.classList.add("blue-piece");
        currPlayer = playerYellow;
    }

    currColumns[c] = r - 1;
    checkWinner();
}

function checkWinner(){
    //horizontal
    for( let r = 0; r < rows; r++){
        for(let c = 0; c < columns - 3; c++){
            if(board[r][c] !== '' && board[r][c] === board[r][c+1] && board[r][c+1] === board[r][c+2] && board[r][c+2] === board[r][c+3]){
                    setWinner(r, c);
                    return;
                }
        }
    }

    //vertical
    for(let c = 0; c < columns; c++){
        for(let r = 0; r < rows - 3; r++){
            if(board[r][c] !== '' &&
                board[r][c] === board[r+1][c]&&
                board[r+1][c] === board[r+2][c] &&
                board[r+2][c] === board[r+3][c]){
                    setWinner(r, c);
                    return;
                }
            
        }
    }

    //anti-diagonal
    for(let r = 0; r< rows - 3; r++){
        for(let c = 0; c< columns - 3; c++){
            if(board[r][c] !== '' &&
                board[r][c] === board[r+1][c+1] &&
                board[r+1][c+1] === board[r+2][c+2] &&
                board[r+2][c+2] === board[r+3][c+3]){
                    setWinner(r, c);
                    return;
                }
        }
    }

    //diagonal
    for( let r=3; r< rows; r++){
        for(let c = 0; c < columns - 3; c++){
            if(board[r][c] !== '' && 
                board[r][c] === board[r-1][c+1]&&
                board[r-1][c+1] === board[r-2][c+2] &&
                board[r-2][c+2] === board[r-3][c+3]){
                    setWinner(r, c);
                    return;
                }
        }
    }
}

function setWinner(r, c){
    const winner = document.getElementById("winner");
    winner.innerText = (board[r][c] === playerYellow) ? "Yellow Wins": "Blue Wins";
    gameOver = true;
}