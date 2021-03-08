import React, { Component, createRef } from 'react';
import './Canvas.css';

import Maze from "../../services/Maze";

class Canvas extends Component {

  constructor(props) {
    super(props);
    this.container = createRef();
    this.canvasRef = createRef();
    this.state = {
      mouseDown: false,
      mouse: {
        x: 0,
        y: 0,
      },
      mazeSize: Maze.size.getValue(),
      containerWidth: 100,
      containerHeight: 100,
      canvasWidth: 100,
      canvasHeight: 100,
    }
  }

  componentDidMount() {

    Maze.size.subscribe(value => {
      this.setState({
        mazeSize: value
      });
    });

    Maze.update.subscribe(val => {
      this.forceUpdate();
    });

    this.drawBorder();
    this.drawLines();
    this.drawCells();

    const containerWidth = this.container.current.offsetWidth;
    const containerHeight = this.container.current.offsetHeight;

    let canvasWidth = containerWidth * 0.8;
    let canvasHeight = containerWidth * 0.8;

    /** TODO sometimes canvas is bigger than screen */

    this.setState({
      containerWidth: containerWidth,
      containerHeight: containerHeight,
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
    const cells = Maze.maze;
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

  _onMouseMove(e) {
    this.setState({ mouse: {x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY}});

    if(this.state.mouseDown) {
      const {cellX, cellY} = this.getCellUnderMouse();
      if(Maze.maze[cellY][cellX].state !== 1) {
        this.makeWall({cellY, cellX});
      }
    }
  }

  getCellUnderMouse() {
    const {x, y} = this.state.mouse;
    const {width, height} = this.canvasRef.current;
    const cellHeight = height / this.state.mazeSize;
    const cellWidth = width / this.state.mazeSize;
    const cellX = Math.floor(y / cellHeight);
    const cellY = Math.floor(x / cellWidth);
    return {cellX, cellY};
  }

  makeWall({cellX, cellY}){
    Maze.makeWall(cellY, cellX);
    this.forceUpdate();
  }

  handleClick(e) {
    const {cellX, cellY} = this.getCellUnderMouse();
    this.makeWall({cellX, cellY});
  }

  handleMouseDown(e) {
    this.setState({mouseDown: true});
  }
  handleMouseUp(e) {
    this.setState({mouseDown: false});
  }


  render() {
    return (
      <div className="container" ref={this.container}>
        <canvas
          onClick={(event) => this.handleClick(event)}
                onMouseDown={(event => this.handleMouseDown(event))}
                onMouseUp={(event => this.handleMouseUp(event))}
                onMouseMove={(event => this._onMouseMove(event))}
                ref={this.canvasRef}
                width={this.state.canvasWidth}
                height={this.state.canvasWidth}
        />
      </div>
    );
  }
}

export default Canvas;
