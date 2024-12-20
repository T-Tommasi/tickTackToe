function tiktaktoeGame () {
    console.log('Game function initiated!')
    let gameBoard = [
        ['','',''],
        ['','',''],
        ['','',''],
    ];
    let turn = 0;
    const RESTARTBUTTON = document.querySelector('#restart');
    const HTMLGAMEBOARD = document.querySelector('.gameBoard');
    const CELLS = document.querySelectorAll('.cell');
    const DIALOG = document.querySelector('dialog');
    const VICTORDIALOGDIV = document.querySelector('#victor');
    const VICTORYTURN = document.querySelector('#victoryTurn')

    //when indicating the gameboard locations the first number indicates the row, while the second is the column
    //From this point on all helper functions and game logic is declared to be then eventually assembled
    function randomMove() {
        for (x=0;x<3;x++) {
            for (y=0;y<3;y++) {
                if(gameBoard[x][y] === '') {
                    console.log('AI random move engaged!')
                    gameBoard[x][y] = 'O';
                    let moveCoordinates = x.toString();
                    moveCoordinates += y.toString();
                    console.log(moveCoordinates)
                    appendAiMoves(moveCoordinates,'O')
                    return
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
            } else {
                strategicAvaible = false;
                console.log('strategic moves not available!')
            }
        }

        if (strategicAvaible) {
            for(let move of STRATEGICMOVES) {
                if (gameBoard[move[0]][move[1]] === '') {
                    gameBoard[move[0]][move[1]] = 'O';
                    let moveCoordinates = move[0].toString();
                    moveCoordinates += move[1].toString();
                    console.log(moveCoordinates)
                    appendAiMoves(moveCoordinates,'O')
                    console.log(`status of the board:`)
                    console.log(`top row:${gameBoard[0]}`)
                    console.log(`middle row: ${gameBoard[1]}`)
                    console.log(`bottom row: ${gameBoard[2]}`)
                    break
                }
            }
        } else {
            randomMove();
            return
        }
    };

    function retrievePlayerChoice(origin) {
        for (let element of origin) {
            element.addEventListener('click', (cell) => {
                let playerChoice = cell.target.dataset.cell;
                let coordinates=playerChoice.split('');
                if (gameBoard[coordinates[0]][coordinates[1]] === ''){
                    gameBoard[coordinates[0]][coordinates[1]] = 'X';
                    appendBoard(element,'X')
                } else {
                    return alert('Choose a empty cell!')
                }
                addComputerSigns();
                turn++;
                console.log(`advanced to turn ${turn}`);
                winCondition(); // checks if the previous AI and player moves caused someone to win
                return;
            })
        }
    };

    function appendBoard(appendOrigin,sign) {
        appendOrigin.textContent = sign
    }

    function appendAiMoves(coordinates, sign) {
        for (let cell of CELLS) {
            if (cell.dataset.cell === coordinates) {
                cell.textContent = sign;
                break
            }
        }
    }

    function findOccupiedCells() {
        let occupiedCellsPlayer = []
        let occupiedCellsAi = []
        for (x=0;x<3;x++) {
            for (y=0;y<3;y++) {
                if (gameBoard[x][y] === 'X') {
                    occupiedCellsPlayer.push([x,y])
                    console.log(`Cells occupied by player: ${occupiedCellsPlayer}`)
                } else if (gameBoard[x][y] === 'O') {
                    occupiedCellsAi.push([x,y])
                    console.log(`Cells occupied by AI: ${occupiedCellsAi}`)
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
        let victor = null

        for (let lane of winningLanes) {
            let winningLanePlayer = lane.every(coord => playerMoves.some(cell => coord[0] === cell[0] && coord[1] === cell[1]))
            let winningLaneAi = lane.every(coord => aiMoves.some(cell => coord[0] === cell[0] && coord[1] === cell[1]))

            if (winningLanePlayer) {
                console.log('player won!')

                victor = 'player'
            } else if (winningLaneAi) {
                console.log('AI won!')
                victor = 'AI'
            }
        }

        if (victor) {
            victoryScreen(victor);
            return
        } else {
            return false
        }
    }

    function victoryScreen(status) {
        const CLOSEBUTTONLISTENER = document.querySelector('#closeModal')
        VICTORDIALOGDIV.innerHTML = `<h1>The end!</h1><br><h4>The winner is <strong>${status}</strong></h4>`;
        VICTORYTURN.innerHTML = `The game finished in ${turn} turns!`
        DIALOG.showModal(); 
        CLOSEBUTTONLISTENER.addEventListener('click', () => {
            restartGame();
            DIALOG.close();
        })
    }

    function restartGame () {
            turn = 0;
            gameBoard = [
                ['','',''],
                ['','',''],
                ['','',''],
            ];
            for (cell of CELLS) {
                cell.textContent = ''
            }
            console.log('Game has been restored to initial settings')
    }

    //function to reset the game status wherever the restart button is pressed
    RESTARTBUTTON.addEventListener('click', () => {
        restartGame();
        console.log('---------')
        console.log('restarted the game trought button!')
        console.log('---------')
    })

    //Function encapsulating the entire game logic
    function startGame() {
        retrievePlayerChoice(CELLS);
    }
    startGame()
};

//initiate tikTakToe game
tiktaktoeGame()