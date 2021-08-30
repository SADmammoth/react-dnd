export default function calcCellWidth(size, resolution) {
  return { x: size.x / resolution.x, y: size.y / resolution.y };
}
