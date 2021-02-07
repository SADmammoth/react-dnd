import { useCallback } from "react";

import checkIfAccepted from "./checkIfAccepted";

export default function useDropHandler(
  hovered,
  setHovered,
  accept,
  index,
  mergeStyle,
  setData,
  onDropped
) {
  return useCallback(
    (e) => {
      if (hovered) {
        setHovered(false);
        const data = JSON.parse(e.dataTransfer.getData("application/json"));

        const accepted = checkIfAccepted(accept);

        if (accepted) {
          const { index: originalIndex } = data;
          setData({
            ...data,
            index,
            originalIndex,
          });
        }

        onDropped(
          {
            ...data,
            index,
          },
          index,
          accepted,
          mergeStyle
        );

        return accepted;
      }
      return false;
    },
    [hovered]
  );
}
