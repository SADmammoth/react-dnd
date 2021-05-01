import React, { useState, useCallback, useEffect } from "react";

import classNames from "classnames";

import getDraggingElement from "./helpers/getDraggingElement";

import checkIfAccepted from "./helpers/checkIfAccepted";

import useDropHandler from "./helpers/useDropHandler";

import useDragLeaveHandler from "./helpers/useDragLeaveHandler";
import useDragOverHandler from "./helpers/useDragOverHandler";
import PropTypes from "prop-types";
import _ from "lodash";

const DropArea = (props) => {
  const [hovered, setHovered] = useState(false);

  const {
    checkSnap,
    index,
    setData,
    className,
    style,
    children,
    accept,
    onHovered,
    onSnapped,
    onUnhovered,
    onDropped,
    onAcceptedDragStart,
  } = props;

  const [styleState, setStyle] = useState(style);

  const mergeStyle = (newStyle) =>
    setStyle((styleState) => _.merge({ ...styleState }, { ...newStyle }));

  useEffect(() => {
    setStyle(style);
  }, [style]);

  const onDragOver = useDragOverHandler(
    accept,
    index,
    mergeStyle,
    hovered,
    setHovered,
    checkSnap,
    onSnapped
  );

  const onDragLeave = useDragLeaveHandler(
    hovered,
    index,
    setHovered,
    mergeStyle,
    onUnhovered
  );

  const onDrop = useDropHandler(
    hovered,
    setHovered,
    accept,
    index,
    mergeStyle,
    setData,
    onDropped
  );

  const onDragEnter = useCallback(() => {
    const dragging = getDraggingElement();
    const accepted = checkIfAccepted(dragging, accept);
    onHovered(dragging, index, accepted, mergeStyle);
  }, [index, accept]);

  const onAcceptedDragStartHandler = useCallback(() => {
    if (!onAcceptedDragStart) return;
    const dragging = getDraggingElement();
    const accepted = checkIfAccepted(dragging, accept || {});

    onAcceptedDragStart(dragging, index, accepted, mergeStyle);
  });

  return (
    <div
      className={classNames(className, { hovered: hovered }, "drop-area")}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onDragStart={onAcceptedDragStartHandler}
      style={styleState}
    >
      {children}
    </div>
  );
};

DropArea.propTypes = {
  className: PropTypes.string,
  index: PropTypes.shape({ x: PropTypes.number, y: PropTypes.number })
    .isRequired,
  setData: PropTypes.func.isRequired,
  checkSnap: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  style: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  accept: PropTypes.object,
  onSnapped: PropTypes.func,
  onHovered: PropTypes.func,
  onUnhovered: PropTypes.func,
  onDropped: PropTypes.func,
};

DropArea.defaultProps = {
  accept: {},
  onSnapped: () => {},
  onHovered: () => {},
  onUnhovered: () => {},
  onDropped: () => {},
};

export default DropArea;
