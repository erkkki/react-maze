
import DepthFirst from "../services/Algorithms/DepthFirst";

// eslint-disable-next-line no-restricted-globals
self.addEventListener("message", startCounter);

function startCounter(event) {
  // eslint-disable-next-line no-restricted-globals
  // console.log(event.data[0])
  const {name, path, visitedCells } = new DepthFirst(event.data[0],event.data[1],event.data[2]);
  this.postMessage({name, path, visitedCells });
}
