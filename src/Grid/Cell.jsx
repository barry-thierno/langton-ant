import * as React from 'react';
import PropTypes from 'prop-types';

const Cell = ({ isAntPosition, isBlack, antCoordinate }) => {
  const cellClass = isBlack ? 'cell black-cell' : 'cell';
  return (
    <div className={cellClass}>
      {isAntPosition && <img alt="ant-pic" className={`${antCoordinate.orientation}-ant`} src="ant.png" />}
    </div>
  );
};

export const linePropsType = {
  isAntPosition: PropTypes.bool.isRequired,
  isBlack: PropTypes.bool.isRequired,
  antCoordinate: PropTypes.isRequired
};
Cell.propTypes = linePropsType;

export default Cell;
