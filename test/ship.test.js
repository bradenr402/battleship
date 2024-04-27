import { Ship } from '../src/ship';

describe('Ship', () => {
  let ship;

  beforeEach(() => {
    ship = new Ship(3);
  });

  it('creates a ship with the correct length', () => {
    expect(ship.length).toBe(3);
  });

  it("hit() method increases ship's hits", () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });

  it('isSunk() returns true when ship is sunk', () => {
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });

  it('isSunk() returns false when ship is not sunk', () => {
    ship.hit();
    expect(ship.isSunk()).toBe(false);
  });
});
