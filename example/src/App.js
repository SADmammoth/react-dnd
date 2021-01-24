import React from 'react'

import { DragMap, DraggableElement } from '@sadmammoth/react-dnd'
import cells from './cells'

const App = () => {
  return (
    <>
      <DragMap
        rows={2}
        columns={2}
        createAvatar={(data) => {
          console.log(data, 'createAvatar')
        }}
        reassignAvatar={(data) => {
          console.log(data, 'reassignAvatar')
        }}
        onDataUpdate={(data) => {
          console.log(data, 'onDataUpdate')
        }}
        map={cells}
        snapToGrid={true}
      />
      <DraggableElement
        className='draggable'
        onReject={(data) => {
          console.log(data, 'onReject')
        }}
        data={{ user: 'user' }}
        onDragStart={(data) => {
          console.log(data, 'onDragStart')
        }}
        avatar={<div className='avatar'>User avatar</div>}
        rootElement={document}
      >
        User
      </DraggableElement>
    </>
  )
}

export default App
