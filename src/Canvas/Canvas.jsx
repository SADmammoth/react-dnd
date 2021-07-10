import React from 'react';
import PropTypes from 'prop-types';

function Canvas({ items, size, resolution }) {
  const renderedItems = items.map(({ position: { x, y }, content }) => {
    return (
      <div style={{ position: 'absolute', left: x, top: y }}>{content}</div>
    );
  });
  return (
    <div
      style={{
        position: 'relative',
        background: 'white',
        width: size.x,
        height: size.y,
      }}>
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
