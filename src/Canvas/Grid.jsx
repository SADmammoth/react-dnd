import React, { useEffect, useRef } from 'react';

import drawGrid from './helpers/drawGrid';

import PropTypes from 'prop-types';

function Grid({ resolution, width, height }) {
  const canvas = useRef({});
  useEffect(() => {
    const ctx = canvas.current.getContext('2d');
    ctx.fillStyle = 'white';
    drawGrid(ctx, resolution);
  }, [resolution]);
  return <canvas width={width} height={height} ref={canvas} />;
}

Grid.propTypes = {};

export default Grid;
