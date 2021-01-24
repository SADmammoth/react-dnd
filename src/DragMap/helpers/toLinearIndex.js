export default function toLinearIndex(index, columns) {
  return index.x * columns + index.y
}
