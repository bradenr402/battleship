export default function awaitUserClick(element) {
  return new Promise((resolve) =>
    element.addEventListener('click', (event) => resolve(event), { once: true }),
  );
}
