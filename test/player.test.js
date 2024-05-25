import { Gameboard } from '../src/gameboard';
import { Player } from '../src/player';
import { Ship } from '../src/ship';

describe('Player', () => {
  let player;
  beforeEach(() => {
    player = new Player('human');
  });

  it('creates a player with the correct type', () => {
    expect(player.type).toBe('human');
  });

  it('starts with an empty gameboard', () => {
    expect(player.gameboard).toBeInstanceOf(Gameboard);
    expect(player.gameboard.grid.every((row) => row.every((cell) => cell === null))).toBe(true);
  });

  it('placeShip() places ship on gameboard correctly', () => {
    const ship = new Ship(3);
    player.placeShip(ship, [0, 0], 'horizontal');
    expect(player.gameboard.grid[0][0]).toBe(ship);
    expect(player.gameboard.grid[0][1]).toBe(ship);
    expect(player.gameboard.grid[0][2]).toBe(ship);
  });

  it('allSunk() returns true when all ships are sunk', () => {
    const ship1 = new Ship(2);
    const ship2 = new Ship(3);
    player.placeShip(ship1, [0, 0], 'horizontal');
    player.placeShip(ship2, [2, 2], 'vertical');

    player.gameboard.receiveAttack(0, 0);
    player.gameboard.receiveAttack(0, 1);
    player.gameboard.receiveAttack(2, 2);
    player.gameboard.receiveAttack(3, 2);
    player.gameboard.receiveAttack(4, 2);

    expect(player.allSunk()).toBe(true);
  });

  it('allSunk() returns false when not all ships are sunk', () => {
    const ship1 = new Ship(2);
    const ship2 = new Ship(3);
    player.placeShip(ship1, [0, 0], 'horizontal');
    player.placeShip(ship2, [2, 2], 'vertical');

    player.gameboard.receiveAttack(0, 0);
    player.gameboard.receiveAttack(0, 1);
    player.gameboard.receiveAttack(2, 2);

    expect(player.allSunk()).toBe(false);
  });
});
