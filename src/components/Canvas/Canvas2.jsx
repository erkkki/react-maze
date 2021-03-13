import React from "react";

import './Canvas.css';


import Maze from "../../services/Maze/Maze";

class Canvas2 extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
    this.canvasService = Maze.canvas;
    this.mazeService = Maze;
    this.state = {
      canvasWidth: 2000,
    }
  }

  componentDidMount() {
    this.updateCanvas();
    this.mazeService.update.subscribe(() => this.forceUpdate());
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.updateCanvas();
  }

  updateCanvas() {
    const context = this.canvasRef.current.getContext('2d');
    context.drawImage(this.canvasService.canvas, 0, 0);
  }

  render() {
    return (
      <div className="container border" ref={this.container}>
        <canvas className="border"
                ref={this.canvasRef}
                width={this.state.canvasWidth}
                height={this.state.canvasWidth}
        />
      </div>
    )
  }
}


export default Canvas2;
