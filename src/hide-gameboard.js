export default function hideGameboard() {
  const gameboardContainer = document.getElementById('gameboardContainer');
  gameboardContainer.classList.remove('visible');
  gameboardContainer.classList.add('invisible');
  gameboardContainer.classList.remove('opacity-100');
  gameboardContainer.classList.add('opacity-0');
}
