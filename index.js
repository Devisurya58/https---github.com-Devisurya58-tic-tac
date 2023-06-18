// Game variables
let currentPlayer = 'X';
let gameEnded = false;
let moves = 0;
const cells = document.getElementsByClassName('cell');
const turnDisplay = document.getElementById('turn');
const winnerDisplay = document.getElementById('winner');
const drawDisplay = document.getElementById('draw');
const restartButton = document.getElementById('restart');

// Add event listeners to cells
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener('click', cellClicked);
}

// Handle cell click event
function cellClicked() {
  if (gameEnded) return;
  if (this.textContent !== '') return;
  
  this.textContent = currentPlayer;
  moves++;
  
  if (checkWin()) {
    winnerDisplay.textContent = `Player ${currentPlayer} wins!`;
    gameEnded = true;
  } else if (moves === 9) {
    drawDisplay.textContent = 'The game ends in a draw!';
    gameEnded = true;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    turnDisplay.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Check for a win
function checkWin() {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];
  
  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    
    if (
      cells[a].textContent === currentPlayer &&
      cells[b].textContent === currentPlayer &&
      cells[c].textContent === currentPlayer
    ) {
      return true;
    }
  }
  
  return false;
}

// Restart the game
restartButton.addEventListener('click', restartGame);

function restartGame() {
  currentPlayer = 'X';
  gameEnded = false;
  moves = 0;
  winnerDisplay.textContent = '';
  drawDisplay.textContent = '';
  turnDisplay.textContent = `Player ${currentPlayer}'s turn`;

  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = '';
  }
}
