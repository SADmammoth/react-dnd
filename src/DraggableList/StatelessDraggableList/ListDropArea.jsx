import React from "react";
import DropArea from "../../DropArea";
import PropTypes from "prop-types";

const ListDropArea = ({ index, id, onOrderChange, accept }) => {
  return (
    <DropArea
      key={id}
      id={id}
      className="list-droparea"
      index={{ x: index, y: 0 }}
      setData={data => {
        const { index, ...rest } = data;
        onOrderChange({ index: index.x, ...rest });
      }}
      checkSnap={(index, height, hovered) => hovered}
      accept={accept}
    />
  );
};

ListDropArea.propTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  onOrderChange: PropTypes.func.isRequired,
  accept: PropTypes.object
};

export default ListDropArea;
