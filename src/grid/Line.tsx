import * as React from 'react';
import Cell, { ICell } from './Cell';
import { ICoordinate } from './Grid';

export interface ILine {
  rows: ICell[];
  antCoordinate: ICoordinate;
}
const Line: React.SFC<ILine> = ({ rows, antCoordinate }) => {
  return (
    <div className="line">
      {rows.map(cell => (
        <Cell isAntPosition={cell.isAntPosition} isBlack={cell.isBlack} antCoordinate={antCoordinate} />
      ))}
    </div>
  );
};

export default Line;
