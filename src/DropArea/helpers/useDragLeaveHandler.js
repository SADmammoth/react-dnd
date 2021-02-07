import { useCallback } from "react";
import getDraggingElement from "./getDraggingElement";

export default function useDragLeaveHandler(
  hovered,
  index,
  setHovered,
  mergeStyle,
  onUnhovered
) {
  return useCallback(() => {
    const dragging = getDraggingElement();

    if (hovered) {
      setHovered(false);
      if (dragging) dragging.removeAttribute("data-snap");
    }

    onUnhovered(dragging, index, hovered, mergeStyle);
  }, [hovered]);
}
