import DepthFirst from "./Solver/DepthFirst";
import Pledge from "./Solver/Pledge";
import BreadthFirst from "./Solver/BreadthFirst";

class SolverService {


  constructor() {
  }

  solve() {

  }

  async pledge() {
    const { path, visitedCells } = await new Pledge(this.mazeService.maze, this.goalCells.start, this.goalCells.end);
    return {path, visitedCells};
  }

  async depth() {
    const { path, visitedCells } = await new DepthFirst(this.mazeService.maze, this.goalCells.start, this.goalCells.end);
    return {path, visitedCells};
  }

  async breadth() {
    const { path, visitedCells } = await new BreadthFirst(this.mazeService.maze, this.goalCells.start, this.goalCells.end);
    return {path, visitedCells};
  }

  findGoals() {
    this.maze.forEach(row => {
      row.forEach(cell => {
        if(cell.state === 2) {
          this._start = cell;
        }
        if(cell.state === 3) {
          this._end = cell;
        }
      });
    });
  }
}

const _Solver = new SolverService();
export default _Solver;
