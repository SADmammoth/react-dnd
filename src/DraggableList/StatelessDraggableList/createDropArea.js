import React from "react";

import ListDropArea from "./ListDropArea";

export default function createDropArea(
  id,
  index,
  onOrderChange,
  accept,
  onSnapped,
  onHovered,
  onUnhovered,
  onDropped,
  style
) {
  return (
    <ListDropArea
      key={id + index}
      id={id + index}
      index={index}
      onOrderChange={onOrderChange}
      accept={accept}
      onSnapped={onSnapped}
      onHovered={onHovered}
      onUnhovered={onUnhovered}
      onDropped={onDropped}
      style={style}
    />
  );
}
