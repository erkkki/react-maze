import React from "react";
import './Header.css';


import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.maze = props.maze;
    this.state = {
      size: this.maze.size.getValue(),
    };
    this.valueSubject$ = new Subject();
    this.handleChange = this.handleChange.bind(this);
    this.reset = this.reset.bind(this);
    this.newMaze = this.newMaze.bind(this);
  }

  componentDidMount(){
    this.subscription = this.valueSubject$
      .pipe(debounceTime(100))
      .subscribe((val) =>  this.maze.size.next(val));
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  handleChange(e) {
    const target = e.target;
    let value = parseInt(target.value);
    this.newSize(value);
  }

  newSize(size) {
    if(isNaN(size)) {
      return;
    }
    if(size <= 3) {
      size = 3;
    }
    if(size > 100) {
      size = 100;
    }
    this.setState({
      size: size
    });
    this.valueSubject$.next(size);
  }

  newMaze() {
    this.maze.genMaze();
  }

  reset() {
    const size = 10;
    this.newSize(size);
    this.setState({
      size: size
    });
  }



  render() {
    const { size } = this.state;
    return (
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Maze generator & solver</span>
          <form className="d-flex">
            <div className="input-group mb-3">
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
