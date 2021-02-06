import { useState, useCallback } from "react";
import draggingStateProxy from "./draggingStateProxy";

export default function useList(list) {
  const [dragging, setDragging] = useState(null);
  const [items, setItems] = useState(draggingStateProxy(list, setDragging));

  const reorderItems = useCallback(
    (sourceId, destinationIndex) => {
      const sourceIndex = items.findIndex(
        ({ props: { id: candidateId } }) => candidateId === sourceId
      );

      console.log(sourceId, sourceIndex, destinationIndex);

      const newItems = [...items];
      if (sourceIndex < 0 || destinationIndex < 0) {
        return;
      }

      const newItem = newItems.splice(sourceIndex, 1)[0];
      newItems.splice(destinationIndex, 0, newItem);

      const ids = newItems.map((item) => item.props.id);

      setItems(newItems);

      return { ids, destinationIndex, sourceIndex };
    },
    [items]
  );

  return [items, dragging, reorderItems];
}
