function tiktaktoeGame (playerInput) {
    let gameBoard = [
        ['','',''],
        ['','',''],
        ['','',''],
    ]
    let turn = 0

    //when indicating the gameboard locations the first number indicates the row, while the second is the column

    function randomMove() {
        for (x=0;x<3;x++) {
            for (y=0;y<3;y++) {
                if(gameBoard[x][y] === '') {
                    gameBoard[x][y] = 'O';
                }
            }
        }
    };

    function addComputerSigns() {
        const STRATEGICMOVES = [
            [1,1],
            [0,0],
            [0,2],
            [2,0],
            [2,2],
        ]
        let strategicAvaible = false;

        for (let move of STRATEGICMOVES) {
            if (gameBoard[move[0]][move[1]] == '');
            strategicAvaible = true;
            break
        }

        if (strategicAvaible) {
            for(let move of STRATEGICMOVES) {
                if (gameBoard[move[0]][move[1]] === '') {
                    gameBoard[move[0]][move[1]] = 'O';
                    turn++;
                    break
                }
            }
        } else {
            randomMove();
            turn++;
            return
        }
    };

    function retrievePlayerChoice(origin) {
        origin.addEventListener('click', () => {
            let playerChoice = this.target.dataset;
            addComputerSigns();
            let coordinates=playerChoice.split('');
            gameBoard[coordinates[0]][coordinates[1]] = 'X';
            turn++;
            return;
        })
    };

    function findOccupiedCells() {
        let occupiedCellsPlayer = []
        let occupiedCellsAi = []
        for (x=0;x<3;x++) {
            for (y=0;y<3;y++) {
                if (gameBoard[x][y] === 'X') {
                    occupiedCellsPlayer.push([x,y])
                } else if (gameBoard[x][y] === 'O') {
                    occupiedCellsAi.push([x,y])
                }
            }
        }
        return {occupiedCellsAi, occupiedCellsPlayer}
    };
    
    function winCondition() {
        const winningLanes = [
            [[0, 0], [0, 1], [0, 2]], // Top row
            [[1, 0], [1, 1], [1, 2]], // Middle row
            [[2, 0], [2, 1], [2, 2]], // Bottom row
            [[0, 0], [1, 0], [2, 0]], // Left column
            [[0, 1], [1, 1], [2, 1]], // Middle column
            [[0, 2], [1, 2], [2, 2]], // Right column
            [[0, 0], [1, 1], [2, 2]], // Diagonal
            [[0, 2], [1, 1], [2, 0]]  // Reverse diagonal
        ]
        let occupiedCells=findOccupiedCells()
        let playerMoves = occupiedCells.occupiedCellsPlayer
        let aiMoves = occupiedCells.occupiedCellsAi

        for (let lane of winningLanes) {
            let winningLanePlayer = lane.every(coord => playerMoves.some(cell => coord[0] === cell[0] && coord[1] === cell[1]))
            let winningLaneAi = lane.every(coord => aiMoves.some(cell => coord[0] === cell[0] && coord[1] === cell[1]))

            if (winningLanePlayer) {
                return playerWin = true
            } else if (winningLaneAi) {
                return aiWin = true
            }
        }

        return false
    }
};