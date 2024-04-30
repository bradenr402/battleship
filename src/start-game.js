import { Player } from './player';
import createShips from './create-ships';

export default async function startGame(opponentType) {
  console.log('game started');
  const player1 = new Player('human');
  await createShips(player1);

  const player2 = new Player(opponentType);
  await createShips(player2);
}
