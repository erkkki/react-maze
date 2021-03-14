import './App.css';
import React from "react";


import Header from "./Header/Header"
import Settings from "./Settings/Settings";
import Canvas from "./Canvas/Canvas";

import Maze from "../services/MazeService";


class App extends React.Component {

  constructor(props) {
    super(props);
    this.maze = Maze;
  }

  render() {
    return (
      <div className="App">
        <Header maze={this.maze} />
        <div className="container-fluid">
          <div className="row">
            <div className="col-4">
              <Settings maze={this.maze}/>
            </div>
            <div className="col-8">
              <Canvas maze={this.maze} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
