import React from "react";
import Solver from "../../services/Solver";
import Maze from "../../services/Maze";


class Player extends React.Component {

  timer = null;

  constructor(props) {
    super(props);
    this.solver = Solver;
    this.state = {
      currentMove: 0,
      path: [],
      pathLength: 0,
      moves: [],
    }
    this._onChange = this._onChange.bind(this);
    this.playSolution = this.playSolution.bind(this);
  }

  componentDidMount() {
    /** TODO not updating state.path value */
    this.solver.path.subscribe(val => {
      console.log(`Path new length ${val.length}, state.path length  ${this.state.path.length}`)
      this.setState({
        ...this.state,
        path: val,
        pathLength: val.length,
      }, () => console.log(this.state));
      console.log(`Path new length ${val.length}, state.path new length ${this.state.path.length}`)
    });
    this.solver.moves.subscribe(val => {
      // console.log(val)
      this.setState({
        ...this.state,
        moves: val,
      });
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    for (let i = 0; i < this.state.moves.length; i++) {
      const cell = this.state.moves[i];
      if(cell.state === 0 || cell.state === 4) {
        if(i >= this.state.currentMove) {
          cell.state = 0;
        } else {
          cell.state = 4;
        }
      }
    }

    if(this.state.moves.length <= this.state.currentMove) {
      this.state.path.forEach(cell => cell.state = 5);
    }


    Maze.update.next();
  }

  _onChange(e) {
    this.setState({
      ...this.state,
      currentMove: parseInt(e.target.value),
    })
  }

  playSolution() {
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
    return (
      <div className="col-12">
        <button className="btn btn-primary" onClick={this.playSolution}> play</button>
        <div className="col-12">
          {this.state.moves.length}
          <label htmlFor="customRange1" className="form-label">Example range</label>
        </div>
        <div className="col-12">
          <input type="range" className="form-range" id="customRange1"
                 min="0" max={this.state.moves.length} step="1"
                 value={this.state.currentMove} onChange={this._onChange}/>
        </div>
      </div>
    );
  }
}

export default Player;
