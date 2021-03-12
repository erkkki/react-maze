import React from "react";

import Player from "./Player";

import Maze from "../../services/Maze/Maze";
import Solver from "../../services/Solver/Solver";
import HeatMap from "../../services/HeatMap";


class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.maze = Maze;
    this.solver = Solver;

    this.distanceHeatMap = this.distanceHeatMap.bind(this);
    this.solverStepForward = this.solverStepForward.bind(this);
    this.solverStepBack = this.solverStepBack.bind(this);
    this.removeWalls = this.removeWalls.bind(this);
  }

  distanceHeatMap() {
    new HeatMap(this.maze);
  }

  solverStepForward() {
    this.solver.solve();
    this.maze.update.next();
  }

  solverStepBack() {
    this.maze.update.next();
  }

  removeWalls() {
    this.maze.maze.forEach(row => {
      row.forEach(cell => {
        if (cell.state === 1) {
          cell.state = 0;
        }
      });
    });
    this.maze.update.next();
  }

  render() {
    return (
      <div className="container-fluid">
        <Player/>
        <div className="col-12">
          <button type="button"
                  onClick={this.distanceHeatMap}
                  className="btn btn-outline-primary">
            Distance Heat Map
          </button>
        </div>
        <div className="col-12">
          <button type="button"
                  onClick={this.solverStepForward}
                  className="btn btn-outline-primary">
            Solve
          </button>
        </div>
        <div className="col-12">
          <button type="button"
                  onClick={this.solverStepBack}
                  className="btn btn-outline-primary">
            Template
          </button>
        </div>
        <div className="col-12">
          <button type="button"
                  onClick={this.removeWalls}
                  className="btn btn-outline-primary">
            Remove Walls
          </button>
        </div>
      </div>
    );
  }
}

export default Settings;
