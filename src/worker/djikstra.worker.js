
import Dijkstra from "../services/Solver/Dijkstra";

// eslint-disable-next-line no-restricted-globals
self.addEventListener("message", startCounter);

function startCounter(event) {
  // eslint-disable-next-line no-restricted-globals
  const {name, path, visitedCells } = new Dijkstra(event.data[0],event.data[1],event.data[2]);
  this.postMessage({name, path, visitedCells });
}
