import './style.css';

import createGameboardDisplay from './create-gameboard-display';
import showGameboard from './show-gameboard';
import startGame from './start-game';

// initiate game
(function () {
  const opponentType = 'computer';

  createGameboardDisplay();
  showGameboard();
  startGame(opponentType);
})();
