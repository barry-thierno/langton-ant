import { ICell } from "./Cell";

export enum Orientation {
  NORTH = "north",
  SOUTH = "south",
  EAST = "east",
  WEST = "west"
}
export interface ICoordinate {
  readonly x: number;
  readonly y: number;
  readonly orientation: Orientation;
}

export interface IGridSize {
  linesNumber: number;
  rowsNumber: number;
}
export interface IGridState {
  grid: ICell[][];
  antCoordinate: ICoordinate;
}
