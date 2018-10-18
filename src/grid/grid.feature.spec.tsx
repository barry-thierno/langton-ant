import * as React from 'react';
import { mount, configure, ReactWrapper } from 'enzyme';
import { defineFeature, loadFeature } from 'jest-cucumber';
import 'jest-enzyme';

import Cell from './Cell';
import App from '../App';
import 'core-js';
import 'jest-enzyme';

import * as Adapter from 'enzyme-adapter-react-16';
import { AppBar, RaisedButton } from 'material-ui';

configure({ adapter: new Adapter() });
const feature = loadFeature('./src/grid/grid.feature');

defineFeature(feature, test => {
  let wrapper: ReactWrapper;
  test('My initial conditions', ({ given, when, then, pending }) => {
    when('I launch application', () => {
      wrapper = mount(<App />);
    });
    then(
      /^I have a grid with (.*) lines, (.*) cells each line and an ant at the middle$/,
      (linesNumber, cellsNumber) => {
        const lines = wrapper.find('.line');
        expect(lines.length).toBe(Number.parseInt(linesNumber, 10));
        lines.forEach((line, x) => {
          const cells = line.find(Cell);
          expect(cells.length).toBe(Number.parseInt(cellsNumber, 10));
          cells.forEach((cell, y) => {
            if (x === Math.trunc(linesNumber / 2) && y === Math.trunc(cellsNumber / 2)) {
              expect(cell.find('img').exists()).toBe(true);
            } else {
              expect(cell.find('img').exists()).toBe(false);
            }
          });
        });
      }
    );
    then(/^I have a Material AppBar with title "(.*)"$/, title => {
      const appBar = wrapper.find(AppBar);
      expect(appBar.exists()).toBe(true);
      expect(appBar.props().title).toEqual(title);
    });
    then('I have a play button on AppBar', () => {
      expect(wrapper.find(RaisedButton).exists()).toBe(true);
    });
  });
});
