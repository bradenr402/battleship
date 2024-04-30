export default function showGameboard() {
  const gameboardContainer = document.getElementById('gameboardContainer');

  if (![...gameboardContainer.classList].includes('duration-1000')) {
    gameboardContainer.classList.add('duration-1000');
  }

  gameboardContainer.classList.remove('invisible');
  gameboardContainer.classList.add('visible');
  gameboardContainer.classList.remove('opacity-0');
  gameboardContainer.classList.add('opacity-100');
}
