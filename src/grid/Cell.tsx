import * as React from "react";
import { ICoordinate } from "./Grid.model";

export interface ICell {
  isAntPosition: boolean;
  isBlack: boolean;
  antCoordinate: ICoordinate;
}
const Cell: React.SFC<ICell> = ({ isAntPosition, isBlack, antCoordinate }) => {
  const cellClass = isBlack ? "cell black-cell" : "cell";
  return (
    <div className={cellClass}>
      {isAntPosition && (
        <img className={`${antCoordinate.orientation}-ant`} src="ant.png" />
      )}
    </div>
  );
};

export default Cell;
