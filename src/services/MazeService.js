import {BehaviorSubject, Subject} from "rxjs";

import MazeGenerator from "./Maze/MazeGenerator";

class MazeService {

  maze = [];
  update = new Subject();
  size = new BehaviorSubject(10);

  constructor() {
    this.size.subscribe(() => this.genMaze());
  }

  genMaze() {
    const size = this.size.getValue();
    this.maze = new MazeGenerator(size);
    this.update.next();
  }
}


const _Maze = new MazeService();
export default _Maze;
