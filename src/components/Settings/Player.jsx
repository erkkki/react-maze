import React from "react";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFastBackward, faFastForward, faPlay, faStop } from "@fortawesome/free-solid-svg-icons";
import MazeService from "../../services/MazeService";


class Player extends React.Component {
  timer = null;
  mazeService = MazeService;
  constructor(props) {
    super(props);
    this.state = {
      path: [],
      visitedCells: [],
      name: '',
      currentMove: 0,
    }
  }

  componentDidMount() {
    this.mazeService.selected.subscribe((value) => {
      let move = Math.floor(1/ this.state.visitedCells.length * this.state.currentMove * value.visitedCells.length);
      if(isNaN(move)) move = 0;

      this.setState({
        ...this.state,
        name: value.name,
        path: value.path,
        visitedCells: value.visitedCells,
        currentMove: move,
      });
      this.mazeService.currentMove.next(move);
    });
  }

  _onChange(e) {
    // this.playerService.goTo(e.target.value);
    this.setState({
      ...this.state,
      currentMove: e.target.value,
    });
    this.mazeService.currentMove.next(e.target.value);
  }
  goTo(val) {
    this.setState({
      ...this.state,
      currentMove: val,
    });
    this.mazeService.currentMove.next(val);
  }

  stop() {
    clearTimeout(this.timer);
    this.timer = null;
  }
  play() {
    if(this.timer === null) {
      this.nextMove();
    }
  }
  nextMove() {
    let move = this.state.currentMove;
    const {visitedCells} = this.state;
    move++;

    if(move > visitedCells.length) {
      this.stop();
      return;
    }
    this.setState({
      ...this.state,
      currentMove: move,
    });
    this.mazeService.currentMove.next(move);
    this.timer = setTimeout(() => this.nextMove(), 50);
  }

  render() {
    const center = {
      textAlign: "center",
    }
    const {path, visitedCells, currentMove} = this.state;

    return (
      <div style={center}>
        <div className="btn-group border" role="group" aria-label="player">
          <button type="button" onClick={() => this.goTo(0)} className="btn btn-primary"><FontAwesomeIcon icon={faFastBackward} /></button>
          <button type="button" onClick={() => this.play()} className="btn btn-primary"><FontAwesomeIcon icon={faPlay} /></button>
          <button type="button" onClick={() => this.stop()} className="btn btn-primary"><FontAwesomeIcon icon={faStop} /></button>
          <button type="button" onClick={() => this.goTo(visitedCells.length)} className="btn btn-primary"><FontAwesomeIcon icon={faFastForward} /></button>
        </div>
        <label htmlFor="customRange1" className="form-label">
          Path: {path.length} , visited: {visitedCells.length}, current: {currentMove}
        </label>
        <input type="range" className="form-range" id="customRange1" style={{width : "100%"}}
               min="0" max={visitedCells.length} step="1"
               value={currentMove} onChange={(e) => this._onChange(e)}/>
      </div>
    );
  }
}

export default Player;
