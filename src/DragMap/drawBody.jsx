import React from 'react'
import classNames from 'classnames'
import DropArea from '../DropArea'
import elementsTypes from '../elementsTypes'

export default function drawBody(body, setData, checkSnap, hiddenClass) {
  return body.map((child) => {
    if (!child) {
      return child
    }

    const { type, key, index, className } = child

    if (type === elementsTypes.avatar) {
      return child.avatar
    } else if (
      type === elementsTypes.dropArea ||
      type === elementsTypes.hidden
    ) {
      return (
        <DropArea
          key={key}
          index={index}
          className={classNames(className, {
            [hiddenClass]: type === elementsTypes.hidden
          })}
          setData={setData}
          checkSnap={checkSnap}
        />
      )
    } else {
      return child
    }
  })
}
