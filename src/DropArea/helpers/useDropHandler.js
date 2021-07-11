import { useCallback } from 'react';

import getDraggingElement from './getDraggingElement';

import checkIfAccepted from './checkIfAccepted';

export default function useDropHandler(
  hovered,
  setHovered,
  accept,
  index,
  mergeStyle,
  setData,
  onDropped,
) {
  return useCallback(
    (e) => {
      if (hovered) {
        const dragging = getDraggingElement();

        setHovered(false);
        const data = JSON.parse(e.dataTransfer.getData('application/json'));

        const accepted = checkIfAccepted(accept);

        if (accepted) {
          const { index: originalIndex } = data;
          setData({
            ...data,
            index,
            originalIndex,
            dragging,
          });
        }

        onDropped(
          {
            ...data,
            index,
          },
          index,
          accepted,
          mergeStyle,
          dragging,
          e,
        );

        return accepted;
      }
      return false;
    },
    [hovered],
  );
}
