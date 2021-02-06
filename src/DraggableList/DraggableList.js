import React, { useCallback, useState } from "react";

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
  dropAreaHeight,
  dropAreaStyle,
  gap,
}) {
  const [items, dragging, reorderList] = useList(list);

  const reorderItems = useCallback(
    ({ [indexKey]: sourceId, index: destinationIndex }) => {
      console.log(sourceId, destinationIndex);
      onOrderChange(reorderList(sourceId, destinationIndex));
    },
    [items]
  );

  const [hoveredDropAreaStyle, setHoveredDropAreaStyle] = useState({});

  const getDefaultDropAreaStyle = () => {
    return {
      marginTop: `calc(-1 * ${dropAreaHeight} / 2 - ${gap})`,
      marginBottom: `calc(-1 * ${dropAreaHeight} / 2))`,
      height: 0,
      paddingTop: `calc(${dropAreaHeight} / 2 + (${gap} * 2))`,
    };
  };

  const onHoveredHandler = (dragging, index, accepted, mergeStyle) => {
    if (accepted) {
      mergeStyle(calcDropAreaStyle(dragging, dropAreaHeight, gap, orientation));

      onHovered(dragging, index, accepted, mergeStyle);
    }
  };

  const onUnhoveredHandler = (dragging, index, accepted, mergeStyle) => {
    if (accepted) {
      mergeStyle(getDefaultDropAreaStyle());

      onUnhovered(dragging, index, accepted, mergeStyle);
    }
  };

  const onDroppedHandler = (dragging, index, accepted, mergeStyle) => {
    if (accepted) {
      mergeStyle(getDefaultDropAreaStyle());

      onDropped(dragging, index, accepted, mergeStyle);
    }
  };

  return (
    <StatelessDraggableList
      id={id}
      list={items}
      onOrderChange={reorderItems}
      dragging={dragging}
      accept={accept}
      onSnapped={onSnapped}
      onHovered={onHoveredHandler}
      onUnhovered={onUnhoveredHandler}
      onDropped={onDroppedHandler}
      dropAreaStyle={{
        ...dropAreaStyle,
        ...getDefaultDropAreaStyle(),
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
  dropAreaHeight: PropTypes.string,
};

DraggableList.defaultProps = {
  onOrderChange: () => {},
  onSnapped: () => {},
  onHovered: () => {},
  onUnhovered: () => {},
  onDropped: () => {},
};

export default DraggableList;
