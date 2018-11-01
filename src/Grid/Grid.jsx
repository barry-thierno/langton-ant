import React from 'react';
import * as R from 'ramda';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import Cell from './Cell';
import './Grid.css';

export const Orientation = {
  NORTH: 'north',
  SOUTH: 'south',
  EAST: 'east',
  WEST: 'west'
};
/**
 * The configuration is the representation of the GRID and ant Coodinate in the GRID
 */
export class ConfigurationState {
  grid;
  antCoordinate;
  constructor(linesNumber, rowsNumber) {
    this.grid = buildInitialGrid(linesNumber, rowsNumber);
    const initialX = Math.trunc(linesNumber / 2);
    const initialY = Math.trunc(rowsNumber / 2);
    this.grid[initialX][initialY].isAntPosition = true;
    this.antCoordinate = {
      x: initialX,
      y: initialY,
      orientation: Orientation.NORTH
    };
  }
}

const lineBuilder = columnsNumber =>
  R.times(
    () => ({
      isAntPosition: false,
      isBlack: false
    }),
    columnsNumber
  );

export const buildInitialGrid = (linesNumber, columnsNumber) => R.times(() => lineBuilder(columnsNumber), linesNumber);

const getNextCoordinate = (currentCell, antCoordinate) => {
  switch (antCoordinate.orientation) {
    case Orientation.NORTH:
      return {
        ...antCoordinate,
        x: currentCell.isBlack ? antCoordinate.x - 1 : antCoordinate.x + 1,
        orientation: currentCell.isBlack ? Orientation.WEST : Orientation.EAST
      };
    case Orientation.EAST:
      return {
        ...antCoordinate,
        y: currentCell.isBlack ? antCoordinate.y - 1 : antCoordinate.y + 1,
        orientation: currentCell.isBlack ? Orientation.NORTH : Orientation.SOUTH
      };
    case Orientation.SOUTH:
      return {
        ...antCoordinate,
        x: currentCell.isBlack ? antCoordinate.x + 1 : antCoordinate.x - 1,
        orientation: currentCell.isBlack ? Orientation.EAST : Orientation.WEST
      };
    default:
      return {
        ...antCoordinate,
        y: currentCell.isBlack ? antCoordinate.y + 1 : antCoordinate.y - 1,
        orientation: currentCell.isBlack ? Orientation.SOUTH : Orientation.NORTH
      };
  }
};
export const moveAnt = configurationState => {
  const { grid, antCoordinate } = configurationState;
  const newGrid = R.clone(grid);
  const currentCell = newGrid[antCoordinate.y][antCoordinate.x];
  currentCell.isAntPosition = !currentCell.isAntPosition;
  const newAntCoordinate = getNextCoordinate(currentCell, antCoordinate);
  newGrid[newAntCoordinate.y][newAntCoordinate.x].isAntPosition = true;
  currentCell.isBlack = !currentCell.isBlack;
  return {
    grid: newGrid,
    antCoordinate: newAntCoordinate
  };
};

class Grid extends React.PureComponent {
  constructor(props) {
    const { linesNumber, columnsNumber } = props;
    super(props);
    this.state = new ConfigurationState(linesNumber, columnsNumber);
  }

  moveAnt = () => {
    this.setState(moveAnt(this.state));
  };

  render() {
    return (
      <div className="grid">
        {this.state.grid.map(line => (
          <div className="line">
            {line.map(cell => (
              <Cell
                isAntPosition={cell.isAntPosition}
                isBlack={cell.isBlack}
                antCoordinate={this.state.antCoordinate}
              />
            ))}
          </div>
        ))}
        <div className="play-btn">
          <RaisedButton label="Play" secondary={true} onClick={this.moveAnt} />
        </div>
      </div>
    );
  }
}
Grid.propTypes = {
  linesNumber: PropTypes.number.isRequired,
  columnsNumber: PropTypes.number.isRequired
};

export default Grid;
