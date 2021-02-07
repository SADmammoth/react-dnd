import { useCallback } from "react";

import setSnapData from "./setSnapData";

import checkIfAccepted from "./checkIfAccepted";
import getDraggingElement from "./getDraggingElement";
import dropEffects from "../../dropEffects";
import _ from "lodash";

export default function useOnDragOverHandler(
  accept,
  index,
  mergeStyle,
  hovered,
  setHovered,
  checkSnap,
  onSnapped
) {
  return useCallback(
    (e) => {
      const dragging = getDraggingElement();

      if (!dragging) {
        return;
      }

      const accepted = checkIfAccepted(accept);

      if (!accepted) {
        e.dataTransfer.dropEffect = dropEffects.none;
        e.preventDefault();
        return false;
      }

      setHovered(true);
      e.preventDefault();

      const isAlreadySnapped = dragging.hasAttribute("data-snap");
      if (isAlreadySnapped) {
        return;
      }

      const isSnappable =
        dragging &&
        checkSnap &&
        checkSnap(
          index,
          parseInt(dragging.getAttribute("data-height")),
          hovered
        );

      if (isSnappable) {
        setSnapData(dragging, e.target, onSnapped, mergeStyle);
      }

      e.dataTransfer.dropEffect = dropEffects.all;
      return true;
    },
    [accept, hovered, index]
  );
}
