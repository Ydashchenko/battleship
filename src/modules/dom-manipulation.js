import { playerBoard } from '..';

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
    playerBoard.innerHTML = ''
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

export function clearGrid() {
    const myCells = document.querySelectorAll('.my-cell')
    myCells.forEach(cell => cell.classList.remove('ship-cell'))
}

/*
export function hideShipPick() {
    const els = Array.from(document.getElementById('my-ships').childNodes)
        .filter(el => el.nodeType === Node.ELEMENT_NODE); // Filter out text nodes
    els.forEach(el => el.style.display = 'none');
    const rnd = document.getElementById('random-place');
    rnd.style.display = 'block';
}
*/

export function setCountersToZero() {
    const counters = document.querySelectorAll('.counter')
    counters.forEach(counter => {
        counter.innerHTML = 'x0'
    })
}

export function changeDOMtoBattleMode() {
    const myShips = document.getElementById('my-ships')
    myShips.style.display = 'none'
    const boards = document.getElementById('boards')
    boards.style.gridTemplateColumns = '1fr 1fr'
    const restartBtn = document.getElementById('restart-btn')
    restartBtn.style.display = 'block'
    const startBtn = document.getElementById('start-btn')
    startBtn.style.display = 'none'
}

export function changeDOMtoPrepareMode() {
    const myShips = document.getElementById('my-ships')
    myShips.style.display = 'grid'
    const boards = document.getElementById('boards')
    boards.style.gridTemplateColumns = '1fr auto 1fr'
    const restartBtn = document.getElementById('restart-btn')
    restartBtn.style.display = 'none'
    const startBtn = document.getElementById('start-btn')
    startBtn.style.display = 'block'
}

export function addHit(hitX, hitY, who) {
    const cells = document.querySelectorAll(`.${who}`) 
    cells.forEach(cell => {
        if (cell.dataset.x == hitX && cell.dataset.y == hitY) {
            cell.innerHTML = 'X'
        }
    })
}

export function addMiss(missX, missY, who) {
    const cells = document.querySelectorAll(`.${who}`) 
    cells.forEach(cell => {
        if (cell.dataset.x == missX && cell.dataset.y == missY) {
            cell.classList.add('missed')
        }
    })
}

export function updateAnnounce(message) {
    const info = document.getElementById('info')
    info.innerHTML = message
}

