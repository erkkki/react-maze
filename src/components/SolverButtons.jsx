import React from "react";

import Maze from "../services/Maze";
import Solver from "../services/Solver";

import HeatMap from "../services/HeatMap";


class SolverButtons extends React.Component {

  constructor(props) {
    super(props);
    this.maze = Maze;
  }

  distanceHeatMap() {
    new HeatMap(Maze);
  }

  newMaze() {
    Maze.genMaze();
    Maze.update.next();
  }

  solverStepForward() {
    Solver.solve();
    Maze.update.next();
  }

  solverStepBack() {

    Maze.update.next();
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.distanceHeatMap} className="btn btn-outline-primary">Distance Heat Map</button>
        <br/>
        <button type="button" className="btn btn-outline-danger">Reset</button>
        <br/>
        <button type="button" onClick={this.newMaze} className="btn btn-outline-primary">New Maze</button>
        <br/>
        <button type="button" onClick={this.solverStepForward} className="btn btn-outline-primary">{"<- Solver"}</button>
        <button type="button" onClick={this.solverStepBack} className="btn btn-outline-primary">{"Solver ->"}</button>

      </div>
    );
  }
}

export default SolverButtons;
