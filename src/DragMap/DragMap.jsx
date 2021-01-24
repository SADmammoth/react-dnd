import React, { useCallback, useEffect, useState, Fragment } from 'react'
import onDrop from './helpers/onDrop'
import drawBody from './drawBody'
import checkSnap from './helpers/checkSnap'
import PropTypes from 'prop-types'

const DragMap = (props) => {
  const [body, setBody] = useState([])
  const {
    columns,
    map,
    reassignAvatar,
    onDataUpdate,
    createAvatar,
    hiddenClass
  } = props

  useEffect(() => {
    setBody(map.flat())
  }, [JSON.stringify(map)])

  const setData = useCallback(
    (data) =>
      onDrop(
        data,
        body,
        setBody,
        columns,
        reassignAvatar,
        onDataUpdate,
        createAvatar
      ),
    [JSON.stringify(body), setBody]
  )

  const checkSnapping = useCallback(
    (index, height, hovered) =>
      checkSnap(index, height, body, columns, hovered),
    [JSON.stringify(body), columns]
  )

  return <>{drawBody(body, setData, checkSnapping, hiddenClass)}</>
}

DragMap.propTypes = {
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
            y: PropTypes.number
          }),
          key: PropTypes.string.isRequired,
          avatar: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
        })
      ])
    )
  ).isRequired,
  reassignAvatar: PropTypes.func.isRequired,
  onDataUpdate: PropTypes.func.isRequired,
  createAvatar: PropTypes.func.isRequired,
  className: PropTypes.string,
  hiddenClass: PropTypes.string
}

export default DragMap
