import React from "react";

import './Canvas.css';

import MazeService from "../../services/MazeService";
import CanvasService from "../../services/CanvasService";
import {BehaviorSubject} from "rxjs";

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.canvasRef = React.createRef();
    this.canvasService = null;
    this.mazeService = MazeService;
    this.mouse = new BehaviorSubject({x: 0, y:0});
    this.mouseDown = false;
    this.initialState = false;

    this.state = {
      canvasWidth: 2000,
    }
  }

  componentDidMount() {
    this.canvasService = new CanvasService(this.canvasRef.current, this.mazeService.size.getValue(), this.mazeService.maze.getValue());
    this.mazeService.maze.subscribe((maze) => {
      this.canvasService.maze = maze;
    });
    this.mazeService.size.subscribe((size) => {
      this.canvasService.size = size;
    });
    this.mouse.subscribe((value) => {
      if(this.mouseDown) {
        this.makeWall();
      }
    });
    this.canvasService.draw();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log(this.containerRef.current.innerWidth, ' ', this.containerRef.current.innerHeight)
  }

  makeWall() {
    const cell = this.getCellUnderMouse();
    if(!cell) return;
    if(cell.state === 2) return;
    if(cell.state === 3) return;
    if(this.initialState) {
      this.mazeService.makeWall(cell);
    } else {
      this.mazeService.removeWall(cell);
    }
  }

  getCellUnderMouse() {
    const {x, y} = this.mouse.getValue();
    const {clientWidth, clientHeight} = this.canvasRef.current;
    const mazeSize = this.mazeService.size.getValue();
    const cellHeight = clientHeight / mazeSize;
    const cellWidth = clientWidth / mazeSize;
    const cellX = Math.floor(x / cellWidth);
    const cellY = Math.floor(y / cellHeight);

    if(cellX > mazeSize || cellX < 0) return;
    if(cellY > mazeSize || cellY < 0) return;
    return this.mazeService.getCell(cellX,cellY);
  }

  _onMouseMove(e) {
    this.mouse.next({
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    });
  }

  _onMouseDown() {
    this.mouseDown = true;
    /** Check if we are building walls or clearing them. */
    let initialState = true;
    const cell = this.getCellUnderMouse();
    if(!cell) return;
    if(cell.state === 1) {
      initialState = false;
    }
    this.initialState = initialState;
    this.makeWall();
  }

  _onMouseUp() {
    this.mouseDown = false;
  }

  render() {
    return (
      <div className="container border border-primary" ref={this.containerRef}>
        <canvas className="border"
                onMouseDown={(event => this._onMouseDown(event))}
                onMouseUp={(event => this._onMouseUp(event))}
                onMouseMove={(event => this._onMouseMove(event))}
                onMouseLeave={(event => this._onMouseUp(event))}
                ref={this.canvasRef}
                width={this.state.canvasWidth + 'px'}
                height={this.state.canvasWidth + 'px'}
        />
      </div>
    )
  }
}


export default Canvas;
