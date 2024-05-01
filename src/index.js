import './style.css';

import createGameboardDisplay from './create-gameboard-display';
import showGameboard from './show-gameboard';
import startGame from './start-game';

function initiateGame() {
  const opponentType = 'computer';

  createGameboardDisplay();
  showGameboard();
  startGame(opponentType);
}

const startGameBtn = document.getElementById('startGameBtn');
startGameBtn.addEventListener('click', () => {
  document.getElementById('startGamePopup').classList.add('hidden');
  initiateGame();
});
