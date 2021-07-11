import React, { useState, useEffect } from 'react';

import {
  DropColumns,
  DraggableElement,
  DraggableList,
  DropCanvas,
} from '@sadmammoth/react-dnd';
import cells from './cells';

const App = () => {
  const [removed, setRemoved] = useState(null);

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
        data={{ secret, 'data-code': openCode, myIndex: index }}
        avatar={createAvatar({ myIndex: index }, 2)}
        rootElement={document}
        height={2}
        onDragStart={(data) => {
          console.log(data, 'onDragStart');
        }}
        onReject={(data) => {
          console.log(data, 'onReject');
        }}>
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

  const [added, setAdded] = useState(false);
  const item0 = createDraggableElement(0, 'code1', 'openCode1');

  useEffect(() => {
    if (added !== false && added !== null) {
      const index = tasks.findIndex((i) => i === 0);

      if (index >= 0) {
        setTasks((tasks) => [
          ...tasks.slice(0, index),
          ...tasks.slice(index + 1),
        ]);
      }

      setTasks((tasks) => [...tasks.slice(0, added), 0, ...tasks.slice(added)]);
      setAdded(null);
    }
  }, [added, item0, tasks]);

  useEffect(() => {
    if (removed) {
      setTasks((tasks) => {
        const index = tasks.findIndex((task) => task === removed);
        return [...tasks.slice(0, index), ...tasks.slice(index + 1)];
      });

      setRemoved(null);
    }
  }, [removed]);

  const [map, setMap] = useState([]);

  useEffect(() => {
    async function func() {
      let resolve;

      setTimeout(() => {
        resolve();
      }, 1000);

      const prom = await new Promise((resolvePromise) => {
        resolve = () => resolvePromise(cells);
      });

      setMap(prom);
    }

    func();
  });

  return (
    <>
      <DropColumns
        rows={2}
        columns={3}
        createAvatar={createAvatar}
        map={[]}
        dropareaDefaultClassName={'cell'}
        snapToGrid={true}
        rootElement={document}
        // accept={{ secret: "code1", "data-code": "openCode1" }}
        indexKey="myIndex"
        hiddenClass={'hidden'}
        reassignAvatar={(data) => {
          console.log(data, 'reassignAvatar');
        }}
        onDataUpdate={(data) => {
          console.log(data, 'onDataUpdate');
        }}
        onDropped={(args) => {
          console.log(args, 'onDropped');
        }}
        onHovered={(...args) => console.log(...args, 'onHovered')}
        onUnhovered={(...args) => console.log(...args, 'onUnhovered')}
        onSnapped={(...args) => console.log(...args, 'onSnapped')}
      />
      {added === false && item0}
      <DraggableList
        id="list"
        list={tasks.map((num) =>
          createDraggableElement(num, 'code2', 'openCode2'),
        )}
        onOrderChange={(data) => {
          console.log(data, 'onOrderChange');
        }}
        indexKey="myIndex"
        onNewItem={(data) => {
          console.log(data, 'onNewItem');
          setAdded(data.index.x);
        }}
        onDroppedAway={(data) => {
          console.log(data, 'onDroppedAway');
          setRemoved(data);
        }}
        // accept={{ secret: "code2", "data-code": "openCode2" }}
        dropAreaSize="50px"
        gap="10px"
      />
      <DropCanvas createAvatar={createAvatar} />
    </>
  );
};

export default App;
