export default function setTransferData(e, data) {
  e.dataTransfer.setData("application/json", JSON.stringify(data));
}
