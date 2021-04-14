import React, { useState, useEffect } from "react";

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
        data={{ secret, "data-code": openCode, myIndex: index }}
        avatar={createAvatar({ myIndex: index }, 2)}
        rootElement={document}
        height={2}
        onDragStart={(data) => {
          console.log(data, "onDragStart");
        }}
        onReject={(data) => {
          console.log(data, "onReject");
        }}
      >
        <div className="original" style={{ height: `calc(50px * ${2})` }}>
          User avatar {index}
        </div>
      </DraggableElement>
    );
  };

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTimeout(() => setTasks([1, 2]), 500);
  }, []);

  return (
    <>
      <DragGrid
        rows={2}
        columns={2}
        createAvatar={createAvatar}
        map={cells}
        snapToGrid={true}
        rootElement={document}
        accept={{ secret: "code1", "data-code": "openCode1" }}
        indexKey="myIndex"
        hiddenClass={"hidden"}
        reassignAvatar={(data) => {
          console.log(data, "reassignAvatar");
        }}
        onDataUpdate={(data) => {
          console.log(data, "onDataUpdate");
        }}
        onDropped={(...args) => console.log(...args, "onDropped")}
        onHovered={(...args) => console.log(...args, "onHovered")}
        onUnhovered={(...args) => console.log(...args, "onUnhovered")}
        onSnapped={(...args) => console.log(...args, "onSnapped")}
      />
      {createDraggableElement(0, "code1", "openCode1")}
      <DraggableList
        id="list"
        list={tasks.map((num) =>
          createDraggableElement(num, "code2", "openCode2")
        )}
        onOrderChange={(data) => {
          console.log(data, "onOrderChange");
        }}
        indexKey="myIndex"
        accept={{ secret: "code2", "data-code": "openCode2" }}
        dropAreaSize="50px"
        gap="10px"
      />
    </>
  );
};

export default App;
