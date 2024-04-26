import { Ship } from '../src/ship';

it('creates a ship with the correct length', () => {
  const ship = new Ship(4);
  expect(ship.length).toBe(4);
});

it("hit() method increases ship's hits", () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.hits).toBe(1);
});

it('isSunk() returns true when ship is sunk', () => {
  const ship = new Ship(2);
  ship.hit();
  ship.hit();
  expect(ship.isSunk()).toBe(true);
});

it('isSunk() returns false when ship is not sunk', () => {
  const ship = new Ship(3);
  ship.hit();
  expect(ship.isSunk()).toBe(false);
});
