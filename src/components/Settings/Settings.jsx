import React from "react";



import MazeService from "../../services/MazeService";
import SolveSelect from "./SolveSelect";

import Player from "./Player";


class Settings extends React.Component {

  constructor(props) {
    super(props);
    this.maze = MazeService;
  }

  selectHandler = (val) =>  {
    this.setState( {
      ...this.state,
      selected: val,
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <Player/>
        <SolveSelect/>
      </div>
    );
  }
}

export default Settings;
