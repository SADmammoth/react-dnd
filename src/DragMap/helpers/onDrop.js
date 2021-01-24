import toLinearIndex from './toLinearIndex'
import elementsTypes from '../../elementsTypes'

export default function onDrop(
  data,
  body,
  setBody,
  columns,
  reassignAvatar,
  onDataUpdate,
  createAvatar
) {
  const { height, index, originalIndex } = data
  const array = [...body]
  let curr = null

  let indBuff

  for (let i = index.x; i < index.x + height; i++) {
    indBuff = toLinearIndex({ x: i, y: index.y }, columns)

    curr = array[indBuff]

    if (!curr && curr.type !== elementsTypes.dropArea) {
      return
    }

    array[indBuff] = { ...array[indBuff], type: elementsTypes.hidden }
  }

  if (data.dropEffect === 'reassign') {
    reassignAvatar(originalIndex, index, height)
    onDataUpdate(data)
    return
  }

  array[toLinearIndex(index)] = {
    type: elementsTypes.avatar,
    avatar: createAvatar(data, height)
  }

  setBody(array)
  onDataUpdate(data)
}
