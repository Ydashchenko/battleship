import { game } from '..';
import { focusShip, renderAvailableShips, updateAxisBtn, clearGrid, setCountersToZero, addHit, addMiss, updateAnnounce } from './dom-manipulation';
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
        if (game === 'battle') {
            updateAnnounce(`You can't attack your own board!`)
            return
        }

        if (game === 'over') {
            alert('Game is over, buddy.')
            return
        }

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
            let attacked = false
            if (isHorizontal) {
                board[x + l][y] = {ship, attacked};
            } 
            if (!isHorizontal) {
                board[x][y + l] = {ship, attacked};
            }
            const cell = document.querySelector(`.${who}[data-x="${x + (isHorizontal ? l : 0)}"][data-y="${y + (isHorizontal ? 0 : l)}"]`);
            cell.classList.add('ship-cell'); 
            
        }

        if (rand === false) {
            ships[currentLength] -= 1
        }

        renderAvailableShips()
        console.log(ships)
        console.log(board)
        updateAnnounce(`You just placed ${currentLength}-length ship!`)
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
            updateAnnounce('You just placed all your ships! Start the battle!')
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

    function receiveAttack(x, y, who) {
        if (game === 'over') {
            alert('Game over, buddy. Start a new one.')
        }

        if (board[x][y] == 'missed') {
            updateAnnounce('You already missed that!')
            return
        }

        if (board[x][y] === null) {
            missedShots.push({ x, y });
            board[x][y] = 'missed'
            addMiss(x, y, who)
            updateAnnounce('Miss!')
        } else if (board[x][y] && board[x][y] != 'missed') {
            if (board[x][y].attacked == true) {
                updateAnnounce('You already attacked this ship!')
                return
            }
            board[x][y].ship.hit();
            board[x][y].attacked = true
            updateAnnounce('HIT!')
            if (board[x][y].ship.isSunk()) {
                console.log(`${board[x][y].ship.length}-length ship has been sunk!`);
                updateAnnounce(`${board[x][y].ship.length}-length ship has been sunk!`)
            }
            addHit(x, y, who)
        }
        console.log(missedShots)
        console.log(board[x][y])
        
    }

    function areAllShipsSunk() {
        return board.every(row => row.every(cell => cell === null || cell.attacked || cell === 'missed'));
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
        setCurrentLength,
        receiveAttack,
        areAllShipsSunk,
        missedShots
    };
}