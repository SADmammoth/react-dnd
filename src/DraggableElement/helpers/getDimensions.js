export default function getDimensions(element) {
  const { left, top, width, height } = element.getBoundingClientRect();

  return { left, top, width, height };
}
