import _ from 'lodash'
import './style.css'

export function Ship(length) {
    return {
        length: length,
        howManyHits: 0,
        beenSunk: false,
        hit: function () {
            this.howManyHits += 1
        },
        isSunk: function () {
            if (this.howManyHits >= length) {
                this.beenSunk = true
            } else {
                this.beenSunk = false
            }
            return this.beenSunk
        }
    }
}

export function Gameboard() {
    const boardSize = 10
    const board = new Array(boardSize).fill(null).map(() => new Array(boardSize).fill(null))

    function checkShipOverlap(x, y, shipLength, isHorizontal) {
        const start = isHorizontal ? x : y;
        const end = start + shipLength;
        for (let i = start; i < end; i++) {
            if (isHorizontal) {
                if (board[i][y]) return true;
            } else {
                if (board[x][i]) return true;
            }
        }
        return false;
    }

    function placeShip(ship, x, y, isHorizontal) {
        if ((isHorizontal && x + shipLength > boardSize) || (!isHorizontal && y + shipLength > boardSize)) {
            throw new Error('Invalid coordinates. Ship placement out of bounds.');
        }
      
        if (checkShipOverlap(x, y, shipLength, isHorizontal)) {
            throw new Error('Invalid coordinates. Ship overlaps with another ship.');
        }

        for (cell in ship.length) {
            if (isHorizontal) {
                board[x + cell][y] = ship
            } else {
                board[x][y + cell] = ship
            }
        }
    }

    function receiveAttack(x, y) {
        if (board[x][y]) {
            const ship = board[x][y];
            ship.hit();
            return true;
          } else {
            missedAttacks.push({ x, y });
            return false;
          }
    }


}











    /*
    let battleShips = {
        carrier: {
            quantity: 1,
            length: 4
        },
        destroyer: {
            quantity: 2,
            length: 3
        },
        submarine: {
            quantity: 3,
            length: 2
        },
        boat: {
            quantity: 4,
            length: 1
        }
    } */