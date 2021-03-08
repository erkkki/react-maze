import Maze from "./Maze";

import DepthFirst from "./DepthFirst";

class Solver {



  solve() {
    const path = new DepthFirst(Maze);
    console.log(path);
  }


  distanceHeatMap() {
    const maze = Maze.maze;
    const start = Maze.start;
    const end = Maze.end;

    this.distance(start.x, start.y, end.x, end.y);

    maze.forEach((row, x) => {
      row.forEach((cell, y) => {
        if (cell.state === 0) {
          const dist = this.distance(x,y, end.x, end.y);
          cell.color = this.calcColor(dist);
        }
      });
    });
  }

  calcColor(dist) {
    let heat = Math.floor(255 - dist * 4) * 1;
    // console.log(heat)
    if (heat > 255)
      heat = 255;
    const color = '#ff' + heat.toString(16) + heat.toString(16);
    // console.log(color);
    return color;
  }

  /** Distance between 2 points by 0.00 digits */
  distance(x1, y1, x2, y2) {
    return Math.sqrt(
      (
        Math.pow(x2 - x1, 2) +
        Math.pow(y2 - y1, 2)
      )
    ).toFixed(2);
  }
}

const _Solver = new Solver();
export default _Solver;
