import React, { useCallback, useState } from "react";

import useList from "./useList";
import PropTypes from "prop-types";
import StatelessDraggableList from "./StatelessDraggableList";

function DraggableList({
  list,
  onOrderChange,
  id,
  indexKey,
  accept,
  dropAreaStyle,
  onSnapped,
  onHovered,
  onUnhovered,
  onDropped,
}) {
  const [items, dragging, reorderList] = useList(list);

  const reorderItems = useCallback(
    ({ [indexKey]: sourceId, index: destinationIndex }) => {
      onOrderChange(reorderList(sourceId, destinationIndex));
    },
    [items]
  );

  return (
    <StatelessDraggableList
      id={id}
      list={items}
      onOrderChange={reorderItems}
      dragging={dragging}
      accept={accept}
      onSnapped={onSnapped}
      onHovered={onHovered}
      onUnhovered={onUnhovered}
      onDropped={onDropped}
      dropAreaStyle={dropAreaStyle}
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
};

DraggableList.defaultProps = {
  onOrderChange: () => {},
};

export default DraggableList;
