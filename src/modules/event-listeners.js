import { playerBoard, startBattle } from '..';
import { Ship} from './ship';

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

    const randomPlace = document.getElementById('random-place')
    randomPlace.addEventListener('click', () => playerBoard.placeAllShipsRandomly('my-cell'))

    const myCells = document.querySelectorAll('.my-cell')
    myCells.forEach(cell => cell.addEventListener('click', () => {
        const x = parseInt(cell.dataset.x);
        const y = parseInt(cell.dataset.y);
        const ship = Ship(playerBoard.currentLength);
        playerBoard.placeShip(false, 'my-cell', ship, x, y);
    }));
}
