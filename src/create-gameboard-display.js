export default function createGameboardDisplay() {
  const gameboardContainer = document.getElementById('gameboardContainer');

  const playerGameboard = createGameboard('player');
  const computerGameboard = createGameboard('computer');

  gameboardContainer.append(playerGameboard, computerGameboard);
}

function createGameboard(playerType) {
  const gameboard = document.createElement('div');
  gameboard.id = playerType + 'Gameboard';
  gameboard.classList.add('mx-auto', 'grid', 'w-fit', 'grid-rows-10', 'place-items-center');

  for (let r = 0; r < 10; r++) {
    const row = createRow(r, playerType === 'player' ? 'blue' : 'red');

    gameboard.appendChild(row);
  }

  return gameboard;
}

function createRow(r, color) {
  const row = document.createElement('div');
  row.classList.add('grid', 'grid-cols-10');

  for (let c = 0; c < 10; c++) {
    const cell = document.createElement('div');
    cell.dataset.row = r;
    cell.dataset.col = c;

    cell.classList.add('size-12', 'border', 'grid', 'place-items-center', 'font-bold');

    if (color === 'blue') cell.classList.add('border-blue-400', 'bg-blue-700');
    else cell.classList.add('border-rose-400', 'bg-rose-700', 'hover:bg-rose-400');

    row.appendChild(cell);
  }

  return row;
}
