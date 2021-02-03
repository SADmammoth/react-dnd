const actionTypes = {
  SET_POSITION: "SET_POSITION",
  SET_LEFT_TOP: "SET_LEFT_TOP",
  START_DRAG: "START_DRAG",
  END_DRAG: "END_DRAG",
};

const init = {
  prev: {
    x: null,
    y: null,
  },
  style: {
    position: "static",
  },
  dragging: false,
};

const moveStep = 5;

export default function draggableElementReducer(state, { type, payload }) {
  switch (type) {
    case actionTypes.START_DRAG:
      return startDrag(state, payload);
    case actionTypes.SET_POSITION:
      return setPosition(state, payload);
    case actionTypes.SET_LEFT_TOP:
      return setLeftTop(state, payload);
    case actionTypes.END_DRAG:
      return reset(state);
    default:
      break;
  }
}

function startDrag(state, { x, y }) {
  return {
    prev: {
      x,
      y,
    },
    style: {
      position: "absolute",
      left: x,
      top: y,
    },
    dragging: true,
  };
}

function setLeftTop(state, { left, top }) {
  return {
    ...state,
    style: {
      position: "absolute",
      left,
      top,
    },
  };
}

function reset(state) {
  return init;
}

function setPosition(state, { x, y }) {
  const { left, top } = state.style;
  const { x: prevX, y: prevY } = state.prev;

  if (prevX === null || prevY === null) {
    return {
      ...state,
      prev: {
        x,
        y,
      },
    };
  }

  const diffX = x - prevX;
  const diffY = y - prevY;

  return {
    ...state,
    prev: {
      x,
      y,
    },
    style: {
      position: "absolute",
      left: left + diffX,
      top: top + diffY,
    },
  };
}

export { actionTypes, init };
