import React from "react";

import './Canvas.css';

import CanvasService from "../../services/CanvasService";

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.canvasService = null;
    this.mazeService = props.maze;
    this.state = {
      canvasWidth: 2000,
      mouse: {
        mouseDown: false,
        initialState: false,
        x: 0,
        y: 0,
      }
    }
  }

  componentDidMount() {
    this.canvasService = new CanvasService(this.canvasRef.current, this.mazeService);
    this.mazeService.update.subscribe(() => this.updateCanvas());
    this.updateCanvas();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.updateCanvas();

    if(this.state.mouse.mouseDown) {
      this.makeWall();
    }
  }

  makeWall() {
    const cell = this.getCellUnderMouse();

    if(!cell) return;
    if(cell.state === 2) return;
    if(cell.state === 3) return;

    if(this.state.mouse.initialState) {
      cell.state = 1;
    } else {
      cell.state = 0;
    }
  }

  updateCanvas() {
    this.canvasService.draw();
  }

  getCellUnderMouse() {
    const {x, y} = this.state.mouse;
    const {clientWidth, clientHeight} = this.canvasRef.current;
    const mazeSize = this.mazeService.size.getValue();
    const cellHeight = clientHeight / mazeSize;
    const cellWidth = clientWidth / mazeSize;
    const cellX = Math.floor(x / cellWidth);
    const cellY = Math.floor(y / cellHeight);

    if(cellX > mazeSize || cellX < 0) return;
    if(cellY > mazeSize || cellY < 0) return;
    return this.mazeService.maze[cellX][cellY];
  }

  _onMouseMove(e) {
    this.setState({...this.state,
      mouse: {...this.state.mouse, x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY}
    });
  }
  _onMouseDown() {
    /** Check if we are building walls or clearing them. */
    let initialState = true;
    const cell = this.getCellUnderMouse();
    if(!cell) return;
    if(cell.state === 1) {
      initialState = false;
    }
    this.setState({...this.state,
      mouse: {...this.state.mouse, mouseDown: true, initialState}
    });
  }
  _onMouseUp() {
    this.setState({...this.state,
      mouse: {...this.state.mouse, mouseDown: false}
    });
  }

  render() {
    return (
      <div className="container border">
        <canvas className="border"
                onMouseDown={(event => this._onMouseDown(event))}
                onMouseUp={(event => this._onMouseUp(event))}
                onMouseMove={(event => this._onMouseMove(event))}
                onMouseLeave={(event => this._onMouseUp(event))}
                ref={this.canvasRef}
                width={this.state.canvasWidth}
                height={this.state.canvasWidth}
        />
      </div>
    )
  }
}


export default Canvas;
