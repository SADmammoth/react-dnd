import PropTypes from "prop-types";
import createDropArea from "./createDropArea.js";

function StatelessDraggableList({
  id,
  list,
  dragging,
  dropAreaClassName,
  dropAreaStyle,
  ...dropAreaProps
}) {
  let currentIndex = 0;

  return [
    createDropArea(
      id,
      currentIndex,
      dropAreaClassName,
      dropAreaStyle,
      dropAreaProps
    ),
    ...list.map((item) => {
      if (item.props.id === dragging) {
        return item;
      } else {
        currentIndex++;
        return [
          item,
          createDropArea(
            id,
            currentIndex,
            dropAreaClassName,
            dropAreaStyle,
            dropAreaProps
          ),
        ];
      }
    }),
  ];
}

StatelessDraggableList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.func]))
    .isRequired,
  dragging: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string.isRequired,

  /* Drop area props */
  onOrderChange: PropTypes.func.isRequired,
  accept: PropTypes.object,
  dropAreaStyle: PropTypes.object,
  onSnapped: PropTypes.func,
  onHovered: PropTypes.func,
  onUnhovered: PropTypes.func,
  onDrop: PropTypes.func,
  dropAreaClassName: PropTypes.string,
  gap: PropTypes.string,
};

export default StatelessDraggableList;
