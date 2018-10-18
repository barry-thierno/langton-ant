// import { buildInitialGrid } from './Grid';

// describe('buildInitialGrid', () => {
//   it('should build initialize grid  ', () => {
//     const grid = buildInitialGrid(21, 21);
//     const { lines } = grid;
//     expect(lines).toHaveLength(21);
//     lines.forEach((line, x) => {
//       const { rows } = line;
//       expect(rows).toHaveLength(21);
//       rows.forEach((cell, y) => {
//         if (x === Math.trunc(21 / 2) && y === Math.trunc(21 / 2)) {
//           expect(cell).toEqual({
//             isAntPosition: true,
//             isBasicColor: false
//           });
//         } else {
//           expect(cell).toEqual({
//             isAntPosition: false,
//             isBasicColor: false
//           });
//         }
//       });
//     });
//   });
// });
// describe('Ant moves rules', () => {
//   const initialGrid = buildInitialGrid(21, 21);
//   const antMoves: ICoordinate[] = [
//     { x: 11, y: 11, orientation: Orientation.NORTH },
//     { x: 12, y: 11, orientation: Orientation.EAST },
//     { x: 12, y: 12, orientation: Orientation.SOUTH },
//     { x: 11, y: 12, orientation: Orientation.WEST },
//     { x: 11, y: 11, orientation: Orientation.NORTH },
//     { x: 10, y: 11, orientation: Orientation.WEST },
//     { x: 10, y: 10, orientation: Orientation.NORTH },
//     { x: 11, y: 10, orientation: Orientation.EAST },
//     { x: 11, y: 11, orientation: Orientation.SOUTH },
//     { x: 10, y: 11, orientation: Orientation.WEST },
//     { x: 10, y: 10, orientation: Orientation.SOUTH }
//   ];
//   const initialCourse: ICourse = {
//     grid: initialGrid,
//     // tslint:disable-next-line:object-literal-sort-keys
//     antCoordinate: { x: 11, y: 11, orientation: Orientation.NORTH }
//   };
//   it('from initial grid should flip color and turn right', () => {
//     const course = moveAnt(initialCourse);
//   });
// });
