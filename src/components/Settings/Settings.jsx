import React from "react";

import Player from "./Player";


import Solver from "../../services/Solver";


class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.maze = props.maze;
    this.solver = Solver;

    this.solve = this.solve.bind(this);
  }

  solve() {
    this.solver.solve();
    this.maze.update.next();
  }

  render() {
    return (
      <div className="container-fluid">
        <Player maze={this.maze}/>
        <div className="col-12">
          <button type="button"
                  onClick={this.solve}
                  className="btn btn-outline-primary">
            Solve
          </button>
        </div>
      </div>
    );
  }
}

export default Settings;
