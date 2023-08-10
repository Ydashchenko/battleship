import { playerBoard } from '..';
import { focusShip, renderAvailableShips, updateAxisBtn, buildBoard } from './dom-manipulation';
import { addEventListeners } from './event-listeners';
import { Ship, setCurrentLength, currentLength } from './ship';


export function GameBoard() {
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


