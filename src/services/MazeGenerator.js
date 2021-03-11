import Cell from './Cell';

class MazeGenerator {
  maze = [];
  start = {};
  end = {};

  constructor(size) {
    this.size = size;

    this.genCells();

    // this.genWalls();

    this.primMaxeTwo();
    // this.primMaze();

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

  primMaxeTwo() {

    let visited = [];
    let frontier = [];

    let currentCell = this.maze[0][0];
    visited.push(currentCell);

    this.genWalls();

    do {

      if (currentCell) {
        currentCell.state = 0;
      }
      // 4. Add all unvisited cells that are adjacent to the current cell to the frontier set.
      let neighbours = this.getNeighbourCells2(currentCell);
      neighbours = neighbours.filter((cell) => !visited.includes(cell));

      if(neighbours.length === 0) {
        break;
      }
      neighbours.forEach((cell) => {
        if(!frontier.includes(cell)) {
          frontier.push(cell);
        }
      });

      // 5. Choose a cell randomly from the frontier set and make it the current cell,
      // removing it from the frontier set and adding it to the visited set.
      let nextCell = frontier[Math.floor(Math.random() * frontier.length)];
      visited.push(nextCell);
      frontier = frontier.filter((cell) => JSON.stringify(cell) !== JSON.stringify(currentCell));

      let nextNeighbours = this.getNeighbourCells2(nextCell);
      nextNeighbours = nextNeighbours.filter(cell => visited.includes(cell));

      if(nextNeighbours.length > 0) {
        let tempX = nextCell.x + ((nextCell.x - nextNeighbours[0].x) / 2);
        let tempY = nextCell.y + ((nextCell.y - nextNeighbours[0].y) / 2);

        if(tempX < 0) tempX = 0;
        if(tempY < 0) tempY = 0;

        console.log(tempX +' '+ tempY);

        if(this.maze[tempX][tempY]) {
          this.maze[tempX][tempY].state = 0;
        } else {

        }
      }

      currentCell = nextCell;
    } while (frontier.length > 0)
  }

  primMaze() {
    let visited = [];
    let frontier = [];

    let currentCell = this.randomCell();
    visited.push(currentCell);


    do {
      // 4. Add all unvisited cells that are adjacent to the current cell to the frontier set.
      let neighbours = this.getNeighbourCells(currentCell);
      neighbours = neighbours.filter((cell) => !visited.includes(cell));

      neighbours.forEach((cell) => {
        if(!frontier.includes(cell)) {
          frontier.push(cell);
        }
      });
      // 5. Choose a cell randomly from the frontier set and make it the current cell,
      // removing it from the frontier set and adding it to the visited set.
      currentCell = frontier[Math.floor(Math.random() * frontier.length)];
      visited.push(currentCell);
      frontier = frontier.filter((cell) => JSON.stringify(cell) !== JSON.stringify(currentCell));


      /** TODO FIX */
      /** MAKE wall */
      currentCell = frontier[Math.floor(Math.random() * frontier.length)];
      visited.push(currentCell);
      frontier = frontier.filter((cell) => JSON.stringify(cell) !== JSON.stringify(currentCell));

      if(currentCell) {
        neighbours = this.getNeighbourCells(currentCell);
        neighbours = neighbours.filter((cell) => !visited.includes(cell));

        neighbours.forEach(cell => {
          frontier.push(cell);
        })

        if (neighbours.length > 1) {
          neighbours.length = neighbours.length - 1;
        }

        neighbours.forEach(cell => {
          visited.push(cell);
          cell.state = 1;
        });
      }
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

  genWalls() {
    this.maze.forEach(row => {
      row.forEach(cell => {
        if(cell.state === 0) {
          cell.state = 1;
        }
      });
    });

    let visited = [];

    let currentCell = this.start;

    while(true) {
      let neighbours = this.getNeighbourCells(currentCell);
      neighbours = neighbours.filter(cell => !visited.includes(cell));
      neighbours = neighbours.filter(cell => cell.state === 1);

      if(neighbours.length === 0) {
        break;
      }

      let random = neighbours[Math.floor(Math.random() * neighbours.length)];
      random.state = 0;
      visited.push(random);

      currentCell = random;

      neighbours.forEach(cell => visited.push(cell));
    }
  }

  getNeighbourCells2(cell) {
    let neighbours = [];
    /** All possible neighbour cells. */
    neighbours.push(this.maze?.[cell.x]?.[cell.y-2]);
    neighbours.push(this.maze?.[cell.x]?.[cell.y+2]);
    neighbours.push(this.maze?.[cell.x-2]?.[cell.y]);
    neighbours.push(this.maze?.[cell.x+2]?.[cell.y]);

    /** Filter out out of bound cells */
    neighbours = neighbours.filter(cell => cell !== undefined);
    return neighbours;
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
