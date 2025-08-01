const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const resetButton = document.getElementById('reset');
let board = Array(9).fill(null);
let currentPlayer = 'X';
let gameActive = true;

function renderBoard() {
            boardElement.innerHTML = '';
            board.forEach((cell, index) => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                if (cell) {
                    cellElement.textContent = cell;
                    cellElement.classList.add('disabled');
                }
                cellElement.addEventListener('click', () => handleCellClick(index));
                boardElement.appendChild(cellElement);
            });
}

function handleCellClick(index) {
            if (!gameActive || board[index]) return;
            board[index] = currentPlayer;
            if (checkWin()) {
                statusElement.textContent = `${currentPlayer} wins!`;
                gameActive = false;
            } else if (board.every(cell => cell)) {
                statusElement.textContent = 'It\'s a draw!';
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                statusElement.textContent = `Player ${currentPlayer}'s turn`;
            }
            renderBoard();
}

function checkWin() {
            const winningCombinations = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6]             // Diagonals
            ];
            return winningCombinations.some(combination => 
                combination.every(index => board[index] === currentPlayer)
            );
}

resetButton.addEventListener('click', () => {
            board = Array(9).fill(null);
            currentPlayer = 'X';
            gameActive = true;
            statusElement.textContent = `Player ${currentPlayer}'s turn`;
            renderBoard();
});

// Initialize game
statusElement.textContent = `Player ${currentPlayer}'s turn`;
renderBoard();
