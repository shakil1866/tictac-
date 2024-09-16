
const cells = document.querySelectorAll('.cell');
        const resetButton = document.getElementById('reset');
        let currentPlayer = 'x';
        let gameBoard = ['', '', '', '', '', '', '', '', ''];
        let gameActive = true;
        
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        
        const checkWin = () => {
            for (const combination of winningCombinations) {
                const [a, b, c] = combination;
                if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                    return gameBoard[a];
                }
            }
            return gameBoard.includes('') ? null : 'tie';
        };
        
        const handleClick = (event) => {
            const index = event.target.getAttribute('data-index');
            
            if (gameBoard[index] || !gameActive) return;
        
            gameBoard[index] = currentPlayer;
            event.target.classList.add(currentPlayer);
            event.target.textContent = currentPlayer.toUpperCase();
            
            const result = checkWin();
            if (result) {
                if (result === 'tie') {
                    alert("It's a tie!");
                } else {
                    alert(`${result.toUpperCase()} wins!`);
                }
                gameActive = false;
            } else {
                currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
            }
        };
        
        const resetGame = () => {
            gameBoard = ['', '', '', '', '', '', '', '', ''];
            gameActive = true;
            currentPlayer = 'x';
            cells.forEach(cell => {
                cell.textContent = '';
                cell.classList.remove('x', 'o');
            });
        };
        
        cells.forEach(cell => cell.addEventListener('click', handleClick));
        resetButton.addEventListener('click', resetGame);