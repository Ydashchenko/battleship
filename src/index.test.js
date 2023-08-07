import { Ship } from './index'

describe('Ship', () => {
  it('creates a ship with the correct length', () => {
    const ship = Ship(3);
    expect(ship.length).toBe(3);
  });

  it('increments the number of hits when hit() is called', () => {
    const ship = Ship(3);
    ship.hit();
    expect(ship.howManyHits).toBe(1);
  });

  it('does not mark the ship as sunk if the number of hits is less than the length', () => {
    const ship = Ship(3);
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });

  it('marks the ship as sunk if the number of hits is equal to the length', () => {
    const ship = Ship(3);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  it('marks the ship as sunk if the number of hits exceeds the length', () => {
    const ship = Ship(3);
    ship.hit();
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
