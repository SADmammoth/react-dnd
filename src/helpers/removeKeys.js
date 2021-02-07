export default function removeKeys(object, keys) {
  if (!object) {
    return object;
  }
  return Object.fromEntries(
    Object.entries(object).filter(([key]) => !keys.includes(key))
  );
}
