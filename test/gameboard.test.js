import { Gameboard } from '../src/gameboard';
import { Ship } from '../src/ship';

describe('Gameboard', () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  it('starts with a 10x10 null grid', () => {
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
    const ship = new Ship(3);

    gameboard.placeShip(ship, [0, 0], 'horizontal');
    expect(gameboard.grid[0][0]).toBe(ship);
    expect(gameboard.grid[0][1]).toBe(ship);
    expect(gameboard.grid[0][2]).toBe(ship);
  });

  it('placeShip() prevents ship from overflowing out of board', () => {
    const ship = new Ship(3);

    expect(gameboard.placeShip(ship, [0, 8], 'horizontal')).toBe('invalid');
    expect(gameboard.placeShip(ship, [8, 0], 'vertical')).toBe('invalid');
  });

  it('placeShip() prevents ship from being placed on top of another', () => {
    const ship1 = new Ship(3);
    const ship2 = new Ship(4);

    gameboard.placeShip(ship1, [1, 0], 'horizontal');
    expect(gameboard.placeShip(ship2, [0, 1], 'vertical')).toBe('invalid');
  });

  it('receiveAttack() records attack', () => {
    gameboard.receiveAttack(3, 4);
    expect(gameboard.attacks).toContainEqual([3, 4]);
  });

  it('receiveAttack() marks hit on ship', () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0], 'horizontal');
    gameboard.receiveAttack(0, 1);
    expect(ship.hits).toBe(1);
  });

  it("receiveAttack() returns 'invalid' if attack is not on board", () => {
    expect(gameboard.receiveAttack(-1, 0)).toBe('invalid');
    expect(gameboard.receiveAttack(11, 0)).toBe('invalid');
    expect(gameboard.receiveAttack(0, -1)).toBe('invalid');
    expect(gameboard.receiveAttack(0, 11)).toBe('invalid');
  });

  it("receiveAttack() returns 'hit' if ship is hit", () => {
    const ship = new Ship(3);
    gameboard.placeShip(ship, [0, 0], 'horizontal');
    expect(gameboard.receiveAttack(0, 0)).toBe('hit');
    expect(gameboard.receiveAttack(0, 1)).toBe('hit');
    expect(gameboard.receiveAttack(0, 2)).toBe('hit');
  });

  it("receiveAttack() returns 'miss' if ship is not hit", () => {
    expect(gameboard.receiveAttack(1, 0)).toBe('miss');
  });

  it('allSunk() returns true when all ships are sunk', () => {
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
});
