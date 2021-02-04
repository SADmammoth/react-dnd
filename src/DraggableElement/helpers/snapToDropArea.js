import getDimensions from "./getDimensions";
import { actionTypes } from "./draggableElementReducer";

export default function snapToDropArea(element) {
  if (element.hasAttribute("data-snap")) {
    const { width, height } = getDimensions(element);
    const [left, top] = element.getAttribute("data-snap").split(",");

    return {
      type: actionTypes.SET_POSITION,
      payload: {
        left: parseInt(left),
        top: parseInt(top),
        x: parseInt(left) + width / 2,
        y: parseInt(top) + height / 2,
      },
    };
  }

  return {};
}
