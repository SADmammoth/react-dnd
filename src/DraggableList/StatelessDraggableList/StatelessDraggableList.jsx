import React from 'react'
import PropTypes from 'prop-types'
import ListDropArea from './ListDropArea'

function StatelessDraggableList({ id, list, onOrderChange, dragging }) {
  return [
    <ListDropArea
      key={id + 0}
      id={id + 0}
      index={0}
      onOrderChange={onOrderChange}
    />,
    ...list
      .map((item, i) => {
        if (item.props.id === dragging) {
          return item
        } else {
          return [
            item,
            <ListDropArea
              key={id + (i + 1)}
              id={id + (i + 1)}
              index={i + 1}
              onOrderChange={onOrderChange}
            />
          ]
        }
      })
      .flat()
  ]
}

StatelessDraggableList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.func]))
    .isRequired,
  onOrderChange: PropTypes.func.isRequired,
  dragging: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string.isRequired
}

export default StatelessDraggableList
