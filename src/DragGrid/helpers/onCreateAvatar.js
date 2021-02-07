import React from "react";

import toLinearIndex from "../../helpers/toLinearIndex";

import elementsTypes from "../../elementsTypes";

import DraggableElement from "../../DraggableElement/DraggableElement";
import removeKeys from "../../helpers/removeKeys";

import dropEffects from "../../dropEffects";
import mapHeight from "../../DragMap/helpers/mapHeight";

const onCreateAvatar = (
  columns,
  rootElement,
  createAvatar,
  indexKey,
  setGrid
) => (data, height) => {
  const avatar = createAvatar(data, height);

  const replaceItemTypeInGrid = (grid, height, index, type) => {
    return mapHeight(
      index,
      height,
      columns,
      grid,
      (item) => ({
        ...item,
        type,
      }),
      false
    );
  };

  const replaceAvatarWithDropArea = ({ index }, height) => {
    setGrid((grid) => {
      const newGrid = replaceItemTypeInGrid(
        grid,
        height,
        index,
        elementsTypes.dropArea
      );

      const ind = toLinearIndex(index, columns);
      newGrid[ind] = removeKeys(newGrid[ind], ["style"]);
      return newGrid;
    });
  };

  const rollback = ({ index }, height) => {
    setGrid((grid) => {
      const newGrid = replaceItemTypeInGrid(
        grid,
        height,
        index,
        elementsTypes.hidden
      );

      const ind = toLinearIndex(index, columns);

      newGrid[ind] = {
        ...newGrid[ind],
        style: {
          gridRow: `${data.index.x + 1} / span ${height}`,
          gridColumn: data.index.y + 1,
        },
      };
      return newGrid;
    });
  };

  return {
    avatar: (
      <DraggableElement
        id={data[indexKey]}
        key={data[indexKey]}
        data={data}
        height={height}
        rootElement={rootElement}
        avatar={avatar}
        dropEffect={dropEffects.reassign}
        onDragStart={replaceAvatarWithDropArea}
        onReject={rollback}
      >
        {avatar}
      </DraggableElement>
    ),
    style: {
      gridRow: data.index.x + 1 + " / span 2",
      gridColumn: data.index.y + 1,
    },
  };
};

export default onCreateAvatar;
