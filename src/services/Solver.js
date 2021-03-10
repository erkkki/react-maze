import Maze from "./Maze";

import DepthFirst from "./DepthFirst";
import {BehaviorSubject} from "rxjs";

class Solver {

  constructor() {
    this.path = new BehaviorSubject([]);
    this.moves = new BehaviorSubject([]);
  }

  solve() {
    const depth = new DepthFirst(Maze);
    this.path.next(depth.path);
    this.moves.next(depth.visitedCells);
  }
}

const _Solver = new Solver();
export default _Solver;
