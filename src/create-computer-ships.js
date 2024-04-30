import { Ship } from './ship';

import highlightCells from './highlight-cells';

export default function createComputerShips(player) {
  const carrier = new Ship(5, 'Carrier');
  const battleship = new Ship(4, 'Battleship');
  const submarine = new Ship(3, 'Submarine');
  const cruiser = new Ship(3, 'Cruiser');
  const destroyer = new Ship(2, 'Destroyer');

  let shipNumber = 1;
  function placeShip(ship) {
    const direction = getShipDirection();
    let coordinates;
    let result = 'invalid';

    while (result === 'invalid') {
      coordinates = getShipCoordinates(ship);
      result = player.placeShip(ship, coordinates, direction);
    }

    const computerGameboard = document.getElementById('computerGameboard');
    highlightCells(computerGameboard, coordinates, ship.length, direction, shipNumber);
    shipNumber++;
  }

  placeShip(carrier);
  placeShip(battleship);
  placeShip(submarine);
  placeShip(cruiser);
  placeShip(destroyer);
}

function getShipCoordinates(ship) {
  const maxRow = 10 - ship.length;
  const maxCol = 10 - ship.length;

  const row = Math.floor(Math.random() * (maxRow + 1));
  const col = Math.floor(Math.random() * (maxCol + 1));

  return [row, col];
}

function getShipDirection() {
  const rand = Math.random();

  if (rand < 0.5) return 'horizontal';
  return 'vertical';
}
