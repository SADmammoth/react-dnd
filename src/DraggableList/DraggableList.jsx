import React, { useCallback, useEffect, useState } from "react";

import useList from "./useList";
import PropTypes from "prop-types";
import StatelessDraggableList from "./StatelessDraggableList";
import calcDropAreaStyle from "./helpers/calcDropAreaStyle";

function DraggableList({
  list,
  onOrderChange,
  id,
  indexKey,
  accept,
  onSnapped,
  onHovered,
  onUnhovered,
  onDropped,
  orientation,
  dropAreaSize,
  dropAreaStyle,
  gap,
}) {
  const [items, setItems, dragging, reorderList] = useList(list);

  const reorderItems = useCallback(
    ({ [indexKey]: sourceId, index: destinationIndex }) => {
      onOrderChange(reorderList(sourceId, destinationIndex));
    },
    [items]
  );

  const handlerWrapper = (handlerFromProps, isHovered) => (
    dragging,
    index,
    accepted,
    mergeStyle
  ) => {
    if (accepted) {
      mergeStyle(
        calcDropAreaStyle(isHovered, dropAreaSize, gap, orientation, dragging)
      );

      handlerFromProps(dragging, index, accepted, mergeStyle);
    }
  };

  const getDefaultDropAreaStyles = () =>
    calcDropAreaStyle(false, dropAreaSize, gap, orientation, dragging);

  useEffect(() => {
    setItems(list);
  }, [list]);

  return (
    <StatelessDraggableList
      id={id}
      list={items}
      onOrderChange={reorderItems}
      dragging={dragging}
      accept={accept}
      onSnapped={onSnapped}
      onHovered={handlerWrapper(onHovered, true)}
      onUnhovered={handlerWrapper(onUnhovered, false)}
      onDropped={handlerWrapper(onDropped, false)}
      dropAreaStyle={{
        ...dropAreaStyle,
        ...getDefaultDropAreaStyles(),
      }}
    />
  );
}

DraggableList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.func]))
    .isRequired,
  onOrderChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  indexKey: PropTypes.string.isRequired,
  accept: PropTypes.object,
  dropAreaStyle: PropTypes.object,
  onSnapped: PropTypes.func,
  onHovered: PropTypes.func,
  onUnhovered: PropTypes.func,
  onDropped: PropTypes.func,
  orientation: PropTypes.oneOf(["vertical", "horizontal"]),
  dropAreaSize: PropTypes.string,
  gap: PropTypes.string,
};

DraggableList.defaultProps = {
  onOrderChange: () => {},
  onSnapped: () => {},
  onHovered: () => {},
  onUnhovered: () => {},
  onDropped: () => {},
  orientation: "vertical",
};

export default DraggableList;
