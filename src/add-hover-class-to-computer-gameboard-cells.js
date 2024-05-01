export default function addHoverClassToComputerGameboardCells() {
  const computerGameboard = document.getElementById('computerGameboard');
  const rows = [...computerGameboard.children];

  rows.forEach((row) => {
    const cells = [...row.children];

    cells.forEach((cell) => {
      cell.classList.add('hover:bg-rose-400', 'cursor-crosshair');
    });
  });
}
