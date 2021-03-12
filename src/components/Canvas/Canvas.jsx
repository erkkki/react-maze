import React from 'react';
import './Canvas.css';

import Maze from "../../services/Maze/Maze";

class Canvas extends React.Component {

  constructor(props) {
    super(props);
    this.maze = Maze;
    this.container = React.createRef();
    this.canvasRef = React.createRef();
    this.state = {
      mouseDown: false,
      mouseDownInitState: 0,
      mouse: {
        x: 0,
        y: 0,
      },
      mazeSize: this.maze.size.getValue(),
      canvasWidth: 100,
      canvasHeight: 100,
    }
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.maze.update.subscribe(() => {
      this.forceUpdate();
    });

    this.maze.size.subscribe(value => {
      this.setState({
        mazeSize: value
      });
    });
    this.drawCanvas();

    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    this.drawCanvas();
  }

  drawCanvas() {
    const windowHeight = window.innerHeight;
    const containerWidth = this.container.current.offsetWidth - 50;
    // const containerHeight = this.container.current.offsetHeight;

    let canvasWidth = containerWidth;
    let canvasHeight = containerWidth;

    if(canvasWidth > (windowHeight - 100)) {
      canvasWidth = windowHeight - 100;
      canvasHeight = windowHeight - 100;
    }

    this.drawBorder();
    this.drawLines();
    this.drawCells();

    this.setState({
      canvasWidth: canvasWidth,
      canvasHeight: canvasHeight,
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.clearCanvas();
    this.drawBorder();
    this.drawLines();
    this.drawCells();
  }

  drawCells() {
    const cells = this.maze.maze;
    cells.forEach((row) => {
      row.forEach((cell) => {
        this.drawCell(cell);
      })
    })
  }

  clearCanvas() {
    const {width, height} = this.canvasRef.current;
    const context = this.canvasRef.current.getContext('2d');
    context.clearRect(0, 0, width, height);
  }

  drawBorder() {
    const {width, height} = this.canvasRef.current;
    const context = this.canvasRef.current.getContext('2d');
    context.beginPath();
    context.moveTo(0,0);
    context.lineTo(width, 0);
    context.lineTo(width, height);
    context.lineTo(0, height);
    context.lineTo(0, 0);
    context.stroke();
  }



  drawLines() {
    const {width, height} = this.canvasRef.current;
    const context = this.canvasRef.current.getContext('2d');
    const cellHeight = height / this.state.mazeSize;
    const cellWidth = width / this.state.mazeSize;

    /** Vertical lines */
    for (let i = 0; i < this.state.mazeSize; i++) {
      context.beginPath();
      context.moveTo(0, i * cellHeight);
      context.lineTo(width, i * cellHeight);
      context.stroke();
    }
    /** Horizontal lines */
    for (let i = 0; i < this.state.mazeSize; i++) {
      context.beginPath();
      context.moveTo(i * cellWidth,0);
      context.lineTo(i * cellWidth, height);
      context.stroke();
    }
  }

  drawCell(cell) {
    const context = this.canvasRef.current.getContext('2d');
    const {width, height} = this.canvasRef.current;
    const cellHeight = height / this.state.mazeSize;
    const cellWidth = width / this.state.mazeSize;

    context.fillStyle = cell.color;
    context.fillRect(cellWidth * cell.x +1, cellHeight * cell.y +1, cellWidth -2, cellHeight -2);
  }

  getCellUnderMouse() {
    const {x, y} = this.state.mouse;
    const {width, height} = this.canvasRef.current;
    const cellHeight = height / this.state.mazeSize;
    const cellWidth = width / this.state.mazeSize;
    const cellX = Math.floor(x / cellWidth);
    const cellY = Math.floor(y / cellHeight);
    return this.maze.maze[cellX][cellY];
  }

  makeWall(){
    const cell = this.getCellUnderMouse();


    if (this.state.mouseDown) {

      if(cell.state === this.state.mouseDownInitState) {
        this.maze.makeWall(cell.x, cell.y);
      }
    } else {
      this.maze.makeWall(cell.x, cell.y);
    }
    this.forceUpdate();
  }

  _onMouseMove(e) {
    this.setState({ mouse: {x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY}});
    if(this.state.mouseDown) {
      this.makeWall();
    }
  }
  _onMouseDown() {
    const cell = this.getCellUnderMouse();
    this.setState({
      ...this.state,
      mouseDownInitState: cell.state,
    });
    this.setState({mouseDown: true});
    this.makeWall();
  }
  _onMouseUp() {
    this.setState({mouseDown: false});
  }
  _onMouseLeave() {
    this.setState({mouseDown: false});
  }

  render() {
    return (
      <div className="container" ref={this.container}>
        <canvas onMouseDown={(event => this._onMouseDown(event))}
                onMouseUp={(event => this._onMouseUp(event))}
                onMouseMove={(event => this._onMouseMove(event))}
                onMouseLeave={(event => this._onMouseLeave(event))}
                ref={this.canvasRef}
                width={this.state.canvasWidth}
                height={this.state.canvasWidth}
        />
      </div>
    );
  }
}

export default Canvas;
