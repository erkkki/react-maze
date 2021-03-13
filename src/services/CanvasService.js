class CanvasService {
  constructor(canvas, maze) {
    // this.canvas = new OffscreenCanvas(2000, 2000);
    // this._canvas = document.createElement('canvas');
    this._canvas = canvas;
    // this._canvas.width = 2000;
    // this._canvas.height = 2000;
    this.context = this._canvas.getContext('2d');

    this.maze = maze;
  }

  get canvas() {
    this.draw();
    return this._canvas;
  }

  draw() {
    this.clearCanvas();
    this.maze.maze.forEach(row => {
      row.forEach(cell => {
        this.drawCell(cell);
      });
    });
    this.drawLines();
  }

  drawCell(cell) {
    const {width, height} = this._canvas;
    const size = this.maze.size.getValue();
    const cellHeight = height / size;
    const cellWidth = width / size;
    this.context.fillStyle = cell.color;
    this.context.fillRect(
      cellWidth * cell.x +1, cellHeight * cell.y +1,
      cellWidth -2, cellHeight -2
    );
  }

  drawLines() {
    const {width, height} = this._canvas;
    const size = this.maze.size.getValue();
    const cellHeight = height / size;
    const cellWidth = width / size;

    /** Vertical lines */
    for (let i = 0; i < this.maze.size.getValue(); i++) {
      this.context.beginPath();
      this.context.moveTo(0, i * cellHeight);
      this.context.lineTo(width, i * cellHeight);
      this.context.stroke();
    }
    /** Horizontal lines */
    for (let i = 0; i < this.maze.size.getValue(); i++) {
      this.context.beginPath();
      this.context.moveTo(i * cellWidth,0);
      this.context.lineTo(i * cellWidth, height);
      this.context.stroke();
    }
  }

  clearCanvas() {
    const {width, height} = this._canvas;
    this.context.clearRect(0, 0, width, height);
  }
}

export default CanvasService;
