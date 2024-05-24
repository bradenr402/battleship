export default function unhoverCells(event, shipLength, direction) {
  const playerGameboard = document.getElementById('playerGameboard');

  const hoveredCell = event.target;

  const cells = [];
  if (hoveredCell.dataset.type !== 'ship') cells.push(hoveredCell);

  const row = +hoveredCell.dataset.row;
  const col = +hoveredCell.dataset.col;

  if (direction === 'horizontal') {
    for (let i = 0; i < shipLength; i++) {
      const cell = playerGameboard.querySelector(`[data-row="${row}"][data-col="${col + i}"]`);
      if (cell && cell.dataset.type !== 'ship') cells.push(cell);
    }
  } else {
    for (let i = 0; i < shipLength; i++) {
      const cell = playerGameboard.querySelector(`[data-row="${row + i}"][data-col="${col}"]`);
      if (cell && cell.dataset.type !== 'ship') cells.push(cell);
    }
  }

  cells.forEach((cell) => {
    cell.classList.add('bg-blue-700');
    cell.classList.remove('bg-blue-400');
  });
}
