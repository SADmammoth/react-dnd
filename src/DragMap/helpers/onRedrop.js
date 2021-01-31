import toLinearIndex from "./toLinearIndex";

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
  const { avatar, ...bodyItem } = newBody[
    toLinearIndex(originalIndex, columns)
  ];

  newBody.splice(toLinearIndex(originalIndex, columns), 1, {
    ...bodyItem,
    type: elementsTypes.dropArea
  });
  newBody.splice(toLinearIndex(index, columns), 1, {
    ...newBody[toLinearIndex(index, columns)],
    type: elementsTypes.avatar,
    avatar
  });

  return onReassign(newBody, originalIndex, index, height);
}
