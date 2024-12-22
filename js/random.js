export { getRandomItem };

function getRandomItem(items) {
  return items.at(Math.random() * items.length);
}
