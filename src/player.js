import { Gameboard } from './gameboard';

export class Player {
  constructor(type) {
    this.type = type;
    this.gameboard = new Gameboard();
  }

  placeShip(ship, [row, col], direction) {
    return this.gameboard.placeShip(ship, [row, col], direction);
  }

  allSunk() {
    return this.gameboard.allSunk();
  }
}
