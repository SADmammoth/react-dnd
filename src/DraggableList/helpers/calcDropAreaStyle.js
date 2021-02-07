import mapHeight from "../../DragMap/helpers/mapHeight";

export default function calcDropAreaStyle(
  hovered,
  dropAreaSize,
  gap,
  orientation,
  draggingElement = { getBoundingClientRect: () => [] }
) {
  const calcHovered = (dimensionKey) => ({
    [dimensionKey]: `calc(${
      draggingElement.getBoundingClientRect()[dimensionKey]
    }px + ${dropAreaSize} + ${gap})`,
  });

  const calcDefault = (dimensionKey) => {
    let firstKey = "Top";
    let secondKey = "Bottom";
    if (dimensionKey === "width") {
      firstKey = "Left";
      secondKey = "Right";
    }

    const marginFirst = ["margin" + firstKey];
    const marginSecond = ["margin" + secondKey];
    const paddingFirst = ["padding" + firstKey];

    return {
      [marginFirst]: `calc(-1 * ${dropAreaSize} / 2 - ${gap})`,
      [marginSecond]: `calc(-1 * ${dropAreaSize} / 2))`,
      [dimensionKey]: dropAreaSize,
      [paddingFirst]: `calc(${dropAreaSize} / 2 + (${gap} * 2))`,
    };
  };

  const dimensionKey = orientation === "vertical" ? "height" : "width";

  if (hovered) {
    return calcHovered(dimensionKey);
  }
  return calcDefault(dimensionKey);
}
