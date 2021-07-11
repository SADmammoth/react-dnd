import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Canvas({ items = [], size, resolution, showGrid }) {
  const canvas = useRef({});

  const [actualSize, setActualSize] = useState({});

  useEffect(() => {
    if (canvas.current) {
      const {
        width,
        height,
        left,
        top,
      } = canvas.current.getBoundingClientRect();

      setActualSize({ x: width, y: height, left, top });
    }
  }, [canvas.current, items]);

  const renderedItems = items.map(
    ({ position: { x, y, clientX, clientY }, content }) => {
      let actualX = x;
      let actualY = y;

      if (clientX && clientY) {
        console.log(actualSize, clientX, clientY);
        actualX = clientX - actualSize.left;
        actualY = clientY - actualSize.top;
      } else if (resolution) {
        if (x >= resolution.x || y >= resolution.y) {
          return;
        }
        actualX = (actualSize.x / resolution.x) * x;
        actualY = (actualSize.y / resolution.y) * y;
      } else {
        if (x >= size.x || y >= size.y) {
          return;
        }
      }
      return (
        <div
          style={{
            position: 'absolute',
            left: actualX,
            top: actualY,
          }}>
          {content}
        </div>
      );
    },
  );

  return (
    <div
      ref={canvas}
      style={{
        position: 'relative',
        background: 'white',
        width: size.x,
        height: size.y,
      }}>
      {!showGrid || (
        <div
          style={{
            height: '100%',
            display: 'grid',
            grid: `repeat(${resolution.x}, 1fr) / repeat(${resolution.y}, 1fr)`,
          }}>
          {new Array(resolution.x * resolution.y).fill(
            <div style={{ border: '1px solid lightgray' }}></div>,
          )}
        </div>
      )}

      {renderedItems}
    </div>
  );
}

Canvas.propTypes = {
  items: PropTypes.shape({
    position: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }),
    content: PropTypes.any,
  }).isRequired,
  size: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  resolution: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default Canvas;
