import {compare, neighbours} from "./utils";

class DepthFirst {

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
      name: 'Depth First',
      path: this.path,
      visitedCells: this.visitedCells,
      info: 'The algorithm starts at the root node (selecting some arbitrary node as the root node in the case of a graph) and explores as far as possible along each branch before backtracking.',
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
      // eslint-disable-next-line no-loop-func
      neighboursCells.forEach((cell) => que.push(cell));
      /** Add cell connection to collection */
      // eslint-disable-next-line no-loop-func
      neighboursCells.forEach((cell) => this.collection.add({parent: currentCell, child: cell}));

      if(neighboursCells.length !== 0) {
        currentCell = neighboursCells[0];
      } else {
        if(que.length === 0) break;
        /** Sort que */
        que = que.filter((cell) => !this.visitedCells.includes(cell));
        currentCell = que.pop();
      }
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

export default DepthFirst;
