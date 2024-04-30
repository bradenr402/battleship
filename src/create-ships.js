import createComputerShips from './create-computer-ships';
import createPlayerShips from './create-player-ships';

export default async function createShips(player) {
  if (player.type === 'human') await createPlayerShips(player);
  else createComputerShips(player);
}
