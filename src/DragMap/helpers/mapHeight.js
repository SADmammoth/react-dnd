import toLinearIndex from "./toLinearIndex";

export default function mapHeight(
  index,
  height,
  columns,
  array,
  action,
  checkIsSpaceAvailable = true
) {
  const newArray = [...array];

  let curr = null;
  let indBuff;
  for (let i = index.x + 1; i < index.x + height; i++) {
    indBuff = toLinearIndex({ x: i, y: index.y }, columns);

    curr = newArray[indBuff];

    if (
      checkIsSpaceAvailable &&
      !curr &&
      curr.type !== elementsTypes.dropArea
    ) {
      return;
    }

    newArray[indBuff] = action(curr, indBuff, newArray);
  }

  return newArray;
}
