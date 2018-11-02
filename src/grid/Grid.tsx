import * as React from "react";
import RaisedButton from "material-ui/RaisedButton";
import Cell from "./Cell";
import "./Grid.css";
import { IGridSize, IGridState } from "./Grid.model";
import { StateUpdaters } from "./Grid.container";

const Grid: React.SFC<IGridState & StateUpdaters & IGridSize> = ({
  grid,
  moveAnt,
  antCoordinate
}) => {
  return (
    <div className="grid">
      {grid.map(line => (
        <div className="line">
          {line.map(cell => (
            <Cell
              isAntPosition={cell.isAntPosition}
              isBlack={cell.isBlack}
              antCoordinate={antCoordinate}
            />
          ))}
        </div>
      ))}
      <div className="play-btn">
        <RaisedButton label="Play" secondary={true} onClick={moveAnt} />
      </div>
    </div>
  );
};

export default Grid;
