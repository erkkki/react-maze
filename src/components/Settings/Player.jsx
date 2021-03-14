import React from "react";

import Maze from "../../services/MazeService";
import Solver from "../../services/Solver";


class Player extends React.Component {

  timer = null;

  constructor(props) {
    super(props);
    this.solver = Solver;
    this.maze = props.maze;
    this.state = {
      currentMove: 0,
      pathLength: 0,
      path: [],
      moves: [],
    };
    this._onChange = this._onChange.bind(this);
    this.playSolution = this.playSolution.bind(this);
  }

  componentDidMount() {
    this.solver.update.subscribe(() => {
      this.setState({
        ...this.state,
        path: this.solver.path,
        moves: this.solver.moves,
      });
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    for (let i = 0; i < this.state.moves.length; i++) {
      const cell = this.state.moves[i];
      if(cell.state === 0 || cell.state === 4 || cell.state === 5) {
        if(i >= this.state.currentMove) {
          cell.state = 0;
        } else {
          cell.state = 4;
        }
      }
    }
    if(this.state.moves.length <= this.state.currentMove) {
      this.state.path.forEach(cell => {
        if(cell.state === 4) {
          cell.state = 5;
        }
      });
    }
    Maze.update.next();
  }

  _onChange(e) {
    this.setState({
      ...this.state,
      currentMove: parseInt(e.target.value),
    });
  }

  playSolution() {
    this.maze.update.next();
    let i = this.state.currentMove + 1;
    if(i > this.state.moves.length) {
      return;
    }
    this.setState({
      ...this.state,
      currentMove: i,
    });
    this.timer = setTimeout(() => {
      this.playSolution();
    }, 50)
  }

  render() {
    const {moves, path, currentMove } = this.state;
    return (
      <div className="col-12">
        <button className="btn btn-primary" onClick={this.playSolution}> play</button>
        <div className="col-12">
          <label htmlFor="customRange1" className="form-label">
            {moves.length} moves, path {path.length}
          </label>
       </div>
        <div className="col-12">
          <input type="range" className="form-range" id="customRange1"
                 min="0" max={moves.length} step="1"
                 value={currentMove} onChange={this._onChange}/>
        </div>
      </div>
    );
  }
}

export default Player;
