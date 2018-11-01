import * as R from 'ramda';
import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Cell, { ICell } from './Cell';
import './Grid.css';

export enum Orientation {
  NORTH = 'north',
  SOUTH = 'south',
  EAST = 'east',
  WEST = 'west'
}
export interface ICoordinate {
  readonly x: number;
  readonly y: number;
  readonly orientation: Orientation;
}
export class ConfigurationState {
  public readonly grid: ICell[][];
  public readonly antCoordinate: ICoordinate;
  constructor(linesNumber: number, rowsNumber: number) {
    this.grid = buildInitialGrid(linesNumber, rowsNumber);
    const initialX = Math.trunc(linesNumber / 2);
    const initialY = Math.trunc(rowsNumber / 2);
    this.grid[initialX][initialY].isAntPosition = true;
    this.antCoordinate = {
      x: initialX,
      y: initialY,
      // tslint:disable-next-line:object-literal-sort-keys
      orientation: Orientation.NORTH
    };
  }
}

const lineBuilder = (rowsNumber: number) =>
  R.times(
    () =>
      ({
        isAntPosition: false,
        isBlack: false
      } as ICell),
    rowsNumber
  );

export const buildInitialGrid = (linesNumber: number, rowsNumber: number) =>
  R.times(() => lineBuilder(rowsNumber), linesNumber);

const getNextCoordinate = (currentCell: ICell, antCoordinate: ICoordinate): ICoordinate => {
  switch (antCoordinate.orientation) {
    case Orientation.NORTH:
      return {
        ...antCoordinate,
        x: currentCell.isBlack ? antCoordinate.x - 1 : antCoordinate.x + 1,
        // tslint:disable-next-line:object-literal-sort-keys
        orientation: currentCell.isBlack ? Orientation.WEST : Orientation.EAST
      };
    case Orientation.EAST:
      return {
        ...antCoordinate,
        y: currentCell.isBlack ? antCoordinate.y - 1 : antCoordinate.y + 1,
        // tslint:disable-next-line:object-literal-sort-keys
        orientation: currentCell.isBlack ? Orientation.NORTH : Orientation.SOUTH
      };
    case Orientation.SOUTH:
      return {
        ...antCoordinate,
        x: currentCell.isBlack ? antCoordinate.x + 1 : antCoordinate.x - 1,
        // tslint:disable-next-line:object-literal-sort-keys
        orientation: currentCell.isBlack ? Orientation.EAST : Orientation.WEST
      };
    default:
      return {
        ...antCoordinate,
        y: currentCell.isBlack ? antCoordinate.y + 1 : antCoordinate.y - 1,
        // tslint:disable-next-line:object-literal-sort-keys
        orientation: currentCell.isBlack ? Orientation.SOUTH : Orientation.NORTH
      };
  }
};
export const moveAnt = (configurationState: ConfigurationState) => {
  const { grid, antCoordinate } = configurationState;
  const newGrid = R.clone(grid);
  const currentCell = newGrid[antCoordinate.y][antCoordinate.x];
  currentCell.isAntPosition = !currentCell.isAntPosition;
  const newAntCoordinate = getNextCoordinate(currentCell, antCoordinate);
  newGrid[newAntCoordinate.y][newAntCoordinate.x].isAntPosition = true;
  currentCell.isBlack = !currentCell.isBlack;
  return {
    grid: newGrid,
    // tslint:disable-next-line:object-literal-sort-keys
    antCoordinate: newAntCoordinate
  };
};
export interface IGridProps {
  lineNumber: number;
  rowNumber: number;
}
// tslint:disable-next-line:max-classes-per-file
export class Grid extends React.PureComponent<IGridProps, ConfigurationState> {
  constructor(props: IGridProps) {
    super(props);
    this.state = new ConfigurationState(21, 21);
  }

  // tslint:disable-next-line:member-access
  readonly moveAnt = () => {
    this.setState(moveAnt(this.state));
  };
  // tslint:disable-next-line:member-access
  render(): React.ReactNode {
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

export default Grid;
