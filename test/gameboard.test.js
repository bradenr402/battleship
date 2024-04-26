import { Gameboard } from '../src/gameboard';
import { Ship } from '../src/ship';

it('starts with a 10x10 null grid', () => {
  const gameboard = new Gameboard();
  expect(gameboard.grid).toStrictEqual([
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ]);
});

it('placeShip() places ship correctly', () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);

  gameboard.placeShip(ship, [0, 0], 'horizontal');
  expect(gameboard.grid[0][0]).toBe(ship);
  expect(gameboard.grid[0][1]).toBe(ship);
  expect(gameboard.grid[0][2]).toBe(ship);
});

it('placeShip() prevents ship from overflowing out of board', () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);

  expect(gameboard.placeShip(ship, [0, 7], 'horizontal')).toBe('invalid');
  expect(gameboard.placeShip(ship, [7, 0], 'vertical')).toBe('invalid');
});

it('receiveAttack() records attack', () => {
  const gameboard = new Gameboard();
  gameboard.receiveAttack(3, 4);
  expect(gameboard.attacks).toContainEqual([3, 4]);
});

it('receiveAttack() marks hit on ship', () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  gameboard.placeShip(ship, [0, 0], 'horizontal');
  gameboard.receiveAttack(0, 1);
  expect(ship.hits).toBe(1);
});

it("receiveAttack() returns 'invalid' if attack is not on board", () => {
  const gameboard = new Gameboard();
  expect(gameboard.receiveAttack(-1, 0)).toBe('invalid');
  expect(gameboard.receiveAttack(11, 0)).toBe('invalid');
  expect(gameboard.receiveAttack(0, -1)).toBe('invalid');
  expect(gameboard.receiveAttack(0, 11)).toBe('invalid');
});

it("receiveAttack() returns 'hit' if ship is hit", () => {
  const gameboard = new Gameboard();
  const ship = new Ship(3);
  gameboard.placeShip(ship, [0, 0], 'horizontal');
  expect(gameboard.receiveAttack(0, 0)).toBe('hit');
  expect(gameboard.receiveAttack(0, 1)).toBe('hit');
  expect(gameboard.receiveAttack(0, 2)).toBe('hit');
});

it("receiveAttack() returns 'miss' if ship is not hit", () => {
  const gameboard = new Gameboard();
  expect(gameboard.receiveAttack(1, 0)).toBe('miss');
});

it('allSunk() returns true when all ships are sunk', () => {
  const gameboard = new Gameboard();
  const ship1 = new Ship(2);
  const ship2 = new Ship(3);
  gameboard.placeShip(ship1, [0, 0], 'horizontal');
  gameboard.placeShip(ship2, [1, 0], 'vertical');

  gameboard.receiveAttack(0, 0);
  gameboard.receiveAttack(0, 1);
  gameboard.receiveAttack(1, 0);
  gameboard.receiveAttack(2, 0);
  gameboard.receiveAttack(3, 0);

  expect(gameboard.allSunk()).toBe(true);
});

it('allSunk() returns false when not all ships are sunk', () => {
  const gameboard = new Gameboard();
  const ship1 = new Ship(2);
  const ship2 = new Ship(3);
  gameboard.placeShip(ship1, [0, 0], 'horizontal');
  gameboard.placeShip(ship2, [1, 0], 'vertical');

  gameboard.receiveAttack(0, 0);
  gameboard.receiveAttack(0, 1);
  gameboard.receiveAttack(1, 0);
  gameboard.receiveAttack(1, 1);

  expect(gameboard.allSunk()).toBe(false);
});
