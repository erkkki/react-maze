class HeatMap {

  constructor(maze) {
    this.maze = maze;
    this.size = maze.size.getValue();

    this.genHeatMap();

  }

  genHeatMap() {
    this.maze.maze.forEach(row => {
      row.forEach(cell => {
        if(cell.state === 0) {
          this.colorCell(cell);
        }
      });
    });
    this.maze.update.next();
  }

  colorCell(cell) {
    const dist = this.distance(cell, this.maze.end);
    const heat = Math.floor(255 / this.size * dist);
    let hexHeat = heat.toString(16);

    if (hexHeat.length < 2) {
      hexHeat = '0' + hexHeat;
    }
    const color = '#ff' + hexHeat + hexHeat;

    /** Debug nice colors in console */
    // const css = 'color: ' + color;
    // console.log(`%c ${color}`, css)
    cell.color = color;
  }

  /** Distance between 2 points */
  distance(cell1, cell2) {
    return Math.sqrt(
      (
        Math.pow(cell2.x - cell1.x, 2) +
        Math.pow(cell2.y - cell1.y, 2)
      )
    );
  }
}

export default HeatMap;
