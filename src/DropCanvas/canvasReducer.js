const actionTypes = {
  SAVE_POSITION: 'SAVE_POSITION',
};

export default function canvasReducer(state, { type, data }) {
  switch (type) {
    case actionTypes.SAVE_POSITION:
      return { ...state, [data.id]: data.position };
  }
}
