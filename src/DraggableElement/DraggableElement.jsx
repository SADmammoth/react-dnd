import React from "react";

import setDragImage from "./helpers/setDragImage";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class DraggableElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      style: {
        left: 0,
        top: 0,
        containment: "window"
      },
      lastPos: {
        x: null,
        y: null
      },
      dragging: false
    };

    this.dragged = React.createRef();
  }

  componentDidMount() {
    this.reset();
    this.props.rootElement.addEventListener("dragover", this.mouseMove);
  }

  componentWillUnmount() {
    this.props.rootElement
      .getElementById("root")
      .removeEventListener("dragover", this.mouseMove);
  }

  reset = () => {
    this.setState(
      {
        style: {
          position: "static"
        },

        dragging: false
      },
      () => {
        const { current: dragged } = this.dragged;
        const draggedRect = dragged.getBoundingClientRect();

        this.setState(state => ({
          ...state,
          style: {
            ...state.style,
            cursor: "grab",
            left: draggedRect.left + window.scrollX + "px",
            top: draggedRect.top + window.scrollY + "px"
          },
          lastPos: {
            x: null,
            y: null
          }
        }));
      }
    );
  };

  convertToHtml(component) {
    const div = document.createElement("div");
    ReactDOM.render(component, div);
    return div.children[0];
  }

  setData(event) {
    event.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        ...this.props.data,
        height: this.props.height,
        dropEffect: this.props.dropEffect
      })
    );
  }

  mouseDown = event => {
    setDragImage(event);
    this.setData(event);

    this.setState(
      state => {
        return {
          ...state,
          style: {
            ...state.style,
            position: "absolute"
          }
        };
      },
      () => {
        setTimeout(
          () => this.props.onDragStart(this.props.data, this.props.height),
          0
        );
        const timeout = setTimeout(() => {
          this.setState({
            dragging: true
          });
        }, 300);
        this.setState({
          timeout
        });
      }
    );

    document.addEventListener("mouseup", () => {
      const { pointerEvents, ...rest } = this.state.style;
      this.setState({ style: { ...rest } });
    });
  };

  mouseUp = event => {
    if (!this.state.dragging) {
      clearTimeout(this.state.timeout);
      this.setState({ timeout: undefined });
    }
    if (event.dataTransfer.dropEffect === "none") {
      this.props.onReject(this.props.data, this.props.height);
    } else {
      this.props.onDragEnd(this.props.data, this.props.height);
    }

    this.reset();
  };

  mouseMove = event => {
    if (this.state.dragging && this.dragged.current) {
      if (this.state.lastPos.x === null) {
        const { width, height } = this.dragged.current.getBoundingClientRect();

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
        });
        return;
      }

      if (this.dragged.current.hasAttribute("data-snap")) {
        const { width, height } = this.dragged.current.getBoundingClientRect();
        const [left, top] = this.dragged.current
          .getAttribute("data-snap")
          .split(",");
        this.setState({
          style: {
            ...this.state.style,
            pointerEvents: "none",
            left: left + "px",
            top: top + "px"
          },
          lastPos: {
            x: parseInt(left) + width / 2,
            y: parseInt(top) + height / 2
          }
        });
        return;
      }

      this.setState(state => {
        const diffX = state.lastPos.x - event.pageX;
        const diffY = state.lastPos.y - event.pageY;
        if (Math.abs(diffX) > 2 || Math.abs(diffY) > 2) {
          return {
            ...state,
            style: {
              ...state.style,
              pointerEvents: "none",
              left: parseInt(state.style.left) - diffX + "px",
              top: parseInt(state.style.top) - diffY + "px"
            },
            lastPos: {
              x: event.pageX,
              y: event.pageY
            }
          };
        }
      });
    }
  };

  render() {
    const { style, dragging } = this.state;
    let { avatar, className, style: propsStyle, data } = this.props;
    if (!propsStyle) {
      propsStyle = [];
    }

    const attributes = Object.fromEntries(
      Object.entries(data).filter(([dataKey, dataValue]) =>
        dataKey.startsWith("data-")
      )
    );

    return (
      <div
        ref={this.dragged}
        id={dragging ? "dragging" : ""}
        className={`draggable ${className || ""}`}
        draggable="true"
        style={{ ...propsStyle, ...style }}
        onMouseDown={() => {
          this.setState({
            style: {
              ...this.state.style,
              cursor: "grabbing"
            }
          });
        }}
        onMouseUp={() => {
          if (!this.state.dragging) {
            clearTimeout(this.state.timeout);
            this.setState({ timeout: undefined });
          }
          this.setState({
            style: {
              ...this.state.style,
              cursor: "grab"
            }
          });
        }}
        data-height={this.props.height}
        onDragStart={this.mouseDown}
        onDragEnd={this.mouseUp}
        {...attributes}
      >
        {dragging && avatar ? avatar : this.props.children}
      </div>
    );
  }
}

DraggableElement.propTypes = {
  data: PropTypes.object,
  dropEffect: PropTypes.string,
  onDragStart: PropTypes.func,
  onDragEnd: PropTypes.func,
  onReject: PropTypes.func,
  style: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
  avatar: PropTypes.element,
  height: PropTypes.number,
  rootElement: PropTypes.object
};

DraggableElement.defaultProps = {
  onReject: () => {},
  onDragStart: () => {},
  onDragEnd: () => {},
  style: {},
  height: 1,
  rootElement: document.getElementById("root")
};

export default DraggableElement;
