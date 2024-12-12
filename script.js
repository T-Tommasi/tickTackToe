function tiktaktoeGame () {
    console.log('Game function initiated!')
    let gameBoard = [
        ['','',''],
        ['','',''],
        ['','',''],
    ];
    let turn = 0;
    const RESTARTBUTTON = document.querySelector('#restart')
    const CELLS = document.querySelectorAll('.cell')

    //when indicating the gameboard locations the first number indicates the row, while the second is the column
    //From this point on all helper functions and game logic is declared to be then eventually assembled
    function randomMove() {
        for (x=0;x<3;x++) {
            for (y=0;y<3;y++) {
                if(gameBoard[x][y] === '') {
                    gameBoard[x][y] = 'O';
                    console.log('AI random move engaged!')
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
            if (gameBoard[move[0]][move[1]] == '') {
            strategicAvaible = true;
            console.log('strategic moves are avaible');
            break
            }
        }

        if (strategicAvaible) {
            for(let move of STRATEGICMOVES) {
                if (gameBoard[move[0]][move[1]] === '') {
                    gameBoard[move[0]][move[1]] = 'O';
                    console.log(`strategic move to ${gameboard[move[0]][move[1]]}`)
                    break
                }
            }
        } else {
            randomMove();
            return
        }
    };

    function retrievePlayerChoice(origin) {
        origin.addEventListener('click', () => {
            let playerChoice = this.target.dataset.cell;
            let coordinates=playerChoice.split('');
            if (gameBoard[coordinates[0]][coordinates[1]] === ''){
                gameBoard[coordinates[0]][coordinates[1]] = 'X';
            } else {
                return alert('Choose a empty cell!')
            }
            addComputerSigns();
            turn++;
            console.log(`advanced to turn ${turn}`)
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
                    console.log(occupiedCellsPlayer)
                } else if (gameBoard[x][y] === 'O') {
                    occupiedCellsAi.push([x,y])
                    console.log(occupiedCellsAi)
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

    //function to reset the game status wherever the restart button is pressed
    RESTARTBUTTON.addEventListener('click', () => {
        turn = 0;
        gameBoard = [
            ['','',''],
            ['','',''],
            ['','',''],
        ];
        return alert('Game has been restored to initial settings')
    })

    //Function encapsulating the entire game logic
    function startGame() {
        retrievePlayerChoice(CELLS);
        winCondition();
    }
    startGame()
};

//initiate tikTakToe game
tiktaktoeGame()