import React from "react";

import ListDropArea from "./ListDropArea";

export default function createDropArea(id, index, onOrderChange, accept) {
  return (
    <ListDropArea
      key={id + index}
      id={id + index}
      index={index}
      onOrderChange={onOrderChange}
      accept={accept}
    />
  );
}
