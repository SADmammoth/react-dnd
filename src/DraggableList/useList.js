import { useState, useCallback, useEffect } from "react";
import draggingStateProxy from "./draggingStateProxy";

export default function useList(list, onNewItem, onDroppedAway) {
  const [dragging, setDragging] = useState(null);
  const [isRejected, setRejected] = useState(false);

  const reject = () => {
    setRejected(true);
  };

  const [items, setItems] = useState(
    draggingStateProxy(list, setDragging, reject)
  );

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
    setItems(draggingStateProxy(newItems, setDragging, reject));
  };

  const [dropped, setDropped] = useState(null);

  useEffect(() => {
    if (!dragging && dropped) {
      onNewItem(dropped);
    }
  }, [dropped]);

  const [prevDragging, setPrevDragging] = useState(null);

  useEffect(() => {
    if (prevDragging && !dragging && !dropped && !isRejected) {
      onDroppedAway(prevDragging);
    }
    setPrevDragging(dragging);
    setRejected(false);
  }, [dragging]);

  const dropItem = (dropped) => {
    setDropped(dropped);
  };

  useEffect(() => {
    const index = items.findIndex((item) => item.props.id === dragging);
    if (dragging && index < 0) {
      onDroppedAway(dragging);
      setDragging(null);
      return;
    }
  }, [items]);

  return [items, updateItems, dragging, reorderItems, dropItem];
}
