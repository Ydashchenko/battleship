import { playerBoard } from '..';
import { focusShip, renderAvailableShips, updateAxisBtn, buildBoard } from './dom-manipulation';
import { Ship, setCurrentLength, currentLength } from './ship';
import { GameBoard } from "./game-board";

export function addEventListeners() {
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
}
