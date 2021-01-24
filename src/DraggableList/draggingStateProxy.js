import React from 'react'

export default function draggingStateProxy(items, setDragging) {
  return React.Children.map(items, (item) =>
    React.cloneElement(item, {
      ...item.props,
      onDragStart: (...args) => {
        setDragging(item.props.id)
        item.props.onDragStart(...args)
      },
      onDragEnd: (...args) => {
        setDragging(null)
        item.props.onReject(...args)
      },
      onReject: (...args) => {
        setDragging(null)
        item.props.onReject(...args)
      }
    })
  )
}
