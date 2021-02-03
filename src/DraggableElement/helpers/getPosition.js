export default function getPosition(element) {
  const { left, top, width, height } = element.getBoundingClientRect();

  return { left, top, width, height };
}
