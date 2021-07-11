export default function drawGrid(ctx, resolution) {
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.lineWidth = 0.03;
  const cellHeight = ctx.canvas.height / resolution.y;
  const cellWidth = ctx.canvas.width / resolution.x;

  for (let x = 0; x < ctx.canvas.width; x++) {
    for (let y = 0; y < ctx.canvas.height; y++) {
      ctx.rect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
    }
  }
  ctx.stroke();
}
