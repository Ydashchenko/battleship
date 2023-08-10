import { playerBoard } from '..';
import { addEventListeners } from './event-listeners';
import { Ship, setCurrentLength, currentLength } from './ship';
import { GameBoard } from "./game-board";

export function focusShip(ship) {
    const ships = document.querySelectorAll('.ship')
    ships.forEach((s) => {
        if (s === ship) {
            s.style.border = 'solid 2px rgb(15, 0, 115)';
        } else {
            s.style.border = 'none'
        }
    })
}

export function renderAvailableShips() {
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

export function updateAxisBtn(isHorizontal) {
    const axis = document.getElementById('axis')
    isHorizontal ? axis.innerHTML = 'Current axis - X' : axis.innerHTML = 'Current axis - Y'
}

export function buildBoard(player) {
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
