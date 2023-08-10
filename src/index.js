import _ from 'lodash'
import './style.css'

export function Ship(length) {
    return {
        length: length,
        howManyHits: 0,
        beenSunk: false,
        hit: function () {
            this.howManyHits += 1
        },
        isSunk: function () {
            if (this.howManyHits >= length) {
                this.beenSunk = true
            } else {
                this.beenSunk = false
            }
            return this.beenSunk
        }
    }
}

export function Gameboard() {
    const boardSize = 10
    const board = new Array(boardSize).fill(null).map(() => new Array(boardSize).fill(null))
    const missedAttacks = []

    const ships = {
        4: 1,
        3: 2,
        2: 3,
        1: 4
    }

    let isHorizontal = true
    let pickedShipLength = 0

    function pickShip(length) {
        this.pickedShipLength = length
        console.log(this.pickedShipLength)
    }

    function toggleAxis() {
        const axisBtn = document.getElementById('axis')
        if (isHorizontal) {
            isHorizontal = false
            axisBtn.innerHTML = 'Change to X axis'
        } else {
            isHorizontal = true
            axisBtn.innerHTML = 'Change to Y axis'
        }
    }

    function checkShipOverlap(x, y, shipLength, isHorizontal) {
        const start = isHorizontal ? x : y;
        const end = start + shipLength;
        for (let i = start; i < end; i++) {
            if (isHorizontal) {
                if (board[i][y]) return true;
            } else {
                if (board[x][i]) return true;
            }
        }
        return false;
    }

    function placeShip(ship, x, y, isHorizontal) {
        if (this.pickedShipLength == 0) {
            alert('Pick a battleship!')
            return
        }
        if ((isHorizontal && x + ship.length > boardSize) || (!isHorizontal && y + ship.length > boardSize)) {
            throw new Error('Invalid coordinates. Ship placement out of bounds.');
        }
      
        if (checkShipOverlap(x, y, ship.length, isHorizontal)) {
            throw new Error('Invalid coordinates. Ship overlaps with another ship.');
        }

        for (let cell = 0; cell < pickedShipLength; cell++) {
            if (isHorizontal) {
                board[x + cell][y] = ship;
            } else {
                board[x][y + cell] = ship;
            }
        }
        
        this.ships[this.pickedShipLength] -= 1;
        if (this.ships[this.pickedShipLength] === 0) {
            this.pickedShipLength = 0
        }

        updateShipCounters(this)
    }

    function receiveAttack(x, y) {
        if (board[x][y]) {
            const ship = board[x][y];
            ship.hit();
            return true;
        } else {
            missedAttacks.push({ x, y });
            return false;
        }
    }

    function allShipsSunk() {
        return board.flat().every((cell) => cell === null || cell.isSunk());
    }
    
    return { placeShip, receiveAttack, allShipsSunk, missedAttacks, toggleAxis, pickShip, pickedShipLength, isHorizontal, ships };
}

function Player() {
    function randomAttack() {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        return { x, y };
    }
    
    return { randomAttack };
}

function buildBoard(player) {
    const playerBoard = document.getElementById(`${player}-board`)
    let cellClass
    if (player === 'player') {
        cellClass = 'my-cell'
    } else {
        cellClass = 'cell'
    }

    for (let i = 9; i > -1; i--) {
        const column = document.createElement('div')
        column.classList.add('column')
        playerBoard.appendChild(column)
        for (let j = 0; j < 10; j++) {
            const cell = document.createElement('div')
            cell.classList.add(cellClass)
            cell.dataset.x = j
            cell.dataset.y = i
            column.appendChild(cell)
        }
    }
}


init()

function init() {
    buildBoard('player')
    buildBoard('computer')
    const playerGameBoard = Gameboard()
    const computerGameBoard = Gameboard()

    const axisBtn = document.getElementById('axis')
    axisBtn.addEventListener('click', playerGameBoard.toggleAxis)

    const carrier = document.getElementById('carrier')
    carrier.addEventListener('click', () => playerGameBoard.pickShip(4))

    const cruiser = document.getElementById('cruiser')
    cruiser.addEventListener('click', () => playerGameBoard.pickShip(3))

    const submarine = document.getElementById('submarine')
    submarine.addEventListener('click', () => playerGameBoard.pickShip(2))

    const destroyer = document.getElementById('destroyer')
    destroyer.addEventListener('click', () => playerGameBoard.pickShip(1))

    const allShipTypes = document.querySelectorAll('.ship')
    allShipTypes.forEach(ship => ship.addEventListener('click', () => focusShip(ship)))

    const myCells = document.querySelectorAll('.my-cell')
    myCells.forEach(cell => cell.addEventListener('click', () => 
        playerGameBoard.placeShip(Ship(playerGameBoard.pickedShipLength), parseInt(cell.dataset.x), parseInt(cell.dataset.y), playerGameBoard.isHorizontal)))

    console.log(playerGameBoard.ships)
}

function focusShip(ship) {
    const allShipTypes = document.querySelectorAll('.ship');
    allShipTypes.forEach((s) => {
        if (s === ship) {
            s.style.border = 'solid 2px rgb(15, 0, 115)';
        } else {
            s.style.border = 'none';
        }
    });
}

function updateShipCounters(gameBoard) {
    const counters = document.querySelectorAll('.counter');
    console.log(counters[0])
    console.log(gameBoard.ships)
    counters.forEach((counter, c) => {
        counter.innerHTML = `x${gameBoard.ships[c + 1]}`;
    }); 
}

