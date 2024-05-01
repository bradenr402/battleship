export default function highlightCells(gameboard, [row, col], shipLength, direction, shipNumber) {
  const clickedCell = gameboard.querySelector(`[data-row="${row}"][data-col="${col}"]`);

  const cells = [clickedCell];

  if (direction === 'horizontal') {
    for (let i = 0; i < shipLength; i++) {
      const cell = gameboard.querySelector(`[data-row="${row}"][data-col="${col + i}"]`);
      if (cell) cells.push(cell);
    }
  } else {
    for (let i = 0; i < shipLength; i++) {
      const cell = gameboard.querySelector(`[data-row="${row + i}"][data-col="${col}"]`);
      if (cell) cells.push(cell);
    }
  }

  cells.forEach((cell) => {
    const computerGameboard = document.getElementById('computerGameboard');
    if (gameboard === computerGameboard) cell.classList.add('bg-rose-200');
    else cell.classList.add('bg-blue-200');

    cell.textContent = shipNumber;
  });
}
