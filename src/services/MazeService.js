import {BehaviorSubject} from "rxjs";
import {debounceTime} from "rxjs/operators";


import MazeGenerator from "./Maze/MazeGenerator";


import AWorker from '../worker/a.worker';
import BreathWorker from '../worker/breath.worker';
import DepthWorker from '../worker/depth.worker';
import DjikstraWorker from '../worker/djikstra.worker';
import WallWorker from '../worker/wall.worker';

const pathsInitialState = {
  wall: {'name': 'Wall Follower', path: [], visitedCells: []},
  depth: {'name': 'Depth First', path: [], visitedCells: []},
  breadth: {'name': 'Breadth first', path: [], visitedCells: []},
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

  aWorker = new AWorker();
  breathWorker = new BreathWorker();
  depthWorker = new DepthWorker();
  djikstraWorker = new DjikstraWorker();
  wallWorker = new WallWorker();

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
      if(!selected.visitedCells[i]) return;
      const x = selected.visitedCells[i]._x;
      const y = selected.visitedCells[i]._y;
      if(!this._maze[x][y]) return;
      const cell = this._maze[x][y];
      if(!cell) return;
      if([0,4].includes(cell.state)) {
        cell.state = 4;
      }
    }

    if(currentMove >= selected.visitedCells.length) {
      for(let i = 0; i < selected.path.length; i++) {
        if(!selected.path[i]) return;
        const x = selected.path[i]._x;
        const y = selected.path[i]._y;
        if(!this._maze[x][y]) return;
        const cell = this._maze[x][y];
        if(!cell) return;
        if([0,4,5].includes(cell.state)) {
          cell.state = 5;
        }
      }
    }
    this.canvasUpdate.next(null);
  }

  solve() {
    this.a();
    this.breath();
    this.depth();
    this.djika();
    this.wall();
  }




  a() {
    this.aWorker.postMessage([this._maze, this._start, this._end]);
    this.aWorker.addEventListener('message', event => {
      this._paths.a = event.data;
      this.paths.next(this._paths);
      if(this.selected.getValue().name === event.data.name) {
        this.selected.next(event.data);
      }
    });
  }

  breath() {
    this.breathWorker.postMessage([this._maze, this._start, this._end]);
    this.breathWorker.addEventListener('message', event => {
      this._paths.breadth = event.data;
      this.paths.next(this._paths);
      if(this.selected.getValue().name === event.data.name) {
        this.selected.next(event.data);
      }
    });
  }

  depth() {
    this.depthWorker.postMessage([this._maze, this._start, this._end]);
    this.depthWorker.addEventListener('message', event => {
        this._paths.depth = event.data;
        this.paths.next(this._paths);
        if(this.selected.getValue().name === event.data.name) {
          this.selected.next(event.data);
        }
    });
  }

  djika() {
    this.djikstraWorker.postMessage([this._maze, this._start, this._end]);
    this.djikstraWorker.addEventListener('message', event => {
      this._paths.dijkstra = event.data;
      this.paths.next(this._paths);
      if(this.selected.getValue().name === event.data.name) {
        this.selected.next(event.data);
      }
    });
  }

  wall() {
    this.wallWorker.postMessage([this._maze, this._start, this._end]);
    this.wallWorker.addEventListener('message', event => {
      this._paths.wall = event.data;
      this.paths.next(this._paths);
      if(this.selected.getValue().name === event.data.name) {
        this.selected.next(event.data);
      }
    });
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
