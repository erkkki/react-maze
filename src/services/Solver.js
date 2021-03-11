import Maze from "./Maze";

import DepthFirst from "./DepthFirst";
import {BehaviorSubject} from "rxjs";

class Solver {

  path = new BehaviorSubject([]);
  moves = new BehaviorSubject([]);

  constructor() {}

  solve() {
    const depth = new DepthFirst(Maze);
    this.path.next(depth.path);
    this.moves.next(depth.visitedCells);
  }
}

const _Solver = new Solver();
export default _Solver;
