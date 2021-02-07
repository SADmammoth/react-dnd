export default function checkIfAccepted(accept) {
  return !Object.entries(accept).some(([key, value]) => {
    if (key.startsWith("data-")) {
      return dragging.getAttribute(key) !== value;
    }
  });
}
