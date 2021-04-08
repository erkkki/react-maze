import './App.css';
import React from "react";

import Header from "./Header/Header"
import Settings from "./Settings/Settings";
import Canvas from "./Canvas/Canvas";
import Player from "./Player";

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Header />
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4 col-sm-12">
              <div className="player border border-primary">
                <Player />
              </div>
              <div className="settings border border-primary">
                <Settings />
              </div>
            </div>
            <div className="col-md-8 col-sm-12">
                <Canvas />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
