import Cell from './Cell';

class MazeGenerator {

  _maze = [];

  constructor(size) {
    this.size = size;
    this.generateCells();
    this.primMaze();
  }

  get maze() {
    return this._maze;
  }

  generateCells() {
    const height = this.size;
    const width = this.size;

    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        row.push(new Cell(i,j));
      }
      this._maze.push(row);
    }
  }

  primMaze() {

    let visited = [];
    let frontier = [];

    let currentCell = this._maze[0][0];
    visited.push(currentCell);

    /** All cells to walls */
    this._maze.forEach(row => {
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
        // eslint-disable-next-line no-loop-func
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

  /** Return all possible neighbour cells. */
  getNeighbourCells(cell, dist = 1) {
    let neighbours = [];
    neighbours.push(this._maze?.[cell.x]?.[cell.y-dist]);
    neighbours.push(this._maze?.[cell.x]?.[cell.y+dist]);
    neighbours.push(this._maze?.[cell.x-dist]?.[cell.y]);
    neighbours.push(this._maze?.[cell.x+dist]?.[cell.y]);

    /** Filter out out of bound cells */
    neighbours = neighbours.filter(cell => cell !== undefined);
    return neighbours;
  }
}

export default MazeGenerator;
