import React, { useCallback } from 'react'

import useList from './useList'
import PropTypes from 'prop-types'
import StatelessDraggableList from './StatelessDraggableList'

function DraggableList({ list, onOrderChange, id, indexKey }) {
  const [items, dragging, reorderList] = useList(list)

  const reorderItems = useCallback(
    ({ [indexKey]: sourceId, index: destinationIndex }) => {
      onOrderChange(reorderList(sourceId, destinationIndex))
    },
    [items]
  )

  return (
    <StatelessDraggableList
      id={id}
      list={items}
      onOrderChange={reorderItems}
      dragging={dragging}
    />
  )
}

DraggableList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.func]))
    .isRequired,
  onOrderChange: PropTypes.func,
  id: PropTypes.string.isRequired,
  indexKey: PropTypes.string.isRequired
}

DraggableList.defaultProps = {
  onOrderChange: () => {}
}

export default DraggableList
