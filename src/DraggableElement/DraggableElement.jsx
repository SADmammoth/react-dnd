import React, { useEffect, useReducer, useRef, useCallback } from "react";

import moveElementToCenterCursor from "./helpers/moveElementToCenterCursor";

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
  rootElement,
}) {
  const dragged = useRef({});
  const [state, dispatch] = useReducer(draggableElementReducer, {});

  const mouseMove = (e) => {
    dispatch({
      type: actionTypes.SET_POSITION,
      payload: { x: e.clientX, y: e.clientY },
    });
  };

  useEffect(() => {
    if (state.dragging) rootElement.addEventListener("dragover", mouseMove);
    return () => rootElement.removeEventListener("dragover", mouseMove);
  }, [state.dragging]);

  useEffect(() => {
    if (state.dragging) {
      dispatch(moveElementToCenterCursor(dragged.current));
    }
  }, [state.dragging]);

  const dragStart = (e) => {
    setDragImage(e);
    setTransferData(e, data);

    dispatch({
      type: actionTypes.START_DRAG,
      payload: { x: e.clientX, y: e.clientY },
    });
  };

  const dragEnd = () => {
    dispatch({ type: actionTypes.END_DRAG });
  };

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
