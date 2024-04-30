export class Ship {
  constructor(length, name) {
    this.length = length;
    this.name = name;
    this.hits = 0;
  }

  hit() {
    this.hits++;
  }

  isSunk() {
    return this.length === this.hits;
  }
}
