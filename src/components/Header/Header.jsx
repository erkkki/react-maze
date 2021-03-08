import React from "react";
import './Header.css';

import Maze from "../../services/Maze";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      size: Maze.size
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    // const name = target.name;
    let value = parseInt(target.value);

    if(value <= 10) {
      value = 10;
    }
    if(value > 100) {
      value = 100;
    }

    Maze.setSize(value);

    this.setState({
      size: value
    });
  }



  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Navbar</span>
          <form className="d-flex">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">Size</span>
              <input className="form-control me-2"
                     name="width"
                     min={10}
                     max={100}
                     value={this.state.size}
                     onChange={this.handleChange}
                     type="number"
                     placeholder="Width"
                     aria-label="Width" />
            </div>
          </form>
        </div>
      </nav>
    );
  }
}

export default Header;
