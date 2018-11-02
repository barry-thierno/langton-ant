import { ICell } from "./Cell";
import { ICoordinate, Orientation, IGridSize, IGridState } from "./Grid.model";
import * as R from "ramda";
import { withStateHandlers, StateHandler, StateHandlerMap } from "recompose";
import Grid from "./Grid";

export const initializeState = (gridSize: IGridSize): IGridState => {
  const { linesNumber, rowsNumber } = gridSize;
  const grid = buildInitialGrid(linesNumber, rowsNumber);
  const initialX = Math.trunc(linesNumber / 2);
  const initialY = Math.trunc(rowsNumber / 2);
  grid[initialX][initialY].isAntPosition = true;
  const antCoordinate: ICoordinate = {
    x: initialX,
    y: initialY,
    // tslint:disable-next-line:object-literal-sort-keys
    orientation: Orientation.NORTH
  };

  return {
    antCoordinate,
    grid
  };
};

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

export const getNextCoordinate = (
  currentCell: ICell,
  antCoordinate: ICoordinate
): ICoordinate => {
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

export const moveAnt = (configurationState: IGridState) => (): IGridState => {
  const { grid, antCoordinate } = configurationState;
  const newGrid = R.clone(grid);
  const currentCell = newGrid[antCoordinate.y][antCoordinate.x];
  currentCell.isAntPosition = !currentCell.isAntPosition;
  const newAntCoordinate = getNextCoordinate(currentCell, antCoordinate);
  newGrid[newAntCoordinate.y][newAntCoordinate.x].isAntPosition = true;
  currentCell.isBlack = !currentCell.isBlack;
  return {
    antCoordinate: newAntCoordinate,
    grid: newGrid
  };
};

export type StateUpdaters = StateHandlerMap<IGridState> & {
  moveAnt(): StateHandler<IGridState>;
};

const withStateHandler = withStateHandlers<
  IGridState,
  StateUpdaters,
  IGridSize
>(initializeState, {
  moveAnt
});

export default withStateHandler(Grid);
