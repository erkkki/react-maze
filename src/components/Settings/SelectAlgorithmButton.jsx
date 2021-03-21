import React from "react";

class SelectAlgorithmButton extends React.Component {
  static defaultProps = {
    status: {
      running: false,
      name: '',
      path: [],
      visitedCells: [],
    },
    selected: '',
    clickHandler: () => {},
  }


  render() {
    const name = this.props.status.name;
    const mazeSize = this.props.size;
    const status = this.props.status;
    const selected = (this.props.selected.name === this.props.status.name);
    const clickHandler = this.props.clickHandler;
    const pathBadge = {
      position: "absolute",
      top: "4px",
      right: "4px"
    };
    const visitedBadge = {
      position: "absolute",
      bottom: "4px",
      right: "4px"
    };
    return (
      <li className={`list-group-item ${!status.running? "list-group-item-primary" : "list-group-item-warning"}`}>
        <button type="button" onClick={() => clickHandler(status)}
                className={`btn btn-outline-primary ${selected? "active" : ""}`}>
          {name}
        </button>
        <div style={pathBadge}>
          <span className={`badge rounded-pill ${(status.path.length === 0 || status.path.length > (mazeSize * mazeSize -1))? "bg-danger" : "bg-success"}`}>Path: {status.path.length}</span>
        </div>
        <div style={visitedBadge}>
          <span className={`badge rounded-pill ${(status.path.length === 0 || status.visitedCells.length > (mazeSize * mazeSize - 1))? "bg-danger" : "bg-success"}`}>Visited cells: {status.visitedCells.length}</span>
        </div>
        {selected}
      </li>

    );
  }
}

export default SelectAlgorithmButton;
