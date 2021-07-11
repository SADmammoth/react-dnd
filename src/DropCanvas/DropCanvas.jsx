import React, { useReducer } from 'react';

import DropArea from '../DropArea';

import canvasReducer from './canvasReducer';

import PropTypes from 'prop-types';
import Canvas from '../Canvas';

function DropCanvas({ createAvatar, showGrid, indexKey }) {
  const [canvas, dispatch] = useReducer(canvasReducer);
  return (
    <DropArea
      onHovered={() => {}}
      setData={() => {}}
      onDropped={(data, _1, _2, _3, dragging, event) => {
        console.log(dragging);
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
        size={{ x: '700px', y: '400px' }}
        resolution={{ x: 100, y: 100 }}
        items={Object.values(canvas || {})}
        showGrid={showGrid}
      />
    </DropArea>
  );
}

DropCanvas.propTypes = {};

export default DropCanvas;
