import {BehaviorSubject} from "rxjs";
import {debounceTime} from "rxjs/operators";

import MazeGenerator from "./Maze/MazeGenerator";

import DepthFirst from "./Solver/DepthFirst";
import BreadthFirst from "./Solver/BreadthFirst";
import Pledge from "./Solver/Pledge";
import Dijkstra from "./Solver/Dijkstra";
import Astar from "./Solver/Astar";
import WallFollower from "./Solver/WallFollower";

const pathsInitialState = {
  wall: {'name': 'Wall Follower', path: [], visitedCells: []},
  depth: {'name': 'Depth First', path: [], visitedCells: []},
  breadth: {'name': 'Breadth first', path: [], visitedCells: []},
  // pledge: {'name': 'Pledge', path: [], visitedCells: []},
  dijkstra: {'name': 'Dijkstra', path: [], visitedCells: []},
  a: {'name': 'A*', path: [], visitedCells: []},
};

class MazeService {

  _maze = [];
  _size = 10;
  _start = {};
  _end = {};
  _paths = pathsInitialState;

  currentMove = new BehaviorSubject(0);
  maze = new BehaviorSubject([]);
  canvasUpdate = new BehaviorSubject(null);
  size = new BehaviorSubject(10);
  paths = new BehaviorSubject(pathsInitialState);
  selected = new BehaviorSubject({'name': 'Depth First', path: [], visitedCells: []});
  // selected = new BehaviorSubject({'name': 'Depth First', path: [], visitedCells: []});


  constructor() {
    this.newMaze();

    this.solve();

    this.size.pipe(debounceTime(100)).subscribe((val) => {
      this._size = val;
      this.newMaze();
    });
    this.maze.pipe(debounceTime(100)).subscribe(() => {
      this.solve();
      this.paintVisitedCells();
    });
    this.paths.subscribe(() => this.paintVisitedCells());
    this.selected.subscribe(() => this.paintVisitedCells());
    this.currentMove.subscribe(() => this.paintVisitedCells());
  }

  resetMaze() {
    this._maze.forEach((row) => {
      row.forEach((cell) => {
        if(![0,1,2,3].includes(cell.state)) {
          cell.state = 0;
        }
      });
    });
  }

  paintVisitedCells() {
    this.resetMaze();
    const selected = this.selected.getValue();
    const currentMove = this.currentMove.getValue();

    for(let i = 0; i < currentMove; i++) {
      const cell = selected.visitedCells[i];
      if(!cell) return;
      if([0,4].includes(cell.state)) {
        cell.state = 4;
      }
    }

    if(currentMove >= selected.visitedCells.length) {
      for(let i = 0; i < selected.path.length; i++) {
        const cell = selected.path[i];
        if(!cell) return;
        if([0,4,5].includes(cell.state)) {
          cell.state = 5;
        }
      }
    }
    this.canvasUpdate.next(null);
  }

  solve() {
    // console.log('solve');
    const wall = this.wallFollower();
    const dep = this.depth();
    const breadth = this.breadhfirst();
    // const pledge = this.pledge();
    const djikastra = this.djikastra();
    const astar = this.astar();

    wall.then((value) => {
      this._paths.wall = value;
      this.paths.next(this._paths);
      if(this.selected.getValue().name === value.name) {
        this.selected.next(value);
      }
    });
    dep.then((value) => {
      this._paths.depth = value;
      this.paths.next(this._paths);
      if(this.selected.getValue().name === value.name) {
        this.selected.next(value);
      }
    });
    breadth.then((value) => {
      this._paths.breadth = value;
      this.paths.next(this._paths);
      if(this.selected.getValue().name === value.name) {
        this.selected.next(value);
      }
    });
    // pledge.then((value) => {
    //   this._paths.pledge = value;
    //   this.paths.next(this._paths);
    //   if(this.selected.getValue().name === value.name) {
    //     this.selected.next(value);
    //   }
    // });
    djikastra.then((value) => {
      this._paths.dijkstra = value;
      this.paths.next(this._paths);
      if(this.selected.getValue().name === value.name) {
        this.selected.next(value);
      }
    });
    astar.then((value) => {
      this._paths.a = value;
      this.paths.next(this._paths);
      if(this.selected.getValue().name === value.name) {
        this.selected.next(value);
      }
    });
  }

  async depth() {
    const {name, path, visitedCells } = await new DepthFirst(this._maze, this._start, this._end);
    return {name, path, visitedCells};
  }
  async wallFollower() {
    const {name, path, visitedCells } = await new WallFollower(this._maze, this._start, this._end);
    return {name, path, visitedCells};
  }
  async breadhfirst() {
    const {name, path, visitedCells } = await new BreadthFirst(this._maze, this._start, this._end);
    return {name, path, visitedCells};
  }
  async pledge() {
    const {name, path, visitedCells } = await new Pledge(this._maze, this._start, this._end);
    return {name, path, visitedCells};
  }
  async djikastra() {
    const {name, path, visitedCells } = await new Dijkstra(this._maze, this._start, this._end);
    return {name, path, visitedCells};
  }
  async astar() {
    const {name, path, visitedCells } = await new Astar(this._maze, this._start, this._end);
    return {name, path, visitedCells};
  }

  /** Returns cell with given x, y */
  getCell(x,y) {
    const maze = this._maze;
    return maze[x][y];
  }

  /** Generate new maze */
  newMaze() {
    const size = this._size;
    const mazeGen = new MazeGenerator(size);
    this._maze = mazeGen.maze;
    this.randomCoalCells();
    this.maze.next(this._maze);
  }

  /** Remove all walls */
  removeWalls() {
    const maze = this._maze;
    maze.forEach(row => {
      row.forEach(cell => {
        if(cell.state === 1) {
          cell.state = 0;
        }
      })
    });
    this.maze.next(this._maze);
  }

  /** Select random _end & finish cell */
  randomCoalCells() {
    /** Start cell */
    this._start = this.randomCell();
    this._start.state = 2;

    /** End Cell */
    while (true) {
      const end = this.randomCell();
      if(this.distance(this._start, end) > (this._size / 2)) {
        this._end = end;
        this._end.state = 3;
        break;
      }
    }
  }

  /** Return random cell inside maze */
  randomCell() {
    const x = Math.floor(Math.random() * Math.floor(this._size));
    const y = Math.floor(Math.random() * Math.floor(this._size));
    const maze = this._maze;
    return maze[x][y];
  }

  /** Distance between 2 cells */
  distance(cell1, cell2) {
    return Math.sqrt(
      (
        Math.pow(cell2.x - cell1.x, 2) +
        Math.pow(cell2.y - cell1.y, 2)
      )
    );
  }

  /** Make new wall */
  makeWall(cell) {
    const {x,y} = cell;
    this._maze[x][y].state = 1;
    this.maze.next(this._maze);
  }

  /** Remove wall */
  removeWall(cell) {
    const {x,y} = cell;
    this._maze[x][y].state = 0;
    this.maze.next(this._maze);
  }
}


const _Maze = new MazeService();
export default _Maze;
