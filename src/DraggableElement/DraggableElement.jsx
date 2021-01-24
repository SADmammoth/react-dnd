import React from 'react'
import ReactDOM from 'react-dom'

class DraggableElement extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      style: {
        left: 0,
        top: 0,
        containment: 'window'
      },
      lastPos: {
        x: null,
        y: null
      },
      dragging: false
    }

    this.dragged = React.createRef()
  }

  componentDidMount() {
    this.reset()
    document.getElementById('root').addEventListener('dragover', this.mouseMove)
  }

  componentWillUnmount() {
    document
      .getElementById('root')
      .removeEventListener('dragover', this.mouseMove)
  }

  reset = () => {
    this.setState(
      {
        style: {
          position: 'static'
        },

        dragging: false
      },
      () => {
        const { current: dragged } = this.dragged
        const draggedRect = dragged.getBoundingClientRect()

        this.setState((state) => ({
          ...state,
          style: {
            ...state.style,
            cursor: 'grab',
            left: draggedRect.left + window.scrollX + 'px',
            top: draggedRect.top + window.scrollY + 'px'
          },
          lastPos: {
            x: null,
            y: null
          }
        }))
      }
    )
  }

  convertToHtml(component) {
    const div = document.createElement('div')
    ReactDOM.render(component, div)
    return div.children[0]
  }

  setDragImage(event) {
    event.dataTransfer.setDragImage(document.createElement('div'), 0, 0)
  }

  setData(event) {
    event.dataTransfer.setData(
      'application/json',
      JSON.stringify({ ...this.props.data, dropEffect: this.props.dropEffect })
    )
  }

  mouseDown = (event) => {
    this.setDragImage(event)
    this.setData(event)

    this.setState(
      (state) => {
        return {
          ...state,
          style: {
            ...state.style,
            position: 'absolute'
          }
        }
      },
      () => {
        setTimeout(() => this.props.onDragStart && this.props.onDragStart(), 0)
        const timeout = setTimeout(() => {
          this.setState({
            dragging: true
          })
        }, 300)
        this.setState({
          timeout
        })
      }
    )

    document.addEventListener('mouseup', () => {
      const { pointerEvents, ...rest } = this.state.style
      this.setState({ style: { ...rest } })
    })
  }

  mouseUp = (event) => {
    if (!this.state.dragging) {
      clearTimeout(this.state.timeout)
      this.setState({ timeout: undefined })
    }
    if (event.dataTransfer.dropEffect === 'none') {
      this.props.onReject(this.props.data)
    }

    this.reset()
  }

  mouseMove = (event) => {
    if (this.state.dragging) {
      if (this.state.lastPos.x === null) {
        const { width, height } = this.dragged.current.getBoundingClientRect()

        this.setState({
          ...this.state,
          style: {
            ...this.state.style,
            left: event.pageX - width / 2,
            top: event.pageY - height / 2
          },
          lastPos: {
            x: event.pageX,
            y: event.pageY
          }
        })
        return
      }

      if (this.dragged.current.hasAttribute('data-snap')) {
        const { width, height } = this.dragged.current.getBoundingClientRect()
        const [left, top] = this.dragged.current
          .getAttribute('data-snap')
          .split(',')
        this.setState({
          style: {
            ...this.state.style,
            pointerEvents: 'none',
            left: left + 'px',
            top: top + 'px'
          },
          lastPos: {
            x: parseInt(left) + width / 2,
            y: parseInt(top) + height / 2
          }
        })
        return
      }

      this.setState((state) => {
        const diffX = state.lastPos.x - event.pageX
        const diffY = state.lastPos.y - event.pageY
        if (Math.abs(diffX) > 2 || Math.abs(diffY) > 2) {
          return {
            ...state,
            style: {
              ...state.style,
              pointerEvents: 'none',
              left: parseInt(state.style.left) - diffX + 'px',
              top: parseInt(state.style.top) - diffY + 'px'
            },
            lastPos: {
              x: event.pageX,
              y: event.pageY
            }
          }
        }
      })
    }
  }

  render() {
    const { style, dragging } = this.state
    let { avatar, className, style: propsStyle } = this.props
    if (!propsStyle) {
      propsStyle = []
    }

    return (
      <div
        ref={this.dragged}
        id={dragging ? 'dragging' : ''}
        className={`draggable ${className || ''}`}
        draggable='true'
        style={{ ...propsStyle, ...style }}
        onMouseDown={() => {
          this.setState({
            style: {
              ...this.state.style,
              cursor: 'grabbing'
            }
          })
        }}
        onMouseUp={() => {
          if (!this.state.dragging) {
            clearTimeout(this.state.timeout)
            this.setState({ timeout: undefined })
          }
          this.setState({
            style: {
              ...this.state.style,
              cursor: 'grab'
            }
          })
        }}
        data-height={this.props.height}
        onDragStart={this.mouseDown}
        onDragEnd={this.mouseUp}
      >
        {dragging && avatar ? avatar : this.props.children}
      </div>
    )
  }
}

DraggableElement.defaultProps = {
  onReject: () => {}
}

export default DraggableElement
