import './App.css';
import React from "react";


import Header from "./components/Header/Header"
import Canvas from "./components/Canvas/Canvas";
import Settings from "./components/Settings/Settings";

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Header />
        <div className="container-fluid">
          <div className="row">
            <div className="col-4">
              <Settings />
            </div>
            <div className="col-8">
              <Canvas />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
