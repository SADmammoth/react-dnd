import mapHeight from "../../DragMap/helpers/mapHeight";

export default function calcDropAreaStyle(
  draggingElement,
  dropAreaHeight,
  gap,
  orientation
) {
  const height = `calc(${
    draggingElement.getBoundingClientRect().height
  }px + ${dropAreaHeight} + ${gap})`;

  return {
    height,
  };
}
