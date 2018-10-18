import * as R from 'ramda';
import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { ICell } from './Cell';
import './Grid.css';
import Line, { ILine } from './Line';

export interface IGrid {
  lines: ILine[];
}
export enum Orientation {
  NORTH = 'north',
  SOUTH = 'south',
  EAST = 'east',
  WEST = 'west'
}
export interface ICoordinate {
  x: number;
  y: number;
  orientation: Orientation;
}
export class ConfigurationState {
  public readonly grid: IGrid;
  public readonly antCoordinate: ICoordinate;
  constructor(linesNumber: number, rowsNumber: number) {
    this.grid = buildInitialGrid(linesNumber, rowsNumber);
    const initialX = Math.trunc(linesNumber / 2);
    const initialY = Math.trunc(rowsNumber / 2);
    this.grid.lines[initialX].rows[initialY].isAntPosition = true;
    this.antCoordinate = {
      x: initialX,
      y: initialY,
      // tslint:disable-next-line:object-literal-sort-keys
      orientation: Orientation.NORTH
    };
  }
}

const rowBuilder = (rowsNumber: number) => {
  return R.times((y: number) => {
    return {
      isAntPosition: false,
      isBlack: false
    } as ICell;
  }, rowsNumber);
};
export const buildInitialGrid = (linesNumber: number, rowsNumber: number) => {
  return {
    lines: R.times((x: number) => {
      return { rows: rowBuilder(rowsNumber) } as ILine;
    }, linesNumber)
  } as IGrid;
};

export const moveAnt = (configurationState: ConfigurationState) => {
  const { grid, antCoordinate } = configurationState;
  const newGrid = { ...grid };
  const currentCell = newGrid.lines[antCoordinate.y].rows[antCoordinate.x];
  currentCell.isAntPosition = !currentCell.isAntPosition;

  let newAntCoordinate: ICoordinate;
  switch (antCoordinate.orientation) {
    case Orientation.NORTH:
      newAntCoordinate = {
        ...antCoordinate,
        x: currentCell.isBlack ? antCoordinate.x - 1 : antCoordinate.x + 1,
        // tslint:disable-next-line:object-literal-sort-keys
        orientation: currentCell.isBlack ? Orientation.WEST : Orientation.EAST
      };
      break;
    case Orientation.EAST:
      newAntCoordinate = {
        ...antCoordinate,
        y: currentCell.isBlack ? antCoordinate.y - 1 : antCoordinate.y + 1,
        // tslint:disable-next-line:object-literal-sort-keys
        orientation: currentCell.isBlack ? Orientation.NORTH : Orientation.SOUTH
      };
      break;
    case Orientation.SOUTH:
      newAntCoordinate = {
        ...antCoordinate,
        x: currentCell.isBlack ? antCoordinate.x + 1 : antCoordinate.x - 1,
        // tslint:disable-next-line:object-literal-sort-keys
        orientation: currentCell.isBlack ? Orientation.EAST : Orientation.WEST
      };
      break;
    default:
      newAntCoordinate = {
        ...antCoordinate,
        y: currentCell.isBlack ? antCoordinate.y + 1 : antCoordinate.y - 1,
        // tslint:disable-next-line:object-literal-sort-keys
        orientation: currentCell.isBlack ? Orientation.SOUTH : Orientation.NORTH
      };
      break;
  }
  newGrid.lines[newAntCoordinate.y].rows[newAntCoordinate.x].isAntPosition = true;
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
export class Grid extends React.Component<IGridProps, ConfigurationState> {
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
        {this.state.grid.lines.map(line => (
          <Line rows={line.rows} antCoordinate={this.state.antCoordinate} />
        ))}
        <div className="play-btn">
          <RaisedButton label="Play" secondary={true} onClick={this.moveAnt} />
        </div>
      </div>
    );
  }
}

export default Grid;
