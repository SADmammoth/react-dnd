import React from "react";

import ListDropArea from "./ListDropArea.jsx";

export default function createDropArea(
  id,
  index,
  className,
  style,
  { ...props }
) {
  return (
    <ListDropArea
      key={id + index}
      id={id + index}
      className={className}
      style={style}
      index={index}
      {...props}
    />
  );
}
