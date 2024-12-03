function tiktaktoeGame (playerInput) {
    let gameBoard = [
        ['','',''],
        ['','',''],
        ['','',''],
    ]
    let turn = 0

    //when indicating the gameboard locations the first number indicates the row, while the second is the column

    return function addPlayerSigns() {
        playerInput.addEventListener('click',(event) => {
            let coordinatesRaw = event.target.dataset.coordinates;
            let coordinatesArray = coordinatesRaw.split('');

        function appendResultToGameboard() {
                let row = parseInt(coordinatesArray[0]);
                let column = parseInt(coordinatesArray[1]);
                gameBoard[row][column] = 'X';

        function findEmptyCells() {
            for (let i=0; i < 3; i++){
                for (let y=0; y<3; y++) {
                    if (gameBoard[i][y] === '') {
                        let emptyCells = [i,y]
                        return emptyCells
                    }
                }
            }
        }

        function computerMove() {
                    let randomness = Math.floor(Math.random()*10);
                    let strategicChoices = [
                        [1,1],
                        [0,1],
                        [0,2],
                        [2,0],
                        [2,2],
                    ];
                    if (turn == 0) {
                        for (let available of strategicChoices) {
                            if (gameBoard[available[0]][available[1]] === '') {
                                gameBoard[available[0]][available[1]] = 'O';
                                turn++
                                break
                            }
                        }
                    } else {
                        findEmptyCells();
                        gameBoard[emptyCells[0]][emptyCells[1]] = 'O';
                        turn++;
                        break
                    }
                };
            }
        })
    }
}