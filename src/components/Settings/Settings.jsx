import React from "react";



import MazeService from "../../services/MazeService";
import SolveSelect from "./SolveSelect";


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
        <SolveSelect/>
      </div>
    );
  }
}

export default Settings;
