export default function callDropAreaDragStart() {
  const dropareas = [
    ...document.getElementsByClassName("drop-area-drag-start"),
  ];
  dropareas.forEach((droparea) => {
    const event = document.createEvent("HTMLEvents");
    event.initEvent("dragstart", true, true);
    if (droparea.dispatchEvent) droparea.dispatchEvent(event);
  });
}
