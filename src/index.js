import _ from 'lodash';
import './style.css';
import { GameBoard } from './modules/game-board';
import { addEventListeners } from './modules/event-listeners';
import { buildBoard } from './modules/dom-manipulation';


let playerBoard = GameBoard();
let computerBoard = GameBoard()

export function init() {
    buildBoard('player')
    buildBoard('computer')
    addEventListeners()
    computerBoard.placeAllShipsRandomly('cell')
    //playerBoard.placeAllShipsRandomly('my-cell')
    playerBoard.setCurrentLength(4)
    console.log(playerBoard.currentLength)
    
}

export function startBattle() {
    if (!playerBoard.areAllShipsPlaced()) {
        alert('Place all your ships!')
        return
    }
    
}


init()

export { playerBoard, computerBoard}