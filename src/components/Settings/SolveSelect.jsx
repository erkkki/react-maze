import React from "react";

import MazeService from "../../services/MazeService";
import SelectAlgorithmButton from "./SelectAlgorithmButton";


class SolveSelect extends React.Component {
  constructor(props) {
    super(props);
    this.mazeService = MazeService;
    this.state = {
      selected: {'name': 'Depth First', path: [], visitedCells: []},
      paths: null,
    };
  }

  componentDidMount() {
    this.mazeService.paths.subscribe((val) => {
      this.setState({
        ...this.state,
        paths: val,
      })
    });
  }

  select = (value) => {
    this.setState({
      ...this.state,
      selected: value,
    });
    this.mazeService.selected.next(value);
  }

  render() {
    if(this.state.paths === null) return '';
    if(this.state.selected === null) return '';

    const {wall, depth, breadth, dijkstra, a} = this.state.paths;
    const selected = this.state.selected;
    const size = this.mazeService.size.getValue();


    return (
      <ul className="list-group">
        <SelectAlgorithmButton key={depth.name} selected={selected} status={depth} size={size} clickHandler={this.select} />
        <SelectAlgorithmButton key={wall.name} selected={selected} status={wall} size={size} clickHandler={this.select} />
        <SelectAlgorithmButton key={breadth.name} selected={selected} status={breadth} size={size}  clickHandler={this.select} />
        <SelectAlgorithmButton key={dijkstra.name} selected={selected} status={dijkstra} size={size}  clickHandler={this.select} />
        <SelectAlgorithmButton key={a.name} selected={selected} status={a} size={size}  clickHandler={this.select} />
      </ul>
    );
  }

}

export default SolveSelect
