import _ from 'lodash';

export default function setSnapData(element, dropArea, onSnapped, mergeStyle) {
  const { left, top } = dropArea.getBoundingClientRect();
  const snapLeft =
    left + window.scrollX + parseInt(getComputedStyle(dropArea).paddingLeft);
  const snapTop =
    top + window.scrollY + parseInt(getComputedStyle(dropArea).paddingTop);

  element.setAttribute('data-snap', `${snapLeft},${snapTop}`);

  onSnapped(element, left, top, mergeStyle);
}
