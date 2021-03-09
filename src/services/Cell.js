class Cell {

  constructor(x,y) {
    this._color = '#ffffff';
    this._state = 0;
    this._x = x;
    this._y = y;
    /** Random color for testing */
    // this._color = '#'+Math.random().toString(16).substr(2,6);
  }

  get x() {
    return this._x;
  }
  get y() {
    return this._y;
  }
  get state() {
    return this._state;
  }
  set state(value) {

    switch (value) {
      /** Wall */
      case 1: {
        this._color = '#000000';
        break;
      }
      /** Start cell */
      case 2: {
        this._color = '#d20909';
        break;
      }
      /** End cell */
      case 3: {
        this._color = '#0a5404';
        break;
      }
      /** Empty */
      default: {
        this._color = '#ffffff';
        break
      }
    }
    this._state = value;
  }


  get color() {
    return this._color;
  }

  set color(value) {
    this._color = value;
  }
}


export default Cell;
