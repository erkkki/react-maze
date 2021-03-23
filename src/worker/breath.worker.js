
import BreadthFirst from "../services/Algorithms/BreadthFirst";

// eslint-disable-next-line no-restricted-globals
self.addEventListener("message", startCounter);

function startCounter(event) {
  // eslint-disable-next-line no-restricted-globals
  const {name, path, visitedCells } = new BreadthFirst(event.data[0],event.data[1],event.data[2]);
  this.postMessage({name, path, visitedCells });
}
