export default function highlightCells(gameboard, [row, col], shipLength, direction, shipNumber) {
  const clickedCell = gameboard.querySelector(`[data-row="${row}"][data-col="${col}"]`);

  const cells = [clickedCell];

  if (direction === 'horizontal') {
    for (let i = 1; i < shipLength; i++) {
      const cell = gameboard.querySelector(`[data-row="${row}"][data-col="${col + i}"]`);
      if (cell) cells.push(cell);
    }
  } else {
    for (let i = 1; i < shipLength; i++) {
      const cell = gameboard.querySelector(`[data-row="${row + i}"][data-col="${col}"]`);
      if (cell) cells.push(cell);
    }
  }

  cells.forEach((cell) => {
    const computerGameboard = document.getElementById('computerGameboard');
    if (gameboard === computerGameboard) {
      cell.classList.remove('bg-rose-700');
      cell.classList.add('bg-rose-300');
    } else {
      cell.classList.remove('bg-blue-700');
      cell.classList.add('bg-blue-300');
    }

    cell.textContent = shipNumber;
    cell.dataset.type = 'ship';
  });
}
