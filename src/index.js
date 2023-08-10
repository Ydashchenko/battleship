import _ from 'lodash';
import './style.css';
import { GameBoard } from './modules/game-board';
import { Ship, setCurrentLength, currentLength } from './modules/ship';
import { addEventListeners } from './modules/event-listeners';
import {
    focusShip,
    renderAvailableShips,
    updateAxisBtn,
    buildBoard
} from './modules/dom-manipulation';


let playerBoard = GameBoard();

export function init() {
    buildBoard('player')
    buildBoard('computer')
    addEventListeners()
    return {
        playerBoard
    }
}

init()

export { playerBoard }
