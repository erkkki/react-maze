class DepthFirst {

  path = [];
  visitedCells = [];

  constructor(maze) {
    this.maze = maze;
    this.start = maze.start;
    this.end = maze.end;
    this.currentCell = this.start;

    this.visitedCells.push(this.start);
    this.path.push(this.start);

    this.solve();
  }


  solve() {
    let counter = 0;
    while (JSON.stringify(this.currentCell) !== JSON.stringify(this.end)) {
      // if(JSON.stringify(this.currentCell) !== JSON.stringify(this.start)) {
      //   this.currentCell.color = '#8ac672';
      // }
      /** Failsafe */
      counter++;
      if(counter > 10000) break;

      const {x,y} = this.currentCell;
      let neighbours = this.getNeighbourCells(x,y);

      /** Backtrack if no neighbours */
      if(neighbours.length === 0) {
        this.currentCell =  this.path.pop();
      } else {

        this.path.push(this.currentCell);
        this.currentCell = neighbours[0];
        this.visitedCells.push(this.currentCell);

        // if(this.currentCell.state !== 2 && this.currentCell.state !== 3) {
        //   this.currentCell.color = '#72c354';
        // }
        this.maze.update.next();
      }
    }
    // this.paintPath(this.path);
  }


  paintPath(path) {
    path.forEach(cell => {
      if(cell.state === 0) {
        cell.color = '#5a7ac3';
        this.maze.update.next();
      }
    });
  }

  getNeighbourCells(x,y) {
    let neighbours = [];
    /** All possible neighbour cells. */
    neighbours.push(this.maze.maze?.[x]?.[y-1]);
    neighbours.push(this.maze.maze?.[x]?.[y+1]);
    neighbours.push(this.maze.maze?.[x-1]?.[y]);
    neighbours.push(this.maze.maze?.[x+1]?.[y]);

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
