import Cell from './Cell';

class MazeGenerator {
  maze = [];
  start = {};
  end = {};
  visited = [];

  constructor(size) {
    this.size = size;

    this.genCells();
    this.randomCoalCells();

    this.genWalls();

    return this.maze;
  }

  genCells() {
    const height = this.size;
    const width = this.size;

    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        row.push(new Cell(i,j));
      }
      this.maze.push(row);
    }
  }

  randomCoalCells() {
    const height = this.size;
    const width = this.size;

    let startX = Math.floor(Math.random() * Math.floor(height));
    let startY = Math.floor(Math.random() * Math.floor(width));

    this.maze[startX][startY].state = 2;
    this.start = this.maze[startX][startY];

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

  genWalls() {
    // Randomized Prim's algorithm
    //   Start with a grid full of walls.
    //     Pick a cell, mark it as part of the maze. Add the walls of the cell to the wall list.
    //     While there are walls in the list:
    //     Pick a random wall from the list. If only one of the two cells that the wall divides is visited, then:
    //   Make the wall a passage and mark the unvisited cell as part of the maze.
    //     Add the neighboring walls of the cell to the wall list.
    //     Remove the wall from the list.
    this.maze.forEach(row => {
      row.forEach(cell => {
        if(cell.state === 0) {
          cell.state = 1;
        }
      });
    });

    let currentCell = this.start;

    while(true) {
      let neighbours = this.getNeighbourCells(currentCell);
      neighbours = neighbours.filter(cell => !this.visited.includes(cell));
      neighbours = neighbours.filter(cell => cell.state === 1);

      if(neighbours.length === 0) {
        break;
      }

      let random = neighbours[Math.floor(Math.random() * neighbours.length)];
      random.state = 0;
      this.visited.push(random);

      currentCell = random;

      neighbours.forEach(cell => this.visited.push(cell));
    }
  }

  getNeighbourCells(cell) {
    let neighbours = [];
    /** All possible neighbour cells. */
    neighbours.push(this.maze?.[cell.x]?.[cell.y-1]);
    neighbours.push(this.maze?.[cell.x]?.[cell.y+1]);
    neighbours.push(this.maze?.[cell.x-1]?.[cell.y]);
    neighbours.push(this.maze?.[cell.x+1]?.[cell.y]);

    /** Filter out out of bound cells */
    neighbours = neighbours.filter(cell => cell !== undefined);
    return neighbours;
  }

  /** Distance between 2 points */
  distance(cell1, cell2) {
    return Math.sqrt(
      (
        Math.pow(cell2.x - cell1.x, 2) +
        Math.pow(cell2.y - cell1.y, 2)
      )
    );
  }
}

export default MazeGenerator;
