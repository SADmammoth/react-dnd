import { useState, useCallback, useEffect } from "react";
import draggingStateProxy from "./draggingStateProxy";

export default function useList(list, onNewItem) {
  const [dragging, setDragging] = useState(null);
  const [items, setItems] = useState(draggingStateProxy(list, setDragging));

  const reorderItems = useCallback(
    (sourceId, destinationIndex) => {
      if (!dragging) {
        return;
      }
      const sourceIndex = items.findIndex(
        ({ props: { id: candidateId } }) => candidateId === sourceId
      );

      if (sourceIndex < 0 || destinationIndex < 0) {
        return;
      }

      const newItems = [...items];
      const newItem = newItems.splice(sourceIndex, 1)[0];
      newItems.splice(destinationIndex, 0, newItem);

      const ids = newItems.map((item) => item.props.id);

      setItems(newItems);

      return { ids, destinationIndex, sourceIndex };
    },
    [items]
  );

  const updateItems = (newItems) => {
    setItems(draggingStateProxy(newItems, setDragging));
  };

  const [dropped, setDropped] = useState(null);

  useEffect(() => {
    if (!dragging && dropped) {
      onNewItem(dropped);
    }
  }, [dropped]);

  const dropItem = (dropped) => {
    setDropped(dropped);
  };

  return [items, updateItems, dragging, reorderItems, dropItem];
}
