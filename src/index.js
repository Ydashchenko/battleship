import _ from 'lodash';
import './style.css';
import { GameBoard } from './modules/game-board';
import { addEventListeners, addPlaceShipEventListeners } from './modules/event-listeners';
import { buildBoard, changeDOMtoBattleMode, changeDOMtoPrepareMode, updateAnnounce } from './modules/dom-manipulation';
import { addRestartEvent } from './modules/event-listeners';
import { player } from './modules/player';
import { addAttackAIEventListeners } from './modules/event-listeners';


let playerBoard = GameBoard();
let computerBoard = GameBoard()
let you = player()
let computer = player()
let game = 'prepare'

export function init() {
    buildBoard('player')
    buildBoard('computer')
    addEventListeners()
    addPlaceShipEventListeners()
    computerBoard.placeAllShipsRandomly('cell')
    updateAnnounce('Place your ships!')
    //playerBoard.placeAllShipsRandomly('my-cell')
    
}

export function startBattle() {
    if (!playerBoard.areAllShipsPlaced()) {
        alert('Place all your ships!')
        return
    }
    updateAnnounce(`Attack the enemy's board!`)
    game = 'battle'
    changeDOMtoBattleMode()
    addAttackAIEventListeners()
}

export function restartBattle() {
    game = 'prepare'
    playerBoard = GameBoard()
    computerBoard = GameBoard()
    you = player()
    computer = player()
    buildBoard('player')
    buildBoard('computer')
    addPlaceShipEventListeners()
    computerBoard.placeAllShipsRandomly('cell')
    changeDOMtoPrepareMode()
    updateAnnounce('Playing again! Place the ships!')
}

export function setGameOver() {
    game = 'over'
}

init()

export { playerBoard, computerBoard, you, computer, game }