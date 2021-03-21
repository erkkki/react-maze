class CanvasService {

  counter = 0;
  running = false;
  fps = 10;

  constructor(canvas, size, maze) {
    this._canvas = canvas;
    this.context = this._canvas.getContext('2d');
    this._size = size;
    this._maze = maze;
    this.draw();
  }

  set size(val) {
    this._size = val;
  }
  set maze(val) {
    this._maze = val;
  }

  get canvas() {
    this.draw();
    return this._canvas;
  }

  draw() {
    setTimeout(() => {
      requestAnimationFrame(() => this.draw());
      this._draw();
    }, 1000 / this.fps);
  }

  _draw() {
    this.clearCanvas();
    this._maze.forEach(row => {
      row.forEach(cell => {
        this.drawCell(cell);
      });
    });
    this.drawLines();
  }

  drawCell(cell) {
    const {width, height} = this._canvas;
    const size = this._size;
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
    const size = this._size;
    const cellHeight = height / size;
    const cellWidth = width / size;

    /** Vertical lines */
    for (let i = 0; i < this._size; i++) {
      this.context.beginPath();
      this.context.moveTo(0, i * cellHeight);
      this.context.lineTo(width, i * cellHeight);
      this.context.stroke();
    }
    /** Horizontal lines */
    for (let i = 0; i < this._size; i++) {
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
