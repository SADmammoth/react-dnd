import React, { useReducer } from 'react';

import DropArea from '../DropArea';

import canvasReducer from './canvasReducer';

import PropTypes from 'prop-types';
import Canvas from '../Canvas';

function DropCanvas({ createAvatar }) {
  const [canvas, dispatch] = useReducer(canvasReducer);
  return (
    <DropArea
      onHovered={() => {}}
      setData={() => {}}
      onDropped={(data, _1, _2, _3, _4, event) => {
        dispatch({
          type: 'PLACE',
          data: {
            position: {
              clientX: event.pageX,
              clientY: event.pageY,
            },
            content: createAvatar(data),
          },
        });
      }}>
      <Canvas
        size={{ x: '700px', y: '400px' }}
        //   resolution={{ x: 1000, y: 1000 }}
        items={Object.values(canvas || {})}
      />
    </DropArea>
  );
}

DropCanvas.propTypes = {};

export default DropCanvas;
