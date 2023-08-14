import _ from 'lodash';
import './style.css';
import { GameBoard } from './modules/game-board';
import { addEventListeners, addPlaceShipEventListeners } from './modules/event-listeners';
import { buildBoard, changeDOMtoBattleMode, changeDOMtoPrepareMode } from './modules/dom-manipulation';
import { addRestartEvent } from './modules/event-listeners';


let playerBoard = GameBoard();
let computerBoard = GameBoard()

export function init() {
    buildBoard('player')
    buildBoard('computer')
    addEventListeners()
    addPlaceShipEventListeners()
    computerBoard.placeAllShipsRandomly('cell')
    //playerBoard.placeAllShipsRandomly('my-cell')
    
}

export function startBattle() {
    if (!playerBoard.areAllShipsPlaced()) {
        alert('Place all your ships!')
        return
    }
    console.log('The battle begun!')
    changeDOMtoBattleMode()
}

export function restartBattle() {
    playerBoard = GameBoard();
    computerBoard = GameBoard()
    buildBoard('player')
    buildBoard('computer')
    addPlaceShipEventListeners()
    computerBoard.placeAllShipsRandomly('cell')
    changeDOMtoPrepareMode()

}

init()

export { playerBoard, computerBoard }