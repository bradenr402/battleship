import { Ship } from './ship';

import awaitUserClick from './await-user-click';
import highlightCells from './highlight-cells';
import hoverCells from './hover-cells';
import unhoverCells from './unhover-cells';

export default async function createPlayerShips(player) {
  const playerGameboard = document.getElementById('playerGameboard');
    const rotateShipBtn = document.getElementById('rotateShipBtn');

  let shipNumber = 1;
  async function placeShip(ship) {
    let coordinates;
    let direction = 'horizontal';
    let result = 'invalid';

    let currentHoveredCell; // to update hover display when 'z' is pressed to rotate ship
    const handleCellHover = (event) => {
      currentHoveredCell = event.target;
      hoverCells(currentHoveredCell, ship.length, direction);
    };

    const handleCellUnhover = (event) => unhoverCells(event.target, ship.length, direction);
    playerGameboard.onmouseover = handleCellHover;
    playerGameboard.onmouseout = handleCellUnhover;

    rotateShipBtn.onclick = () => {
      direction = direction === 'horizontal' ? 'vertical' : 'horizontal';

      playerGameboard.onmouseover = handleCellHover;
      playerGameboard.onmouseout = handleCellUnhover;
    };

    window.onkeydown = (event) => {
      if (event.key.toLowerCase() === 'z') {
        unhoverCells(currentHoveredCell, ship.length, direction);
        direction = direction === 'horizontal' ? 'vertical' : 'horizontal';
        hoverCells(currentHoveredCell, ship.length, direction);

        playerGameboard.onmouseover = handleCellHover;
        playerGameboard.onmouseout = handleCellUnhover;
      }
    };

    while (result === 'invalid') {
      coordinates = await getShipCoordinates();
      result = player.placeShip(ship, coordinates, direction);
    }

    highlightCells(playerGameboard, coordinates, ship.length, direction, shipNumber);
    shipNumber++;
  }

  await placeShip(new Ship(5, 'Carrier'));
  await placeShip(new Ship(4, 'Battleship'));
  await placeShip(new Ship(3, 'Submarine'));
  await placeShip(new Ship(3, 'Cruiser'));
  await placeShip(new Ship(2, 'Destroyer'));

  playerGameboard.onmouseover = null;
  playerGameboard.onmouseout = null;
  window.onkeydown = null;
  rotateShipBtn.onclick = null;
  rotateShipBtn.classList.add('hidden');

  document.getElementById('placeShipInstructions').classList.add('hidden');
  document.getElementById('gameInstructions').classList.remove('hidden');
}

async function getShipCoordinates() {
  const playerGameboard = document.getElementById('playerGameboard');

  return awaitUserClick(playerGameboard).then((event) => [
    +event.target.dataset.row,
    +event.target.dataset.col,
  ]);
}
