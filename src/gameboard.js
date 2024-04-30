import { Ship } from './ship';

export class Gameboard {
  constructor() {
    this.grid = Array.from({ length: 10 }, () => Array(10).fill(null));
    this.attacks = [];
    this.ships = [];
  }

  placeShip(ship, [row, col], direction) {
    if (direction === 'horizontal') {
      if (col + ship.length > 10) return 'invalid';

      const selectedCells = this.grid[row].slice(col, col + ship.length);
      if (selectedCells.some((cell) => cell instanceof Ship)) {
        return 'invalid';
      }

      for (let i = 0; i < ship.length; i++) {
        this.grid[row][col + i] = ship;
      }
    } else if (direction === 'vertical') {
      if (row + ship.length > 10) return 'invalid';

      const selectedCells = this.grid.slice(row, row + ship.length).map((row) => row[col]);
      if (selectedCells.some((cell) => cell instanceof Ship)) {
        return 'invalid';
      }

      for (let i = 0; i < ship.length; i++) {
        this.grid[row + i][col] = ship;
      }
    }

    this.ships.push(ship);
    return [row, col];
  }

  receiveAttack(row, col) {
    if (row < 0 || row >= 10 || col < 0 || col >= 10) {
      console.error('Invalid attack!');
      return 'invalid';
    }

    this.attacks.push([row, col]);

    if (this.grid[row][col] instanceof Ship) {
      this.grid[row][col].hit(0);
      return 'hit';
    }
    return 'miss';
  }

  allSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}
