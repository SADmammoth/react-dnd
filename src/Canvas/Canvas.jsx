import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Canvas({ items, size, resolution }) {
  const canvas = useRef({});

  const [actualSize, setActualSize] = useState({});

  useEffect(() => {
    if (canvas.current) {
      const { width, height } = canvas.current.getBoundingClientRect();
      setActualSize({ x: width, y: height });
    }
  }, [canvas.current]);

  const renderedItems = items.map(({ position: { x, y }, content }) => {
    if (x >= resolution.x || y >= resolution.y) {
      return;
    }
    const actualX = (actualSize.x / resolution.x) * x;
    const actualY = (actualSize.y / resolution.y) * y;
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
  });

  return (
    <div
      ref={canvas}
      style={{
        position: 'relative',
        background: 'white',
        width: size.x,
        height: size.y,
        display: 'grid',
        grid: `repeat(${resolution.x}, 1fr) / repeat(${resolution.y}, 1fr)`,
      }}>
      {new Array(resolution.x * resolution.y).fill(
        <div style={{ border: '1px solid black' }}></div>,
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
