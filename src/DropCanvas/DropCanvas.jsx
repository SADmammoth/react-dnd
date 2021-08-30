import React, { useReducer, useRef, useCallback } from 'react';

import checkSnap from './helpers/checkSnap';

import DropArea from '../DropArea';

import canvasReducer from './helpers/canvasReducer';

import PropTypes from 'prop-types';
import Canvas from '../Canvas';

function DropCanvas({ createAvatar, showGrid, indexKey, size, resolution }) {
  const [canvas, dispatch] = useReducer(canvasReducer);
  const canvasRef = useRef({});

  const checkSnapHandler = useCallback(
    (_1, _2, _3, event) => {
      if (canvasRef.current) {
        const {
          width,
          height,
          left,
          top,
        } = canvasRef.current.getBoundingClientRect();
        return checkSnap(
          {
            x: event.clientX - left,
            y: event.clientY - top,
          },
          { x: width, y: height },
          resolution,
        );
      }
    },
    [canvasRef.current],
  );
  return (
    <DropArea
      checkSnap={checkSnapHandler}
      onHovered={() => {}}
      setData={() => {}}
      onDropped={(data, _1, _2, _3, dragging, event) => {
        const { width, height } = dragging.getBoundingClientRect();
        const clientX = event.pageX - width / 2;
        const clientY = event.pageY - height / 2;
        dispatch({
          type: 'PLACE',
          data: {
            id: data[indexKey],
            position: {
              clientX,
              clientY,
            },
            content: createAvatar(data),
          },
        });
      }}>
      <Canvas
        ref={canvasRef}
        size={size}
        resolution={resolution}
        items={Object.values(canvas || {})}
        showGrid={showGrid}
      />
    </DropArea>
  );
}

DropCanvas.propTypes = {};

export default DropCanvas;
