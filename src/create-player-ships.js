import { Ship } from './ship';

import awaitUserClick from './await-user-click';
import highlightCells from './highlight-cells';
import hoverCells from './hover-cells';
import unhoverCells from './unhover-cells';

export default async function createPlayerShips(player) {
  const carrier = new Ship(5, 'Carrier');
  const battleship = new Ship(4, 'Battleship');
  const submarine = new Ship(3, 'Submarine');
  const cruiser = new Ship(3, 'Cruiser');
  const destroyer = new Ship(2, 'Destroyer');

  let shipNumber = 1;
  async function placeShip(ship) {
    const playerGameboard = document.getElementById('playerGameboard');

    let coordinates;
    let direction = 'horizontal';
    let result = 'invalid';

    const handleCellHover = (event) => hoverCells(event, ship.length, direction);
    const handleCellUnhover = (event) => unhoverCells(event, ship.length, direction);
    playerGameboard.onmouseover = handleCellHover;
    playerGameboard.onmouseout = handleCellUnhover;

    const rotateShipBtn = document.getElementById('rotateShipBtn');
    rotateShipBtn.addEventListener('click', () => {
      direction = direction === 'horizontal' ? 'vertical' : 'horizontal';

      playerGameboard.onmouseover = handleCellHover;
      playerGameboard.onmouseout = handleCellUnhover;

    });

    while (result === 'invalid') {
      coordinates = await getShipCoordinates();
      result = player.placeShip(ship, coordinates, direction);
    }

    highlightCells(playerGameboard, coordinates, ship.length, direction, shipNumber);
    shipNumber++;
  }

  await placeShip(carrier);
  await placeShip(battleship);
  await placeShip(submarine);
  await placeShip(cruiser);
  await placeShip(destroyer);
}

async function getShipCoordinates() {
  const playerGameboard = document.getElementById('playerGameboard');

  return awaitUserClick(playerGameboard).then((event) => [
    +event.target.dataset.row,
    +event.target.dataset.col,
  ]);
}
