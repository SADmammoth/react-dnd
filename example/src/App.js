import React, { useState } from "react";

import {
  DragGrid,
  DraggableElement,
  DraggableList,
} from "@sadmammoth/react-dnd";
import cells from "./cells";

const App = () => {
  const createAvatar = ({ myIndex }, height) => (
    <div className="avatar" style={{ height: `calc(50px * ${height})` }}>
      User avatar {myIndex}
    </div>
  );

  const createDraggableElement = (index, secret, openCode) => {
    return (
      <DraggableElement
        id={index}
        key={index}
        onReject={(data) => {
          console.log(data, "onReject");
        }}
        data={{ secret, "data-code": openCode, myIndex: index }}
        onDragStart={(data) => {
          console.log(data, "onDragStart");
        }}
        avatar={createAvatar({ myIndex: index }, 2)}
        rootElement={document}
        height={2}
      >
        <div className="original" style={{ height: `calc(50px * ${2})` }}>
          User avatar {index}
        </div>
      </DraggableElement>
    );
  };

  return (
    <>
      <DragGrid
        rows={2}
        columns={2}
        createAvatar={createAvatar}
        reassignAvatar={(data) => {
          console.log(data, "reassignAvatar");
        }}
        onDataUpdate={(data) => {
          console.log(data, "onDataUpdate");
        }}
        map={cells}
        snapToGrid={true}
        rootElement={document}
        accept={{ secret: "code1", "data-code": "openCode1" }}
        indexKey="myIndex"
        hiddenClass={"hidden"}
      />
      {createDraggableElement(0, "code1", "openCode1")}
      <DraggableList
        id="list"
        list={[1, 2, 3].map((num) =>
          createDraggableElement(num, "code2", "openCode2")
        )}
        onOrderChange={(data) => {
          console.log(data, "onOrderChange");
        }}
        indexKey="myIndex"
        accept={{ secret: "code2", "data-code": "openCode2" }}
      />
    </>
  );
};

export default App;
