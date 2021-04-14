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

  const [is0AtList, setIs0AtList] = useState(false);
  const item0 = createDraggableElement(0, "code1", "openCode1");

  useEffect(() => {
    if (is0AtList !== false && is0AtList !== null) {
      const index = tasks.findIndex((i) => i === 0);
      console.log(tasks, index);
      if (index >= 0) {
        setTasks((tasks) => [
          ...tasks.slice(0, index),
          ...tasks.slice(index + 1),
        ]);
      }

      setTasks((tasks) => [
        ...tasks.slice(0, is0AtList),
        0,
        ...tasks.slice(is0AtList),
      ]);
      setIs0AtList(null);
    }
  }, [is0AtList, item0, tasks]);

  return (
    <>
      <DragGrid
        rows={2}
        columns={2}
        createAvatar={createAvatar}
        map={cells}
        snapToGrid={true}
        rootElement={document}
        // accept={{ secret: "code1", "data-code": "openCode1" }}
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
      {is0AtList === false && item0}
      <DraggableList
        id="list"
        list={tasks.map((num) =>
          createDraggableElement(num, "code2", "openCode2")
        )}
        onOrderChange={(data) => {
          console.log(data, "onOrderChange");
        }}
        indexKey="myIndex"
        onNewItem={(data) => {
          setIs0AtList(data.index.x);
        }}
        // accept={{ secret: "code2", "data-code": "openCode2" }}
        dropAreaSize="50px"
        gap="10px"
      />
    </>
  );
};

export default App;
