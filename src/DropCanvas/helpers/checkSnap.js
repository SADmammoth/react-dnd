import calcCellSize from './calcCellSize';

export default function checkSnap(
  currentLocation,
  canvasSize,
  canvasResolution,
) {
  const { x: cellWidth, y: cellHeight } = calcCellSize(
    canvasSize,
    canvasResolution,
  );
  const { x, y } = currentLocation;

  const cellsX = parseInt(x / cellWidth);
  const cellsY = parseInt(y / cellHeight);

  return { left: cellsX * cellWidth, top: cellsY * cellHeight };
}
