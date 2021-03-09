import React from "react";
import './Header.css';

import Maze from "../../services/Maze";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.maze = Maze;
    this.state = {
      size: Maze.size.getValue()
    };
    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
    this.newMaze = this.newMaze.bind(this);

  }

  handleChange(e) {
    const target = e.target;
    // const name = target.name;
    let value = parseInt(target.value);

    if(value <= 3) {
      value = 3;
    }
    if(value > 100) {
      value = 100;
    }

    this.maze.setSize(value);

    this.setState({
      size: value
    });
  }

  newMaze() {
    this.maze.genMaze();
    this.maze.update.next();
  }

  reset() {
    const size = 10;
    this.maze.setSize(size);
    this.setState({
      size: size
    });
  }



  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Maze generator & solver</span>
          <form className="d-flex">
            <div className="input-group mb-3">
              <button type="button"
                      onClick={this.newMaze}
                      className="btn btn-outline-primary">
                New Maze
              </button>
              <button type="button"
                      onClick={this.reset}
                      className="btn btn-outline-danger">
                reset
              </button>
              <span className="input-group-text" id="basic-addon1">Size</span>
              <input className="form-control me-2"
                     name="width"
                     min={3}
                     max={100}
                     value={this.state.size}
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
