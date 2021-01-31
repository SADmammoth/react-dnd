import React from "react";
import classNames from "classnames";
import DropArea from "../DropArea";
import elementsTypes from "../elementsTypes";

export default function drawBody(
  body,
  setData,
  checkSnap,
  hiddenClass,
  accept
) {
  return body.map(child => {
    if (!child) {
      return child;
    }

    const { type, key, index, className, style } = child;

    if (
      type === elementsTypes.avatar ||
      type === elementsTypes.dropArea ||
      type === elementsTypes.hidden
    ) {
      return (
        <DropArea
          key={key}
          index={index}
          className={classNames(className, {
            [hiddenClass]: type === elementsTypes.hidden
          })}
          setData={setData}
          checkSnap={checkSnap}
          accept={accept}
          style={style}
        >
          {child.avatar}
        </DropArea>
      );
    } else {
      return child;
    }
  });
}
