import { focusShip, renderAvailableShips, updateAxisBtn, buildBoard } from './dom-manipulation';
import { addEventListeners } from './event-listeners';
import { GameBoard } from "./game-board";
import { playerBoard } from '..';

let currentLength = 0

export function Ship(length) {
    return {
        length: length,
        howManyHits: 0,
        beenSunk: false,
        hit: function () {
            this.howManyHits += 1;
        },
        isSunk: function () {
            if (this.howManyHits >= length) {
                this.beenSunk = true;
            } else {
                this.beenSunk = false;
            }
            return this.beenSunk;
        },
    };
}

export function setCurrentLength(value, ship) {
    if (playerBoard.ships[value] == 0) {
        alert(`You're out of ${value}-length ships!`)
        currentLength = 0
        return
    }
    currentLength = value
    console.log(`Now current length is ${currentLength}`)
    focusShip(ship)
}

export { currentLength }