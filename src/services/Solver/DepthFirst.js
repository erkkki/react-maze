class DepthFirst {

  path = [];
  visitedCells = [];

  constructor(maze, start, end) {
    this.maze = maze;
    this.start = start;
    this.end = end;
    this.solve();

    return {
      path: this.path,
      visitedCells: this.visitedCells,
    };
  }


  solve() {
    this.currentCell = this.start;
    this.visitedCells.push(this.start);
    this.path.push(this.start);

    let counter = 0;
    while (JSON.stringify(this.currentCell) !== JSON.stringify(this.end)) {
      /** Failsafe */
      counter++;
      if(counter > 100000) break;

      if(!this.currentCell) {
        break;
      }
      const {x,y} = this.currentCell;
      let neighbours = this.getNeighbourCells(x,y);

      /** Backtrack if no neighbours */
      if(neighbours.length === 0) {
        this.currentCell =  this.path.pop();
      } else {

        this.path.push(this.currentCell);
        this.currentCell = neighbours[0];
        this.visitedCells.push(this.currentCell);
      }
    }
  }

  getNeighbourCells(x,y) {
    let neighbours = [];
    /** All possible neighbour cells. */
    neighbours.push(this.maze?.[x]?.[y-1]);
    neighbours.push(this.maze?.[x]?.[y+1]);
    neighbours.push(this.maze?.[x-1]?.[y]);
    neighbours.push(this.maze?.[x+1]?.[y]);

    /** Filter out out of bound cells */
    neighbours = neighbours.filter(cell => cell !== undefined);
    /** Filter out of wall cells */
    neighbours = neighbours.filter(cell => cell.state !== 1);
    /** Filter out all ready visited cells */
    neighbours = neighbours.filter(cell => {
      return !this.visitedCells.includes(cell);
    });
    /** Sort by shortest distance to end */
    neighbours.sort((a,b) => {
      const aDist = this.distance(a.x,a.y, this.end.x, this.end.y);
      const bDist = this.distance(b.x,b.y, this.end.x, this.end.y);
      return aDist - bDist;
    });
    return neighbours;
  }

  /** Distance between 2 points */
  distance(x1, y1, x2, y2) {
    return Math.sqrt(
      (
        Math.pow(x2 - x1, 2) +
        Math.pow(y2 - y1, 2)
      )
    );
  }

}

export default DepthFirst;
