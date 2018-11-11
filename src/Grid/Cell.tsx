import * as React from "react";
import PropTypes from "prop-types";
import { ICoordinate } from "./Grid";

export interface ICellProps {
  isAntPosition: boolean;
  isBlack: boolean;
  antCoordinate: ICoordinate;
}

const Cell: React.SFC<ICellProps> = ({
  isAntPosition,
  isBlack,
  antCoordinate
}) => {
  const cellClass = isBlack ? "cell black-cell" : "cell";
  return (
    <div className={cellClass}>
      {isAntPosition && (
        <img
          alt="ant-pic"
          className={`${antCoordinate.orientation}-ant`}
          src="ant.png"
        />
      )}
    </div>
  );
};

export default Cell;
