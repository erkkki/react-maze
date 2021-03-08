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


  async solve() {
    let counter = 0;
    while (JSON.stringify(this.currentCell) !== JSON.stringify(this.end)) {
      if(JSON.stringify(this.currentCell) !== JSON.stringify(this.start)) {
        this.currentCell.color = '#8ac672';
      }
      /** Failsafe */
      counter++;
      if(counter > 10000) break;

      const {x,y} = this.currentCell;
      let neighbours = this.getNeighbourCells(x,y);

      /** Backtrack if no neighbours */
      if(neighbours.length === 0) {
        const cell = this.path.pop();
        this.currentCell = cell;
      } else {
        this.currentCell = neighbours[0];
        this.visitedCells.push(this.currentCell);
        this.path.push(this.currentCell);
      }
      this.currentCell.color = '#72c354';
      this.maze.update.next();
      await new Promise(r => setTimeout(r, 100));
    }
    console.log(`Path length: ${this.path.length}`);
    console.log(`Visited cells length: ${this.visitedCells.length}`);
    return this.path;
  }

  getNeighbourCells(x,y) {
    let neighbours = [];
    neighbours.push(this.maze.maze?.[x]?.[y-1]);
    neighbours.push(this.maze.maze?.[x]?.[y+1]);
    neighbours.push(this.maze.maze?.[x-1]?.[y]);
    neighbours.push(this.maze.maze?.[x+1]?.[y]);

    neighbours = neighbours.filter(cell => cell !== undefined);
    neighbours = neighbours.filter(cell => cell.state !== 1);
    neighbours = neighbours.filter(cell => {
      return !this.visitedCells.includes(cell);
    });
    neighbours.sort((a,b) => {
      const aDist = this.distance(a.x,a.y, this.end.x, this.end.y);
      const bDist = this.distance(b.x,b.y, this.end.x, this.end.y);
      return aDist - bDist;
    });
    return neighbours;
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

export default DepthFirst;
