import { times } from 'ramda';
import { withHandlers } from 'recompose';
import Grid from './Grid';

const rowBuilder = (isAntLine, rowsNumber) => {
  return times(y => {
    return {
      isAntPosition: isAntLine && y === Math.trunc(rowsNumber / 2) ? true : false,
      isBasicColor: false
    };
  }, rowsNumber);
};
const buildInitialGrid = ({ linesNumber, rowsNumber }) => () => {
  return {
    lines: times(x => {
      return { rows: rowBuilder(x === Math.trunc(linesNumber / 2) ? true : false, rowsNumber) };
    }, linesNumber)
  };
};

const enhance = withHandlers({ buildInitialGrid });
export default enhance(Grid);
