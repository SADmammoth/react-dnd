import mapHeight from "./mapHeight";

export default function checkSnap(
  index,
  height,
  body,
  columns,
  hovered,
  useHeight = true
) {
  if (!useHeight) {
    return hovered;
  }

  return mapHeight(index, height, columns, body);
}
