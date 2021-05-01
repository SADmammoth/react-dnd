export default function callDropAreaDragStart() {
  const dropareas = [...document.getElementsByClassName("drop-area")];
  dropareas.forEach((droparea) => {
    const event = document.createEvent("HTMLEvents");
    event.initEvent("dragstart", true, true);
    droparea.dispatchEvent(event);
  });
}
