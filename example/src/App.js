import React from 'react'

import { DragMap, DraggableElement } from '@sadmammoth/react-dnd'
import cells from './cells'

const App = () => {
  return (
    <DragMap
      rows={2}
      columns={2}
      createAvatar={(data) => {
        console.log(data)
      }}
      reassignAvatar={(data) => {
        console.log(data)
      }}
      onDataUpdate={(data) => {
        console.log(data)
      }}
      map={cells}
    />
    <DraggableElement>
  )
}

export default App
