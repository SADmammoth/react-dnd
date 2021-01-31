import React, { useEffect, useState, useCallback } from "react";

import mapHeight from "../DragMap/helpers/mapHeight";

import elementsTypes from "../elementsTypes";

import toLinearIndex from "../DragMap/helpers/toLinearIndex";
import DragMap from "../DragMap";
import PropTypes from "prop-types";
import DraggableElement from "../DraggableElement";

function DragGrid({
  map,
  indexKey,
  columns,
  rows,
  createAvatar,
  rootElement,
  ...props
}) {
  const [grid, setGrid] = useState(map.flat());

  const onCreateAvatar = (data, height) => {
    const avatar = createAvatar(data, height);

    return {
      avatar: (
        <DraggableElement
          id={data[indexKey]}
          key={data[indexKey]}
          data={data}
          height={height}
          rootElement={rootElement}
          avatar={avatar}
          dropEffect="reassign"
          onDragStart={({ index }, height) => {
            setGrid((grid) => {
              const newGrid = mapHeight(
                index,
                height,
                columns,
                grid,
                (item) => ({
                  ...item,
                  type: elementsTypes.dropArea,
                })
              );

              const { style, ...rest } = newGrid[toLinearIndex(index, columns)];

              newGrid[toLinearIndex(index, columns)] = rest;
              return newGrid;
            });
          }}
          onReject={({ index }, height) => {
            setGrid((grid) => {
              const newGrid = mapHeight(
                index,
                height,
                columns,
                grid,
                (item) => ({
                  ...item,
                  type: elementsTypes.hidden,
                }),
                false
              );

              newGrid[toLinearIndex(index, columns)] = {
                ...newGrid[toLinearIndex(index, columns)],
                style: {
                  gridRow: data.index.x + 1 + " / span 2",
                  gridColumn: data.index.y + 1,
                },
              };

              return newGrid;
            });
          }}
        >
          {avatar}
        </DraggableElement>
      ),
      style: {
        gridRow: data.index.x + 1 + " / span 2",
        gridColumn: data.index.y + 1,
      },
    };
  };
  return (
    <DragMap
      {...props}
      map={grid}
      columns={columns}
      rows={rows}
      indexKey={indexKey}
      createAvatar={onCreateAvatar}
      onDataUpdate={(data, array) => {
        console.log(data);
        setGrid(array);
      }}
      reassignAvatar={(body, _, index, height) => {
        console.log(index);
        const newBody = [...body];
        const linearIndex = toLinearIndex(index, columns);
        const { originalIndex, ...data } = newBody[
          linearIndex
        ].avatar.props.data;

        newBody.splice(linearIndex, 1, {
          ...newBody[linearIndex],
          ...onCreateAvatar({ ...data, index }, height),
        });

        return newBody;
      }}
      style={{
        display: "grid",
        grid: `repeat(${columns}, 1fr) / repeat(${rows}, 1fr)`,
      }}
    />
  );
}

DragGrid.propTypes = {
  columns: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
  map: PropTypes.arrayOf(
    PropTypes.arrayOf(
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
      ])
    )
  ).isRequired,
  className: PropTypes.string,
  hiddenClass: PropTypes.string,
  snapToGrid: PropTypes.bool,
  accept: PropTypes.object,
};

export default DragGrid;
