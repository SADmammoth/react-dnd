import React from "react";
import DropArea from "../../DropArea";
import PropTypes from "prop-types";

const ListDropArea = ({
  index,
  id,
  onOrderChange,
  accept,
  onSnapped,
  onHovered,
  onUnhovered,
  onDropped,
  style,
}) => {
  return (
    <DropArea
      key={id}
      id={id}
      className="list-droparea"
      index={{ x: index, y: 0 }}
      setData={(data) => {
        const { index, ...rest } = data;
        onOrderChange({ index: index.x, ...rest });
      }}
      checkSnap={(index, height, hovered) => hovered}
      accept={accept}
      onSnapped={onSnapped}
      onHovered={onHovered}
      onUnhovered={onUnhovered}
      onDropped={onDropped}
      style={style}
    />
  );
};

ListDropArea.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  onOrderChange: PropTypes.func.isRequired,
  accept: PropTypes.object,

  onSnapped: PropTypes.func,
  onHovered: PropTypes.func,
  onUnhovered: PropTypes.func,
};

export default ListDropArea;
