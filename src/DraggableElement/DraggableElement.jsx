import React, { useEffect, useReducer, useRef, useCallback } from "react";

import getPosition from "./helpers/getPosition";
import draggableElementReducer, {
  actionTypes,
  init,
} from "./helpers/draggableElementReducer";
import setDragImage from "./helpers/setDragImage";
import setTransferData from "./helpers/setTransferData";

function DraggableElement({
  className,
  height,
  attributes,
  avatar,
  children,
  style: propsStyle,
  data,
}) {
  const dragged = useRef({});
  const [state, dispatch] = useReducer(draggableElementReducer, init);

  const dragStart = (e) => {
    setDragImage(e);
    setTransferData(e, data);

    dispatch({
      type: actionTypes.START_DRAG,
    });
  };
  const dragEnd = () => {
    dispatch({ type: actionTypes.END_DRAG });
  };
  const mouseMove = (e) => {
    dispatch({
      type: actionTypes.SET_POSITION,
      payload: { x: -e.clientX, y: e.clientY },
    });
  };

  useEffect(() => {
    if (state.dragging) {
      document.getElementById("root").addEventListener("dragover", mouseMove);
    } else {
      document
        .getElementById("root")
        .removeEventListener("dragover", mouseMove);
    }
  }, [dragging]);

  return (
    <div
      ref={dragged}
      id={state.dragging ? "dragging" : ""}
      className={`draggable ${className || ""}`}
      draggable="true"
      style={{ ...propsStyle, ...state.style }}
      data-height={height}
      onDragStart={dragStart}
      onDragEnd={dragEnd}
      {...attributes}
    >
      {state.dragging && avatar ? avatar : children}
    </div>
  );
}

DraggableElement.propTypes = {};

export default DraggableElement;
