import React, { useState, useCallback } from "react";
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
  } = props;

  const [styleState, setStyle] = useState(style);

  const mergeStyle = (newStyle) =>
    setStyle((styleState) => _.merge({ ...styleState }, { ...newStyle }));

  const onDragOver = useCallback(
    (e) => {
      const dragging = document.getElementById("dragging");

      if (!dragging) {
        return;
      }

      const accepted = !Object.entries(accept).some(([key, value]) => {
        if (key.startsWith("data-")) {
          return dragging.getAttribute(key) !== value;
        }
      });

      onHovered(dragging, index, accepted, mergeStyle);

      if (accepted) {
        setHovered(true);
        e.preventDefault();

        if (
          checkSnap &&
          dragging &&
          !dragging.hasAttribute("data-snap") &&
          checkSnap(
            index,
            parseInt(dragging.getAttribute("data-height")),
            hovered
          )
        ) {
          const { left, top } = e.target.getBoundingClientRect();
          const snapLeft =
            left +
            window.scrollX +
            parseInt(getComputedStyle(e.target).paddingLeft);
          const snapTop =
            top +
            window.scrollY +
            parseInt(getComputedStyle(e.target).paddingTop);

          onSnapped(dragging, left, top, mergeStyle);

          dragging.setAttribute("data-snap", `${snapLeft},${snapTop}`);
        }

        e.dataTransfer.dropEffect = "all";
        return true;
      }

      e.dataTransfer.dropEffect = "none";
      e.preventDefault();
      return false;
    },
    [accept, hovered]
  );

  const onDragLeave = useCallback(() => {
    const dragging = document.getElementById("dragging");

    onUnhovered(dragging, index, hovered, mergeStyle);

    if (hovered) {
      setHovered(false);
      if (dragging) dragging.removeAttribute("data-snap");
    }
  }, [hovered]);

  const onDrop = useCallback(
    (e) => {
      if (hovered) {
        setHovered(false);
        const data = JSON.parse(e.dataTransfer.getData("application/json"));

        const accepted = !Object.entries(accept).some(([key, value]) => {
          if (!key.startsWith("data-")) {
            return data[key] !== value;
          }
        });

        onDropped(data, index, accepted, mergeStyle);

        if (accepted) {
          const { index: originalIndex } = data;
          setData({
            ...data,
            index,
            originalIndex,
          });
        }

        return accepted;
      }
      return false;
    },
    [hovered]
  );

  return (
    <div
      className={`${className}${hovered ? " hovered" : ""}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
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
