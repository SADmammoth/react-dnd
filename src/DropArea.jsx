import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";

const DropArea = props => {
  const [hovered, setHovered] = useState(false);

  const {
    checkSnap,
    index,
    setData,
    className,
    style,
    children,
    accept
  } = props;

  const onDragOver = useCallback(
    e => {
      const dragging = document.getElementById("dragging");

      if (!dragging) {
        return;
      }

      const accepted = !Object.entries(accept).some(([key, value]) => {
        if (key.startsWith("data-")) {
          return dragging.getAttribute(key) !== value;
        }
      });

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

          dragging.setAttribute(
            "data-snap",
            `${left +
              window.scrollX +
              parseInt(getComputedStyle(e.target).paddingLeft)},${top +
              window.scrollY +
              parseInt(getComputedStyle(e.target).paddingTop)}`
          );
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
    if (hovered) {
      setHovered(false);
      const dragging = document.getElementById("dragging");
      if (dragging) dragging.removeAttribute("data-snap");
    }
  }, [hovered]);

  const onDrop = useCallback(
    e => {
      if (hovered) {
        setHovered(false);
        const data = JSON.parse(e.dataTransfer.getData("application/json"));

        const accepted = !Object.entries(accept).some(([key, value]) => {
          if (!key.startsWith("data-")) {
            return data[key] !== value;
          }
        });

        if (accepted) {
          const { index: originalIndex } = data;
          setData({
            ...data,
            index,
            originalIndex
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
      style={style}
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
  accept: PropTypes.object
};

DropArea.defaultProps = {
  accept: {}
};

export default DropArea;
