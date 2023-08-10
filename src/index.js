import _ from 'lodash';
import './style.css';



let currentLength = 0
buildBoard('player')
buildBoard('computer')
const playerBoard = GameBoard();

export function Ship(length) {
    return {
        length: length,
        howManyHits: 0,
        beenSunk: false,
        hit: function () {
            this.howManyHits += 1;
        },
        isSunk: function () {
            if (this.howManyHits >= length) {
                this.beenSunk = true;
            } else {
                this.beenSunk = false;
            }
            return this.beenSunk;
        },
    };
}

function GameBoard() {
    const boardSize = 10;
    const board = new Array(boardSize).fill(null).map(() => new Array(boardSize).fill(null));

    const ships = {
        1: 4,
        2: 3,
        3: 2,
        4: 1
    }

    let isHorizontal = true

    function placeShip(ship, x, y) {
        if (currentLength == 0) {
            alert('Pick a ship!')
            return
        }

        if (ships[currentLength] == 0) {
            alert(`You're out of ${currentLength}-length ships!`)
            currentLength = 0
            return
        }

        for (let l = 0; l < ship.length; l++) {
            if (
                (isHorizontal && (x + l >= boardSize || board[x + l][y] !== null)) ||
                (!isHorizontal && (y + l >= boardSize || board[x][y + l] !== null))
            ) {
                alert('Invalid placement! Ship is out of border or overlaps another ship.');
                return; 
            }
        }

        for (let l = 0; l < ship.length; l++) {
            if (isHorizontal) {
                board[x + l][y] = ship;
            } 
            if (!isHorizontal) {
                board[x][y + l] = ship;
            }
            const cell = document.querySelector(`.my-cell[data-x="${x + (isHorizontal ? l : 0)}"][data-y="${y + (isHorizontal ? 0 : l)}"]`);
            cell.classList.add('ship-cell'); 
            console.log(board)
        }

        console.log(`${ship.length} ship has been placed.`)
        

        ships[currentLength] -= 1
        renderAvailableShips()
    }

    function toggleIsHorizontal() {
        isHorizontal = !isHorizontal
        updateAxisBtn(isHorizontal)
        console.log(`IsHorizontal? ${isHorizontal}`)
    }

    return {
        ships,
        board,
        placeShip,
        toggleIsHorizontal
    };
}

function buildBoard(player) {
    const playerBoard = document.getElementById(`${player}-board`);
    let cellClass;
    if (player === 'player') {
        cellClass = 'my-cell';
    } else {
        cellClass = 'cell';
    }

    for (let i = 0; i < 10; i++) {
        const column = document.createElement('div');
        column.classList.add('column');
        column.dataset.x = i;
        playerBoard.appendChild(column);
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement('div');
            cell.classList.add(cellClass);
            cell.dataset.x = i;
            cell.dataset.y = j;
            column.appendChild(cell);
        }
    }
}

function updateAxisBtn(isHorizontal) {
    const axis = document.getElementById('axis')
    isHorizontal ? axis.innerHTML = 'Current axis - X' : axis.innerHTML = 'Current axis - Y'
}

function setCurrentLength(value, ship) {
    if (playerBoard.ships[value] == 0) {
        alert(`You're out of ${value}-length ships!`)
        return
    }
    currentLength = value
    console.log(`Now current length is ${currentLength}`)
    focusShip(ship)
}



const axisBtn = document.getElementById('axis')
axisBtn.addEventListener('click', () => playerBoard.toggleIsHorizontal())

const destroyer = document.getElementById('destroyer')
destroyer.addEventListener('click', () => setCurrentLength(1, destroyer))

const submarine = document.getElementById('submarine')
submarine.addEventListener('click', () => setCurrentLength(2, submarine))

const cruiser = document.getElementById('cruiser')
cruiser.addEventListener('click', () => setCurrentLength(3, cruiser))

const carrier = document.getElementById('carrier')
carrier.addEventListener('click', () => setCurrentLength(4, carrier))

const myCells = document.querySelectorAll('.my-cell')
myCells.forEach(cell => cell.addEventListener('click', () => playerBoard.placeShip(Ship(currentLength), parseInt(cell.dataset.x), parseInt(cell.dataset.y))))


function focusShip(ship) {
    const ships = document.querySelectorAll('.ship')
    ships.forEach((s) => {
        if (s === ship) {
            s.style.border = 'solid 2px rgb(15, 0, 115)';
        } else {
            s.style.border = 'none'
        }
    })
}

function renderAvailableShips() {
    const counters = document.querySelectorAll('.counter')
    const allShips = document.querySelectorAll('.ship')
    counters.forEach((counter, index) => {
        const shipCount = playerBoard.ships[index + 1];
        counter.innerHTML = `x${shipCount}`;
        
        if (shipCount === 0) {
            allShips[index].style.border = 'none';
        }
    })
}

