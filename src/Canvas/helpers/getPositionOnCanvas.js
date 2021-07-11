export default function getPositionOnCanvas(
  { x, clientX, y, clientY },
  canvasSize,
  resolution,
) {
  let actualX;
  let actualY;

  if (clientX && clientY) {
    actualX = clientX - canvasSize.left;
    actualY = clientY - canvasSize.top;
    return { x: actualX, y: actualY };
  }

  if (resolution) {
    if (x >= resolution.x || y >= resolution.y) {
      return;
    }
    actualX = (canvasSize.x / resolution.x) * x;
    actualY = (canvasSize.y / resolution.y) * y;
    return { x: actualX, y: actualY };
  }

  if (x >= size.x || y >= size.y) {
    return;
  }

  return { x, y };
}
