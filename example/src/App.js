import React from 'react'

import { DragMap, DraggableElement, DraggableList } from '@sadmammoth/react-dnd'
import cells from './cells'

const App = () => {
  const createDraggableElement = (index, secret, openCode) => {
    return (
      <DraggableElement
        id={index}
        key={index}
        className='draggable'
        onReject={(data) => {
          console.log(data, 'onReject')
        }}
        data={{ secret, 'data-code': openCode, myIndex: index }}
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
        accept={{ secret: 'code1', 'data-code': 'openCode1' }}
      />
      {createDraggableElement(0, 'code1', 'openCode1')}
      <DraggableList
        id='list'
        list={[1, 2, 3].map((num) =>
          createDraggableElement(num, 'code2', 'openCode2')
        )}
        onOrderChange={(data) => {
          console.log(data, 'onOrderChange')
        }}
        indexKey='myIndex'
        accept={{ secret: 'code2', 'data-code': 'openCode2' }}
      />
    </>
  )
}

export default App
