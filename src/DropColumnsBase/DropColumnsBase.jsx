import React, { useCallback, useEffect, useState } from 'react';

import elementsTypes from '../elementsTypes';
import onDrop from './helpers/onDrop';
import drawBody from './drawBody';
import checkSnap from './helpers/checkSnap.js';
import PropTypes from 'prop-types';

const DropColumnsBase = (props) => {
  const [body, setBody] = useState([]);
  const {
    columns,
    rows,
    map,
    reassignAvatar,
    onDataUpdate,
    createAvatar,
    hiddenClass,
    snapToGrid,
    accept,
    indexKey,
    className,
    style,
    onSnapped,
    onHovered,
    onUnhovered,
    onDropped,
  } = props;

  useEffect(() => {
    setBody(map);
  }, [map]);

  const setData = useCallback(
    (data) =>
      onDrop(
        data,
        body,
        setBody,
        columns,
        reassignAvatar,
        onDataUpdate,
        createAvatar,
        indexKey,
      ),
    [body, setBody],
  );

  const checkSnapping = useCallback(
    (index, height, hovered) => checkSnap(index, height, body, rows, hovered),
    [body, columns],
  );

  return (
    <div className={className} style={style}>
      {drawBody(
        body,
        setData,
        snapToGrid ? checkSnapping : () => false,
        hiddenClass,
        accept,

        onSnapped,
        onHovered,
        onUnhovered,
        onDropped,
      )}
    </div>
  );
};

DropColumnsBase.propTypes = {
  columns: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
  map: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
      PropTypes.shape({
        type: PropTypes.oneOf(Object.values(elementsTypes)),
        className: PropTypes.string,
        index: PropTypes.shape({
          x: PropTypes.number,
          y: PropTypes.number,
        }),
        key: PropTypes.string.isRequired,
        avatar: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
        style: PropTypes.object,
      }),
    ]),
  ).isRequired,
  reassignAvatar: PropTypes.func.isRequired,
  onDataUpdate: PropTypes.func.isRequired,
  createAvatar: PropTypes.func.isRequired,
  className: PropTypes.string,
  hiddenClass: PropTypes.string,
  snapToGrid: PropTypes.bool,
  accept: PropTypes.object,
  indexKey: PropTypes.string,
  onSnapped: PropTypes.func,
  onHovered: PropTypes.func,
  onUnhovered: PropTypes.func,
  onDropped: PropTypes.func,
};

DropColumnsBase.defaultProps = {
  snapToGrid: false,
  onSnapped: () => {},
  onHovered: () => {},
  onUnhovered: () => {},
  onDropped: () => {},
  indexKey: 'id',
  snapToGrid: false,
};

export default DropColumnsBase;
