import Maze from "./MazeService";

import DepthFirst from "./Solver/DepthFirst";
import {Subject} from "rxjs";

class Solver {

  path = [];
  moves = [];
  start = {};
  end = {};

  constructor() {
    this.mazeService = Maze;
    this.update = new Subject();
  }

  solve() {
    this.findGoals();
    const { path, visitedCells } = new DepthFirst(this.mazeService.maze, this.start, this.end);
    this.path = path;
    this.moves = visitedCells;
    this.update.next();
  }

  findGoals() {
    this.mazeService.maze.forEach(row => {
      row.forEach(cell => {
        if(cell.state === 2) {
          this.start = cell;
        }
        if(cell.state === 3) {
          this.end = cell;
        }
      });
    });
  }
}

const _Solver = new Solver();
export default _Solver;
