export default function checkIfAccepted(dragging, accept) {
  if (!accept) return true;
  return !Object.entries(accept).some(([key, value]) => {
    if (key.startsWith("data-")) {
      return dragging.getAttribute(key) !== value;
    }
  });
}
