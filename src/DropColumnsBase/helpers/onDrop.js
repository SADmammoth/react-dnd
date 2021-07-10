import toLinearIndex from "../../helpers/toLinearIndex";

import dropEffects from "../../dropEffects";
import elementsTypes from "../../elementsTypes";
import onRedrop from "./onRedrop";
import mapHeight from "./mapHeight";

export default function onDrop(
  data,
  body,
  setBody,
  columns,
  reassignAvatar,
  onDataUpdate,
  createAvatar,
  indexKey
) {
  const { height, index, originalIndex } = data;

  let array = [...body];
  array = mapHeight(index, height, columns, array, (item) => ({
    ...item,
    type: elementsTypes.hidden,
  }));

  if (data.dropEffect === dropEffects.reassign) {
    array = onRedrop(
      columns,
      originalIndex,
      index,
      height,
      array,
      reassignAvatar
    );
    onDataUpdate(data, array);
    return;
  }

  const linearIndex = toLinearIndex(index, columns);
  array[linearIndex] = {
    ...array[linearIndex],
    ...createAvatar(data, height),
    type: elementsTypes.avatar,
  };

  setBody(array);
  onDataUpdate(data, array);
}
