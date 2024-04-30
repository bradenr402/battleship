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

    const currentShipName = document.getElementById('currentShip');
    currentShipName.textContent = ship.name;

    const direction = await getShipDirection();
    let coordinates;
    let result = 'invalid';

    const handleCellHover = (event) => hoverCells(event, ship.length, direction);
    const handleCellUnhover = (event) => unhoverCells(event, ship.length, direction);

    playerGameboard.addEventListener('mouseover', handleCellHover);
    playerGameboard.addEventListener('mouseout', handleCellUnhover);

    while (result === 'invalid') {
      coordinates = await getShipCoordinates(ship);
      result = player.placeShip(ship, coordinates, direction);
    }

    highlightCells(playerGameboard, coordinates, ship.length, direction, shipNumber);
    playerGameboard.removeEventListener('mouseover', handleCellHover);
    playerGameboard.removeEventListener('mouseout', handleCellUnhover);
    shipNumber++;
  }

  await placeShip(carrier);
  await placeShip(battleship);
  await placeShip(submarine);
  await placeShip(cruiser);
  await placeShip(destroyer);
}

async function getShipCoordinates(ship) {
  const playerGameboard = document.getElementById('playerGameboard');

  return awaitUserClick(playerGameboard).then((event) => [
    +event.target.dataset.row,
    +event.target.dataset.col,
  ]);
}

async function getShipDirection() {
  function closeDirectionPopup() {
    document.getElementById('directionPopup').classList.add('hidden');
  }

  function openDirectionPopup() {
    document.getElementById('directionPopup').classList.remove('hidden');
  }

  openDirectionPopup();

  const horizontalBtn = document.getElementById('horizontal');
  const verticalBtn = document.getElementById('vertical');

  const verticalPromise = awaitUserClick(verticalBtn).then(() => 'vertical');
  const horizontalPromise = awaitUserClick(horizontalBtn).then(() => 'horizontal');

  const direction = await Promise.race([horizontalPromise, verticalPromise]);
  closeDirectionPopup();
  return direction;
}
