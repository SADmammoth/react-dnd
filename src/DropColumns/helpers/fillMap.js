import elementsTypes from '../../elementsTypes';

export default function fillMap(map, columns, rows, dropareaDefaultClassName) {
  if (!map || !map.length) {
    const newMap = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        newMap.push({
          id: '' + x + y,
          className: dropareaDefaultClassName,
          type: elementsTypes.dropArea,
          index: { x, y },
        });
      }
    }

    return newMap;
  }

  if (map.length === columns * rows) {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < columns; x++) {
        newMap.push({
          id: '' + x + y,
          className: dropareaDefaultClassName,
          type: elementsTypes.dropArea,
          index: { x, y },
        });
      }
    }

    return newMap;
  }

  return map;
}
