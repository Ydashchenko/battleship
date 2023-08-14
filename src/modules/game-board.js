import { playerBoard } from '..';
import { focusShip, renderAvailableShips, updateAxisBtn, clearGrid, setCountersToZero } from './dom-manipulation';
import { addMyCells } from './event-listeners';
import { Ship } from './ship';


export function GameBoard() {
    const boardSize = 10;
    let board = new Array(boardSize).fill(null).map(() => new Array(boardSize).fill(null));
    const missedShots = []

    let currentLength = 0

    let ships = {
        1: 4,
        2: 3,
        3: 2,
        4: 1
    }

    let isHorizontal = true

    function placeShip(rand, who, ship, x, y) {
        if (currentLength == 0) {
            alert('Pick a ship!')
            return
        }

        if (ships[currentLength] == 0) {
            alert(`You're out of ${currentLength}-length ships!`)
            
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
            const cell = document.querySelector(`.${who}[data-x="${x + (isHorizontal ? l : 0)}"][data-y="${y + (isHorizontal ? 0 : l)}"]`);
            cell.classList.add('ship-cell'); 
            
        }

        console.log(`${ship.length} ship has been placed.`)
        

        if (rand === false) {
            ships[currentLength] -= 1
        }

        renderAvailableShips()
        console.log(ships)
        console.log(board)
    }

    function toggleIsHorizontal() {
        isHorizontal = !isHorizontal
        updateAxisBtn(isHorizontal)
        console.log(`IsHorizontal? ${isHorizontal}`)
    }

    function areAllShipsPlaced() {
        for (const shipCount of Object.values(ships)) {
            if (shipCount !== 0) {
                return false; // At least one ship is not placed
            }
        }
        return true; // All ships are placed
    }

    function getRandomCoordinates() {
        const x = Math.floor(Math.random() * 10);
        const y = Math.floor(Math.random() * 10);
        return { x, y }
    }

    function getRandomBoolean() {
        return Math.random() < 0.5;
    }

    function placeAllShipsRandomly(who) {
    
        board = new Array(boardSize).fill(null).map(() => new Array(boardSize).fill(null));
        clearGrid()
        ships = {
            1: 4,
            2: 3,
            3: 2,
            4: 1
        }
        for (const length in ships) {
            for (let count = 0; count < ships[length]; count++) {
                isHorizontal = getRandomBoolean()
                let ship;
                let x, y;
                do {
                    ({ x, y } = getRandomCoordinates());
                    ship = Ship(parseInt(length));
                } while (!canPlaceShip(ship, x, y));
    
                setCurrentLength(length);
                console.log(currentLength)
                placeShip(true, who, ship, x, y);
            }
        }
        setCurrentLength(0)
        isHorizontal = true
        ships = {
            1: 0,
            2: 0,
            3: 0,
            4: 0
        }
        console.log(`Ships ${who} now:`)
        console.log(ships)
        if (who === 'my-cell') {
            setCountersToZero()
        }
        console.log(board)

    }

    function setCurrentLength(value, ship) {
        if (ships[value] == 0) {
            alert(`You're out of ${value}-length ships!`)
            return currentLength = 0
            
        }
        focusShip(ship)
        return currentLength = value
    }

    function canPlaceShip(ship, x, y) {
        for (let l = 0; l < ship.length; l++) {
            if (
                (isHorizontal && (x + l >= boardSize || board[x + l][y] !== null)) ||
                (!isHorizontal && (y + l >= boardSize || board[x][y + l] !== null))
            ) {
                return false; 
            }
        }
        return true; 
    }

    return {
        ships,
        board,
        placeShip,
        toggleIsHorizontal,
        areAllShipsPlaced,
        getRandomCoordinates,
        placeAllShipsRandomly,
        currentLength,
        setCurrentLength
    };
}