import {compare, neighbours} from "./utils";

class BreadthFirst {

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
      name: 'Breadth First',
      path: this.path,
      visitedCells: this.visitedCells,
      info: 'djikarte vs breadh = djikarta que sorter, breadh fifo'
    };
  }

  solve() {
    let currentCell = this.start;
    let counter = 0;
    let que = [];

    this.visitedCells.push(currentCell);

    do {
      /** Failsafe */
      counter++;
      if(counter > this.maxCalculations) break;

      /** Get neighbours and add them to que */
      let neighboursCells = neighbours(this.maze, currentCell);
      neighboursCells = neighboursCells.filter((cell) => !this.visitedCells.includes(cell));
      neighboursCells = neighboursCells.filter((cell) => !que.includes(cell));
      neighboursCells.forEach((cell) => que.push(cell));
      /** Add cell connection to collection */
      // eslint-disable-next-line no-loop-func
      neighboursCells.forEach((cell) => this.collection.add({parent: currentCell, child: cell}));


      if(que.length === 0) break;

      /** Take first one from que */
      currentCell = que.splice(0,1)[0];

      /** Save to visited */
      this.visitedCells.push(currentCell);

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
      // eslint-disable-next-line no-loop-func
      this.collection.forEach((value) => {
        if(compare(value.child, currentCell)) {
          currentCell = value.parent;
        }
      });
      this.path.push(currentCell);
    } while (!compare(currentCell,this.start))
  }

}

export default BreadthFirst;
