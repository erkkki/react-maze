import Maze from "./Maze";

import DepthFirst from "./DepthFirst";
import {Subject} from "rxjs";

class Solver {

  path = [];
  moves = [];

  constructor() {
    this.update = new Subject();
  }

  solve() {
    const depth = new DepthFirst(Maze);
    this.path = depth.path;
    this.moves = depth.visitedCells;
    this.update.next();
  }
}

const _Solver = new Solver();
export default _Solver;
