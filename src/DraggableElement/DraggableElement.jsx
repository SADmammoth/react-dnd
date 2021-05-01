import React, { useEffect, useReducer, useRef, useMemo } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import snapToDropArea from "./helpers/snapToDropArea";
import moveElementToCenterCursor from "./helpers/moveElementToCenterCursor";
import draggableElementReducer, {
  actionTypes,
  init,
} from "./helpers/draggableElementReducer";
import setDragImage from "./helpers/setDragImage";
import setTransferData from "./helpers/setTransferData";
import _ from "lodash";
import dropEffects from "../dropEffects";
import callDropAreaDragStart from "./helpers/callDropAreaDragStart";
import callDropAreaDragEnd from "./helpers/callDropAreaDragEnd";

function DraggableElement({
  className,
  height,
  avatar,
  children,
  style: propsStyle,
  data,
  rootElement,
  onDragStart,
  onReject,
  onDragEnd,
  dropEffect,
}) {
  const dragged = useRef({});
  const [state, dispatch] = useReducer(draggableElementReducer, init);

  const mouseMove = (e) => {
    dispatch({
      type: actionTypes.MOVE,
      payload: { x: e.clientX, y: e.clientY },
    });
    dispatch(snapToDropArea(dragged.current));
  };

  const dragStart = (e) => {
    setDragImage(e);
    setTransferData(e, { ...data, height, dropEffect });

    dispatch({
      type: actionTypes.START_DRAG,
      payload: { x: e.clientX, y: e.clientY },
    });

    onDragStart(data, height);
  };

  const dragEnd = (e) => {
    dispatch({ type: actionTypes.END_DRAG });

    callDropAreaDragEnd();

    if (e.dataTransfer.dropEffect === dropEffects.none) {
      onReject(data, height);
    } else {
      onDragEnd(data, height);
    }
  };

  useEffect(() => {
    if (state.dragging) rootElement.addEventListener("dragover", mouseMove);
    return () => rootElement.removeEventListener("dragover", mouseMove);
  }, [state.dragging]);

  useEffect(() => {
    if (state.dragging) {
      dispatch(moveElementToCenterCursor(dragged.current));
      callDropAreaDragStart();
    }
  }, [state.dragging]);

  const attributes = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(data).filter(([dataKey, dataValue]) =>
          dataKey.startsWith("data-")
        )
      ),
    [data]
  );

  return (
    <div
      ref={dragged}
      id={classNames({ dragging: state.dragging })}
      className={classNames("draggable", className)}
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

DraggableElement.propTypes = {
  data: PropTypes.object,
  dropEffect: PropTypes.string,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  onReject: PropTypes.func,
  style: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
  avatar: PropTypes.element,
  height: PropTypes.number,
  rootElement: PropTypes.object,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

DraggableElement.defaultProps = {
  onReject: () => {},
  onDragStart: () => {},
  onDragEnd: () => {},
  style: {},
  height: 1,
  rootElement: document.getElementById("root"),
  dropEffect: dropEffects.all,
};

export default DraggableElement;
