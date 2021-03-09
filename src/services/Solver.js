import Maze from "./Maze";

import DepthFirst from "./DepthFirst";

class Solver {



  solve() {
    const depth = new DepthFirst(Maze);
  }
}

const _Solver = new Solver();
export default _Solver;
