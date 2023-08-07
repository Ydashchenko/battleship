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

