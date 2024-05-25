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
      if (
        selectedCells.some((cell) => cell instanceof Ship) ||
        selectedCells.some((cell) => cell === 'blocked')
      ) {
        return 'invalid';
      }

      for (let i = 0; i < ship.length; i++) {
        this.grid[row][col + i] = ship;
      }
    } else {
      if (row + ship.length > 10) return 'invalid';

      const selectedCells = this.grid.slice(row, row + ship.length).map((row) => row[col]);
      if (
        selectedCells.some((cell) => cell instanceof Ship) ||
        selectedCells.some((cell) => cell === 'blocked')
      ) {
        return 'invalid';
      }

      for (let i = 0; i < ship.length; i++) {
        this.grid[row + i][col] = ship;
      }
    }

    this.blockAdjacentCells([row, col], ship.length, direction);

    console.log(this.grid);

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

  blockAdjacentCells([row, col], shipLength, direction) {
    if (direction === 'horizontal') {
      this.blockRowAbove([row, col], shipLength);
      this.blockRowBelow([row, col], shipLength);

      this.blockCellBefore(row, col);
      this.blockCellAfter(row, col + shipLength);
    } else {
      this.blockColumnBefore([row, col], shipLength);
      this.blockColumnAfter([row, col], shipLength);

      this.blockCellAbove(row, col);
      this.blockCellBelow(row + shipLength, col);
    }
  }

  blockRowAbove([row, col], shipLength) {
    if (row > 0) {
      for (let i = 0; i < shipLength; i++) {
        if (!(this.grid[row - 1][col + i] instanceof Ship)) this.grid[row - 1][col + i] = 'blocked';
      }
    }
  }

  blockRowBelow([row, col], shipLength) {
    if (row < 9) {
      for (let i = 0; i < shipLength; i++) {
        if (!(this.grid[row + 1][col + i] instanceof Ship)) this.grid[row + 1][col + i] = 'blocked';
      }
    }
  }

  blockColumnBefore([row, col], shipLength) {
    if (col > 0) {
      for (let i = 0; i < shipLength; i++) {
        if (!(this.grid[row + i][col - 1] instanceof Ship)) this.grid[row + i][col - 1] = 'blocked';
      }
    }
  }

  blockColumnAfter([row, col], shipLength) {
    if (col < 9) {
      for (let i = 0; i < shipLength; i++) {
        if (!(this.grid[row + i][col + 1] instanceof Ship)) this.grid[row + i][col + 1] = 'blocked';
      }
    }
  }

  blockCellAbove(row, col) {
    if (row > 0 && !(this.grid[row - 1][col] instanceof Ship)) this.grid[row - 1][col] = 'blocked';
  }

  blockCellBelow(row, col) {
    if (row < 9 && !(this.grid[row][col] instanceof Ship)) this.grid[row][col] = 'blocked';
  }

  blockCellBefore(row, col) {
    if (col > 0 && !(this.grid[row][col - 1] instanceof Ship)) this.grid[row][col - 1] = 'blocked';
  }

  blockCellAfter(row, col) {
    if (col < 9 && !(this.grid[row][col] instanceof Ship)) this.grid[row][col] = 'blocked';
  }
}
