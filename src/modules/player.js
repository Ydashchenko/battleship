import { updateAnnounce } from "./dom-manipulation";
import { setGameOver } from "..";


export function player() {
    function attack(x, y, board) {
        board.receiveAttack(x, y, 'cell')
        if (board.areAllShipsSunk()) {
            updateAnnounce('Game over!')
            setGameOver()
        }
    }

    function randomAttack(board) {
        let x, y
        do {
            x = Math.floor(Math.random() * 10);
            y = Math.floor(Math.random() * 10);
        } while (board.missedShots.some(shot => shot.x === x && shot.y === y))
        
        
        board.receiveAttack(x, y, 'my-cell')
    }

    return {
        attack, randomAttack
    }
}
