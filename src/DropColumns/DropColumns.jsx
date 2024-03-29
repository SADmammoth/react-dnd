import React, { useEffect, useState } from 'react';
import DropColumnsBase from '../DropColumnsBase';
import PropTypes from 'prop-types';
import removeKeys from '../helpers/removeKeys';
import onCreateAvatar from './helpers/onCreateAvatar';
import toLinearIndex from '../helpers/toLinearIndex';
import fillMap from './helpers/fillMap';

function DropColumns({
  map,
  indexKey,
  columns,
  rows,
  createAvatar,
  rootElement,

  onSnapped,
  onHovered,
  onUnhovered,
  onDropped,

  dropareaDefaultClassName,

  ...props
}) {
  const [grid, setGrid] = useState(map);

  useEffect(() => {
    setGrid(fillMap(map, columns, rows, dropareaDefaultClassName));
  }, [map]);

  const createAvatarHandler = onCreateAvatar(
    columns,
    rootElement,
    createAvatar,
    indexKey,
    setGrid,
  );

  const reassignAvatar = (body, _, index, height) => {
    const newBody = [...body];
    const linearIndex = toLinearIndex(index, columns);
    const data = removeKeys(
      newBody[linearIndex].avatar && newBody[linearIndex].avatar.props.data,
      ['originalIndex'],
    );

    newBody.splice(linearIndex, 1, {
      ...newBody[linearIndex],
      ...createAvatarHandler({ ...data, index }, height),
    });

    return newBody;
  };

  const style = {
    display: 'grid',
    grid: `repeat(${rows}, 1fr) / repeat(${columns}, 1fr)`,
  };

  const onDataUpdate = (data, array) => {
    setGrid(array);
  };

  return (
    <DropColumnsBase
      {...props}
      map={grid}
      columns={columns}
      rows={rows}
      indexKey={indexKey}
      createAvatar={createAvatarHandler}
      onDataUpdate={onDataUpdate}
      reassignAvatar={reassignAvatar}
      style={style}
      onSnapped={onSnapped}
      onHovered={onHovered}
      onUnhovered={onUnhovered}
      onDropped={onDropped}
    />
  );
}

DropColumns.propTypes = {
  columns: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
  map: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        className: PropTypes.string,
        index: PropTypes.shape({
          x: PropTypes.number,
          y: PropTypes.number,
        }),
        key: PropTypes.string.isRequired,
        avatar: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
      }),
    ]),
  ).isRequired,
  className: PropTypes.string,
  hiddenClass: PropTypes.string,
  snapToGrid: PropTypes.bool,
  accept: PropTypes.object,

  onSnapped: PropTypes.func,
  onHovered: PropTypes.func,
  onUnhovered: PropTypes.func,
  onDropped: PropTypes.func,
};

export default DropColumns;
