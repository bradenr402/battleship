import './style.css';

import addHoverClassToComputerGameboardCells from './add-hover-class-to-computer-gameboard-cells';
import createGameboardDisplay from './create-gameboard-display';
import showGameboard from './show-gameboard';
import startGame from './start-game';

async function initiateGame() {
  const opponentType = 'computer';

  createGameboardDisplay();
  showGameboard();
  await startGame(opponentType);
  addHoverClassToComputerGameboardCells();
}

const startGameBtn = document.getElementById('startGameBtn');
startGameBtn.addEventListener('click', () => {
  document.getElementById('startGamePopup').classList.add('hidden');
  initiateGame();
});
