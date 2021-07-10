import toLinearIndex from "../../helpers/toLinearIndex";

import elementsTypes from "../../elementsTypes";

export default function onRedrop(
  columns,
  originalIndex,
  index,
  height,
  array,
  onReassign
) {
  const newBody = [...array];
  const originalInd = toLinearIndex(originalIndex, columns);

  const { avatar, ...bodyItem } = newBody[originalInd];

  newBody.splice(originalInd, 1, {
    ...bodyItem,
    type: elementsTypes.dropArea,
  });

  const ind = toLinearIndex(index, columns);
  newBody.splice(ind, 1, {
    ...newBody[ind],
    type: elementsTypes.avatar,
    avatar,
  });

  return onReassign(newBody, originalIndex, index, height);
}
