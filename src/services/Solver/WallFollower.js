import {compare, distance, neighbours, getCellByHeading} from "./utils";

class WallFollower {

  path = [];
  visitedCells = [];
  collection = new Set();

  constructor(maze, start, end) {
    this.maze = maze;
    this.start = start;
    this.end = end;
    this.maxCalculations = this.maze.length * this.maze.length * 2;

    this.solve();
    this.backTracePath();

    return {
      name: 'Wall Follower',
      path: this.path,
      visitedCells: this.visitedCells,
    };
  }


  solve() {
    let currentCell = this.start;
    let counter = 0;
    let heading = 0;

    this.visitedCells.push(currentCell);

    do {
      /** Failsafe */
      counter++;
      if(counter > this.maxCalculations) break;

      if(heading > 280 || heading < -280) {
        heading = 0;
      }


      let newCell = getCellByHeading(this.maze,heading,currentCell);
      let newCell2 = getCellByHeading(this.maze,(heading - 90),currentCell);

      if(newCell2 && newCell2.state !== 1) {
        newCell = newCell2;
        heading -= 90;
      }

      if(!newCell || newCell.state === 1) {
        heading += 90;
        if(heading > 280) {
          heading = 0;
        }
      } else {
        this.collection.add({parent: currentCell, child: newCell});
        currentCell = newCell;
        /** Save to visited */
        this.visitedCells.push(currentCell);
      }
    } while (!compare(currentCell, this.end))
  }


  backTracePath() {
    let counter = 0;
    let currentCell = this.visitedCells[this.visitedCells.length -1];

    /** Check if path found */
    if(!compare(currentCell, this.end)) {
      return;
    }

    /** Find end in collection */
    this.collection.forEach((value) => {
      if(compare(value.child, this.end)) {
        currentCell = value.parent;
      }
    });
    this.path.push(currentCell);

    /** Backtrack until start is found */
    do {
      /** Failsafe */
      counter++;
      if(counter > this.maxCalculations) {
        break;
      }
      /** Find new parent from collection */
      this.collection.forEach((value) => {
        if(compare(value.child, currentCell)) {
          currentCell = value.parent;
        }
      });
      this.path.push(currentCell);
    } while (!compare(currentCell,this.start))
  }
}

export default WallFollower;
