import _ from 'lodash';
import './style.css';
import { GameBoard } from './modules/game-board';
import { Ship, setCurrentLength, currentLength } from './modules/ship';
import { addEventListeners } from './modules/event-listeners';
import {
    focusShip,
    renderAvailableShips,
    updateAxisBtn,
    buildBoard,
    hideShipPick
} from './modules/dom-manipulation';


let playerBoard = GameBoard();
let computerBoard = GameBoard()

export function init() {
    buildBoard('player')
    buildBoard('computer')
    addEventListeners()
    computerBoard.placeAllShipsRandomly('cell')
    
}

export function startBattle() {
    if (!playerBoard.areAllShipsPlaced()) {
        alert('Place all your ships!')
        return
    }
    
    
}


init()

export { playerBoard, computerBoard}