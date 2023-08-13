
export function Ship(length) {
    console.log(`Creating ship with length ${length}`);
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
