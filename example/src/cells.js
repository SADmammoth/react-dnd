import { elementsTypes } from "@sadmammoth/react-dnd";

export default [
  {
    type: elementsTypes.dropArea,
    className: "cell",
    index: { x: 0, y: 0 },
    key: "00",
  },
  {
    type: elementsTypes.dropArea,
    className: "cell",
    index: { x: 0, y: 1 },
    key: "01",
  },

  {
    type: elementsTypes.dropArea,
    className: "cell",
    index: { x: 1, y: 0 },
    key: "10",
  },
  {
    type: elementsTypes.dropArea,
    className: "cell",
    index: { x: 1, y: 1 },
    key: "11",
  },
];
