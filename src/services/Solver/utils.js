/**
 * Returns distance between 2 cells.
 * @param cell1
 * @param cell2
 * @returns {number}
 */
export function distance(cell1, cell2) {
  return Math.sqrt((
    Math.pow(cell2.x - cell1.x, 2) +
    Math.pow(cell2.y - cell1.y,2)
  ));
}

/**
 * Get cell's neighbour cells.
 * Removes out of bounds cells & cells with walls.
 * @param maze
 * @param cell
 * @returns {*[]}
 */
export function neighbours(maze, cell) {
  if(!cell) return [];
  const {x, y} = cell;
  let neighbours = [];
  /** All possible neighbour cells. */
  neighbours.push(maze?.[x]?.[y-1]);
  neighbours.push(maze?.[x]?.[y+1]);
  neighbours.push(maze?.[x-1]?.[y]);
  neighbours.push(maze?.[x+1]?.[y]);
  /** Filter out out of bound cells */
  neighbours = neighbours.filter(cell => cell !== undefined);
  /** Filter out wall cells */
  neighbours = neighbours.filter(cell => cell.state !== 1);
  return neighbours;
}

/**
 * Compares two cells.
 * @param cell1
 * @param cell2
 * @returns {boolean}
 */
export function compare(cell1,cell2) {
  return (JSON.stringify(cell1) === JSON.stringify(cell2));
}

/**
 *
 * @param heading
 * @param currentCell
 * @returns {{}}
 */
export function getCellByHeading(maze,heading, currentCell) {
  const {x,y} = currentCell;
  let cell = {};
  if(heading > 280 || heading < -280) {
    heading = 0;
  }
  switch (heading) {
    case -270: {
      cell = maze?.[x-1]?.[y];
      break;
    }
    case -180: {
      cell = maze?.[x]?.[y+1];
      break;
    }
    case -90: {
      cell = maze?.[x+1]?.[y];
      break;
    }
    case 0: {
      cell = maze?.[x]?.[y-1];
      break;
    }
    case 90: {
      cell = maze?.[x-1]?.[y];
      break;
    }
    case 180: {
      cell = maze?.[x]?.[y+1];
      break;
    }
    case 270: {
      cell = maze?.[x+1]?.[y];
      break;
    }
    default: break;
  }
  return cell;
}
