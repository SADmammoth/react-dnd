import PropTypes from "prop-types";
import createDropArea from "./createDropArea";

function StatelessDraggableList({
  id,
  list,
  onOrderChange,
  dragging,
  accept,
  onSnapped,
  onHovered,
  onUnhovered,
  onDropped,
  dropAreaStyle,
}) {
  let currentIndex = 0;

  return [
    createDropArea(
      id,
      currentIndex,
      onOrderChange,
      accept,
      onSnapped,
      onHovered,
      onUnhovered,
      onDropped,
      dropAreaStyle
    ),
    ...list
      .map((item, i) => {
        if (item.props.id === dragging) {
          return item;
        } else {
          currentIndex++;
          return [
            item,
            createDropArea(
              id,
              currentIndex,
              onOrderChange,
              accept,
              onSnapped,
              onHovered,
              onUnhovered,
              onDropped,
              dropAreaStyle
            ),
          ];
        }
      })
      .flat(),
  ];
}

StatelessDraggableList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.func]))
    .isRequired,
  onOrderChange: PropTypes.func.isRequired,
  dragging: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string.isRequired,
  accept: PropTypes.object,
  dropAreaStyle: PropTypes.object,

  onSnapped: PropTypes.func,
  onHovered: PropTypes.func,
  onUnhovered: PropTypes.func,
  onDrop: PropTypes.func,
};

export default StatelessDraggableList;
