import React from 'react'

import { DragMap, DraggableElement, DraggableList } from '@sadmammoth/react-dnd'
import cells from './cells'

const App = () => {
  const createDraggableElement = (index) => {
    return (
      <DraggableElement
        id={index}
        key={index}
        className='draggable'
        onReject={(data) => {
          console.log(data, 'onReject')
        }}
        data={{ myIndex: index }}
        onDragStart={(data) => {
          console.log(data, 'onDragStart')
        }}
        avatar={<div className='avatar'>User avatar {index}</div>}
        rootElement={document}
      >
        User {index}
      </DraggableElement>
    )
  }

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
      {createDraggableElement(0)}
      <DraggableList
        id='list'
        list={[1, 2, 3].map((num) => createDraggableElement(num))}
        onOrderChange={(data) => {
          console.log(data, 'onOrderChange')
        }}
        indexKey='myIndex'
      />
    </>
  )
}

export default App
