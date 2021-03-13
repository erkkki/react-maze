import {BehaviorSubject, Subject} from "rxjs";

import MazeGenerator from "./MazeGenerator";
import Canvas from "../Canvas";
// import Cell from "./Cell";

class Maze {

  maze = [];
  start = {};
  end = {};

  constructor() {
    this.size = new BehaviorSubject(10);
    this.update = new Subject();
    this.genMaze();
    this.canvas = new Canvas(this);
  }

  genMaze() {
    const size = this.size.getValue();

    this.maze = [];
    this.maze = new MazeGenerator(size);

    /** Find End and Start */
    this.maze.forEach(row => {
      row.forEach(cell => {
        if(cell.state === 2) {
          this.start = cell;
        }
        if(cell.state === 3) {
          this.end = cell;
        }
      });
    });
    this.update.next();
  }

  setSize(value) {
    this.size.next(value);
    this.genMaze();
  }

  makeWall(x,y) {
    const cell = this.maze[x][y];
    if(!cell) {
      return;
    }
    if(cell.state === 0) {
      cell.state = 1;
      this.maze[x][y] = cell;
      return;
    }
    if(cell.state === 1) {
      cell.state = 0;
      this.maze[x][y] = cell;
    }
    if(cell.state === 4) {
      cell.state = 1;
      this.maze[x][y] = cell;
    }
    if(cell.state === 5) {
      cell.state = 1;
      this.maze[x][y] = cell;
    }
  }
}


const _Maze = new Maze();
export default _Maze;
