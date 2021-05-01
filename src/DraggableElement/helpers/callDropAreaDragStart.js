export default function callDropAreaDragStart() {
  const dropareas = Array.from(
    document.getElementsByClassName("drop-area-events")
  );
  dropareas.forEach((droparea) => {
    const event = document.createEvent("HTMLEvents");
    event.initEvent("dragstart", true, true);
    if (droparea.dispatchEvent) droparea.dispatchEvent(event);
  });
}
