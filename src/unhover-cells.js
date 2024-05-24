export default function unhoverCells(unhoveredCell, shipLength, direction) {
  const playerGameboard = document.getElementById('playerGameboard');

  // const unhoveredCell = event.target;

  const cells = [];
  if (unhoveredCell.dataset.type !== 'ship') cells.push(unhoveredCell);

  const row = +unhoveredCell.dataset.row;
  const col = +unhoveredCell.dataset.col;

  if (direction === 'horizontal') {
    for (let i = 1; i < shipLength; i++) {
      const cell = playerGameboard.querySelector(`[data-row="${row}"][data-col="${col + i}"]`);
      if (cell && cell.dataset.type !== 'ship') cells.push(cell);
    }
  } else {
    for (let i = 1; i < shipLength; i++) {
      const cell = playerGameboard.querySelector(`[data-row="${row + i}"][data-col="${col}"]`);
      if (cell && cell.dataset.type !== 'ship') cells.push(cell);
    }
  }

  cells.forEach((cell) => {
    cell.classList.add('bg-blue-700');
    cell.classList.remove('bg-blue-400');
  });
}
