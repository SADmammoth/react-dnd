export default function getPosition(ref) {
  const { left, top, width, height } = ref.current.getBoundingClientRect();

  return { left, top, width, height };
}
