import { playerBoard, startBattle, restartBattle, computerBoard, you, computer } from '..';
import { Ship } from './ship';
import { player } from './player';

export function addEventListeners() {
    const axisBtn = document.getElementById('axis')
    axisBtn.addEventListener('click', () => playerBoard.toggleIsHorizontal())

    const destroyer = document.getElementById('destroyer')
    destroyer.addEventListener('click', () => playerBoard.currentLength = playerBoard.setCurrentLength(1, destroyer))

    const submarine = document.getElementById('submarine')
    submarine.addEventListener('click', () => playerBoard.currentLength = playerBoard.setCurrentLength(2, submarine))

    const cruiser = document.getElementById('cruiser')
    cruiser.addEventListener('click', () => playerBoard.currentLength = playerBoard.setCurrentLength(3, cruiser))

    const carrier = document.getElementById('carrier')
    carrier.addEventListener('click', () => playerBoard.currentLength = playerBoard.setCurrentLength(4, carrier))

    const startBtn = document.getElementById('start-btn')
    startBtn.addEventListener('click', () =>  startBattle())

    const restartBtn = document.getElementById('restart-btn')
    restartBtn.addEventListener('click', () => restartBattle())

    const randomPlace = document.getElementById('random-place')
    randomPlace.addEventListener('click', () => playerBoard.placeAllShipsRandomly('my-cell'))

}

export function addPlaceShipEventListeners() {
    const myCells = document.querySelectorAll('.my-cell')
    myCells.forEach(cell => cell.addEventListener('click', () => {
        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);
        const ship = Ship(playerBoard.currentLength);
        playerBoard.placeShip(false, 'my-cell', ship, x, y);
    }));
}

export function addAttackAIEventListeners() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.addEventListener('click', () => {
        //computerBoard.receiveAttack(cell.dataset.x, cell.dataset.y)
        let x = cell.dataset.x
        let y = cell.dataset.y
        you.attack(x, y, computerBoard)
        setTimeout(computer.randomAttack, 1000, playerBoard)
    }));
}
