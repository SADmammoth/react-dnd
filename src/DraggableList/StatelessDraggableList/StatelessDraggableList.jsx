import PropTypes from "prop-types";
import createDropArea from "./createDropArea";

function StatelessDraggableList({ id, list, onOrderChange, dragging, accept }) {
  return [
    createDropArea(id, 0, onOrderChange, accept),
    ...list
      .map((item, i) => {
        if (item.props.id === dragging) {
          return item;
        } else {
          return [item, createDropArea(id, i, onOrderChange, accept)];
        }
      })
      .flat()
  ];
}

StatelessDraggableList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.func]))
    .isRequired,
  onOrderChange: PropTypes.func.isRequired,
  dragging: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  id: PropTypes.string.isRequired,
  accept: PropTypes.object
};

export default StatelessDraggableList;
