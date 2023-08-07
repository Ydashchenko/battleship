import _ from 'lodash'
import './style.css'

function Ship(length) {
    return {
        length,
        howManyHits: 0,
        beenSunk: false,
        hit: () => {
            howManyHits += 1
        },
        isSunk: () => {
            if (howManyHits >= length) {
                beenSunk = true
            }
        }

    }
}