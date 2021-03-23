import React from "react";
import './Header.css';

import MazeService from "../../services/MazeService";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.mazeService = MazeService;
    this.state = {
      size: this.mazeService.size.getValue(),
    };
  }

  componentDidMount(){}

  componentWillUnmount() {}

  handleChange = (e) => {
    const target = e.target;
    let value = parseInt(target.value);
    this.newSize(value);
  }

  newSize(size) {
    if(isNaN(size)) {
      return;
    }
    if(size <= 10) {
      size = 10;
    }
    if(size > 100) {
      size = 100;
    }
    this.setState({
      size: size
    });
    this.mazeService.size.next(size);
  }

  newMaze = () => {
    this.mazeService.newMaze();
  }

  reset = () => {
    const size = 10;
    this.newSize(size);
    this.setState({
      size: size
    });
  }

// <div className="btn-group" role="group" aria-label="Basic example">
// <button type="button" className="btn btn-secondary">Left</button>
// <button type="button" className="btn btn-secondary">Middle</button>
// <button type="button" className="btn btn-secondary">Right</button>
// </div>

  render() {
    const { size } = this.state;
    return (
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Maze generator & solver</span>
          <form className="d-flex">
            <div className="input-group mb-3">
              <button type="button" className="btn btn-outline-primary" onClick={() => this.mazeService.removeWalls()}> Remove Walls</button>
              <button type="button"
                      className="btn btn-outline-primary"
                      onClick={this.newMaze}>
                New Maze
              </button>
              <button type="button"
                      className="btn btn-outline-danger"
                      onClick={this.reset}>
                Reset
              </button>
              <span className="input-group-text" id="basic-addon1">Size</span>
              <input className="form-control me-2"
                     name="width"
                     min={3}
                     max={100}
                     value={size}
                     onChange={this.handleChange}
                     type="number"
                     aria-label="Width" />
            </div>
          </form>
        </div>
      </nav>
    );
  }
}

export default Header;
