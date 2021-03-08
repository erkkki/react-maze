class Generator {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.maze = Array(this.width * this.height);
  }

  getMaze() {
    return this.maze;
  }
}


export default Generator;
