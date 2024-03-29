import React from "react";

export default function draggingStateProxy(items, setDragging, onReject) {
  return items.map((item) =>
    React.cloneElement(item, {
      ...item.props,
      onDragStart: (...args) => {
        setDragging(item.props.id);
        item.props.onDragStart(...args);
      },
      onDragEnd: (...args) => {
        setDragging(null);
        item.props.onDragEnd(...args);
      },
      onReject: (...args) => {
        onReject();
        setDragging(null);
        item.props.onReject(...args);
      },
    })
  );
}
