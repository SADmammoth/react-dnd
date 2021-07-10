import toLinearIndex from '../../helpers/toLinearIndex';
import elementsTypes from '../../elementsTypes';

export default function mapHeight(
  index,
  height,
  rows,
  array,
  action,
  checkIsSpaceAvailable = true,
) {
  const newArray = [...array];

  let curr = null;
  let indBuff;
  for (let i = index.y + 1; i < index.y + height; i++) {
    indBuff = toLinearIndex({ x: index.x, y: i }, rows);

    curr = newArray[indBuff];

    if (
      checkIsSpaceAvailable &&
      (!curr || curr.type !== elementsTypes.dropArea)
    ) {
      return false;
    }

    if (action) newArray[indBuff] = action(curr, indBuff, newArray);
  }

  return action ? newArray : true;
}
