import {distance, neighbours, compare} from "./utils";

class Dijkstra {

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
      name: 'Djikstra',
      path: this.path,
      visitedCells: this.visitedCells,
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
      if(counter > this.maxCalculations) {
        break;
      }

      /** Found neighbours and push to que */
      let neighboursCells = neighbours(this.maze, currentCell);
      neighboursCells = neighboursCells.filter((cell) => !this.visitedCells.includes(cell));
      neighboursCells = neighboursCells.filter((cell) => !que.includes(cell));
      neighboursCells.forEach((cell) => que.push(cell));

      /** Add cell connection to collection */
      // eslint-disable-next-line no-loop-func
      neighboursCells.forEach((cell) => this.collection.add({parent: currentCell, child: cell}));

      if(que.length === 0) break;

      /** Sort que */
      que.sort((cell1, cell2) => {
        return distance(cell1, this.start) - distance(cell2, this.start);
      });

      /** Take first one from que */
      currentCell = que.splice(0,1)[0];


      this.visitedCells.push(currentCell);

    } while (!compare(currentCell,this.end));
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

export default Dijkstra;
