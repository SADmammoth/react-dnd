import React from 'react';
import PropTypes from 'prop-types';
import Canvas from '../Canvas';

function DropCanvas(props) {
  return (
    <Canvas
      size={{ x: '700px', y: '400px' }}
      items={[
        {
          position: {
            x: '100px',
            y: '100px',
          },
          content: (
            <div
              style={{ background: 'green', width: '100px', height: '50px' }}>
              Text
            </div>
          ),
        },
      ]}
    />
  );
}

DropCanvas.propTypes = {};

export default DropCanvas;
