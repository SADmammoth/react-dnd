const actionTypes = {
  PLACE: 'PLACE',
};

export default function canvasReducer(state, { type, data }) {
  switch (type) {
    case actionTypes.PLACE:
      return { ...state, [data.id]: data };
  }
}
