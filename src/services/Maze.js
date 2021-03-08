import {BehaviorSubject, Subject} from "rxjs";

import Cell from "./Cell";

class Maze {

  maze = [];
  start = {};
  end = {};

  constructor() {
    this.size = new BehaviorSubject(10);
    this.update = new Subject();
    this.genMaze();
  }

  randomCoalCells() {
    const height = this.size.getValue();
    const width = this.size.getValue();

    while (true) {
      let startX = Math.floor(Math.random() * Math.floor(height));
      let startY = Math.floor(Math.random() * Math.floor(width));

      if (this.maze[startX][startY].state === 0) {
        this.maze[startX][startY].state = 2;
        this.start = this.maze[startX][startY];
        break;
      }
    }

    while (true) {
      let endX = Math.floor(Math.random() * Math.floor(height));
      let endY = Math.floor(Math.random() * Math.floor(width));

      if (this.maze[endX][endY].state === 0) {
        this.maze[endX][endY].state = 3;
        this.end = this.maze[endX][endY];
        break;
      }
    }
  }

  genMaze() {
    const height = this.size.getValue();
    const width = this.size.getValue();

    this.maze = [];

    for (let j = 0; j < height; j++) {
      const row = [];
      for (let i = 0; i < width; i++) {
        row.push(new Cell(j,i));
      }
      this.maze.push(row);
    }

    this.randomCoalCells();

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
  }
}


const _Maze = new Maze();
export default _Maze;
