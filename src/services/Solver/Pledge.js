import {counter} from "@fortawesome/fontawesome-svg-core";
import {compare, distance, getCellByHeading, neighbours} from "./utils";

class Pledge {

  path = [];
  visitedCells = [];
  collection = new Set();

  constructor(maze, start, end) {
    this.maze = maze;
    this.start = start;
    this.end = end;
    this.maxCalculations = this.maze.length * this.maze.length * 2;

    this.solve();
    this.backTracePath();

    return {
      name: 'Pledge',
      path: this.path,
      visitedCells: this.visitedCells,
    };
  }


  solve() {
    let currentCell = this.start;
    let counter = 0;
    let heading = 0;
    let sumHeading = 0;
    const direction = 0;
    let state = 0; // 0 following direction, 1 wall following;

    this.visitedCells.push(currentCell);

    do {
      /** Failsafe */
      counter++;
      if(counter > this.maxCalculations) break;

      if(heading > 280 || heading < -280) {
        heading = 0;
      }

      let newCell = {};

      if(state === 0) {
        // Start by picking a direction, and always move in that direction when possible.
        newCell = getCellByHeading(this.maze, direction, currentCell);

        if(!newCell || newCell.state === 1) {
          state = 1;
        }
      }

      if(state === 1) {
        // When a wall is hit, start wall following until your chosen direction is available again.
        // When wall following, count the number of turns you make, e.g. a left turn is -1 and a right turn is 1.
        // Only stop wall following and take your chosen direction when the total number of turns you've made is 0, i.e.
        // if you've turned around 360 degrees or more, keep wall following until you untwist yourself.

        if(heading > 280 || heading < -280) {
          heading = 0;
        }

        console.log('h:' + heading + ' sum:' + sumHeading + ' coun:' + counter);

        if(heading === 0 && (sumHeading > 300 || sumHeading < -300)) {
          heading = 0;
          sumHeading = 0;
          state = 0;
        } else {
          newCell = getCellByHeading(this.maze,heading,currentCell);
          let newCell2 = getCellByHeading(this.maze,(heading - 90),currentCell);

          if(newCell2 && newCell2.state !== 1) {
            newCell = newCell2;
            heading -= 90;
            sumHeading -= 90;
          } else {
            if(!newCell || newCell.state === 1) {
              heading += 90;
              sumHeading += 90;
            }
          }
        }




      }

      if(newCell && newCell.state !== 1) {
        this.collection.add({parent: currentCell, child: newCell});
        currentCell = newCell;
        /** Save to visited */
        this.visitedCells.push(currentCell);
      }


    } while (!compare(currentCell, this.end))
  }

  backTracePath() {
    let counter = 0;
    let currentCell = this.visitedCells[this.visitedCells.length -1];

    /** Check if path found */
    if(!compare(currentCell, this.end)) {
      return;
    }

    /** Find end in collection */
    this.collection.forEach((value) => {
      if(compare(value.child, this.end)) {
        currentCell = value.parent;
      }
    });
    this.path.push(currentCell);

    /** Backtrack until start is found */
    do {
      /** Failsafe */
      counter++;
      if(counter > this.maxCalculations) {
        break;
      }
      /** Find new parent from collection */
      this.collection.forEach((value) => {
        if(compare(value.child, currentCell)) {
          currentCell = value.parent;
        }
      });
      this.path.push(currentCell);
    } while (!compare(currentCell,this.start))
  }
}

export default Pledge;
