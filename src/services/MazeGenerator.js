import Cell from './Cell';

class MazeGenerator {
  maze = [];
  start = {};
  end = {};

  constructor(size) {
    this.size = size;

    this.genCells();
    this.primMaze();

    this.randomCoalCells();

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

  primMaze() {

    let visited = [];
    let frontier = [];

    let currentCell = this.maze[0][0];
    visited.push(currentCell);

    /** All cells to walls */
    this.maze.forEach(row => {
      row.forEach(cell => {
        cell.state = 1;
      });
    });

    do {
      if (currentCell) {
        currentCell.state = 0;
      }
      // 4. Add all unvisited cells that are adjacent to the current cell to the frontier set.
      let neighbours = this.getNeighbourCells(currentCell, 2);
      neighbours = neighbours.filter((cell) => !visited.includes(cell));
      if(neighbours.length > 0) {
        neighbours.forEach((cell) => {
          if(!frontier.includes(cell)) {
            frontier.push(cell);
          }
        });
      }
      // 5. Choose a cell randomly from the frontier set and make it the current cell,
      // removing it from the frontier set and adding it to the visited set.
      let nextCell = frontier[Math.floor(Math.random() * frontier.length)];
      visited.push(nextCell);
      frontier = frontier.filter((cell) => JSON.stringify(cell) !== JSON.stringify(nextCell));

      // console.log(`Current cell ${currentCell.x} | ${currentCell.y} , next cell  ${nextCell.x} | ${nextCell.y}`)
      // console.log(`Frontier length ${frontier.length}`)
      /** Make two random cells not wall */
      let temp = this.getNeighbourCells(currentCell);
      if(temp.length > 0) {
        let tempCell = temp[Math.floor(Math.random() * temp.length)]
        tempCell.state = 0;
        if(temp.length > 1) {
          tempCell = temp[Math.floor(Math.random() * temp.length)]
          tempCell.state = 0;
        }
      }

      currentCell = nextCell;

    } while (frontier.length > 0)
  }

  randomCell() {
    let x = Math.floor(Math.random() * Math.floor(this.size));
    let y = Math.floor(Math.random() * Math.floor(this.size));
    return this.maze[x][y];
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

  getNeighbourCells(cell, dist = 1) {
    let neighbours = [];
    /** All possible neighbour cells. */
    neighbours.push(this.maze?.[cell.x]?.[cell.y-dist]);
    neighbours.push(this.maze?.[cell.x]?.[cell.y+dist]);
    neighbours.push(this.maze?.[cell.x-dist]?.[cell.y]);
    neighbours.push(this.maze?.[cell.x+dist]?.[cell.y]);

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
