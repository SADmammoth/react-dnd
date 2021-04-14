const actionTypes = {
  MOVE: "MOVE",
  SET_LEFT_TOP: "SET_LEFT_TOP",
  START_DRAG: "START_DRAG",
  END_DRAG: "END_DRAG",
  SET_POSITION: "SET_POSITION",
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

export default function draggableElementReducer(state, { type, payload }) {
  switch (type) {
    case actionTypes.START_DRAG:
      return startDrag(state, payload);
    case actionTypes.MOVE:
      return move(state, payload);
    case actionTypes.SET_POSITION:
      return setPosition(state, payload);
    case actionTypes.SET_LEFT_TOP:
      return setLeftTop(state, payload);
    case actionTypes.END_DRAG:
      return reset(state);
    default:
      return state;
  }
}

function startDrag(state, { x, y }) {
  return {
    prev: {
      x,
      y,
    },
    style: {
      position: "fixed",
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
      position: "fixed",
      pointerEvents: "none",
      left,
      top,
    },
  };
}

function setPosition(state, { left, top, x, y }) {
  return {
    ...state,
    prev: {
      x,
      y,
    },
    style: {
      position: "fixed",
      pointerEvents: "none",
      left,
      top,
    },
  };
}

function reset(state) {
  return init;
}

function move(state, { x, y }) {
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
      pointerEvents: "none",
      position: "fixed",
      left: left + diffX,
      top: top + diffY,
    },
  };
}

export { actionTypes, init };
