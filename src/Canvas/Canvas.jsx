import React, { useRef, useState, useEffect } from 'react';

import getPositionOnCanvas from './helpers/getPositionOnCanvas';

import Grid from './Grid';

import PropTypes from 'prop-types';

const Canvas = React.forwardRef(
  ({ items = [], size, resolution, showGrid }, forwardedRef) => {
    const [actualSize, setActualSize] = useState({});

    useEffect(() => {
      if (forwardedRef.current) {
        const {
          width,
          height,
          left,
          top,
        } = forwardedRef.current.getBoundingClientRect();

        setActualSize({ x: width, y: height, left, top });
      }
    }, [forwardedRef.current, items]);

    const renderedItems = items.map(({ position, content }) => {
      const canvasPosition = getPositionOnCanvas(
        position,
        actualSize,
        resolution,
      );
      let x, y;

      if (canvasPosition) {
        ({ x, y } = canvasPosition);
      }
      return (
        <div
          style={{
            position: 'absolute',
            left: x,
            top: y,
          }}>
          {content}
        </div>
      );
    });

    return (
      <div
        ref={forwardedRef}
        style={{
          position: 'relative',
          background: 'white',
          width: size.x,
          height: size.y,
        }}>
        {!showGrid || !resolution || (
          <Grid
            width={parseInt(actualSize.x)}
            height={parseInt(actualSize.y)}
            resolution={resolution}
          />
        )}
        {renderedItems}
      </div>
    );
  },
);

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
