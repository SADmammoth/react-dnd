import getPosition from "./getPosition";
import { actionTypes } from "./draggableElementReducer";

export default function moveElementToCenterCursor(element) {
  const { left, width, top, height } = getPosition(element);
  return {
    type: actionTypes.SET_LEFT_TOP,
    payload: { left: left - width / 2, top: top - height / 2 },
  };
}
