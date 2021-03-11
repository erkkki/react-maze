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
  set x(value) {
    this._x = value;
  }
  get y() {
    return this._y;
  }
  set y(value) {
    this._y = value;
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
      /** Visited cell */
      case 4: {
        this._color = '#8ac672';
        break;
      }
      /** Visited path */
      case 5: {
        this._color = '#7298c6';
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
