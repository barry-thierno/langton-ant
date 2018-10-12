import * as React from 'react';
import 'jest-enzyme';
import {   ReactWrapper, mount } from 'enzyme';
import { defineFeature, loadFeature } from "jest-cucumber";
import App from 'src/App';

const feature = loadFeature("./src/grid/grid.feature");

defineFeature(feature, test => {
    
    let wrapper: ReactWrapper;
  test("My initial conditions", ({ given, when, then, pending }) => {
    when("I launch application", () => {
        wrapper = mount(<App />);
    });
    then(/^I have a grid with (.*) lines, (.*) cells each line and an ant at the middle$/, (linesNumber, cellsNumber) => {
      const lines = wrapper.find(Line);
      expect(lines).toHaveLength(linesNumber)
      lines.forEach((line, x)=> {
          const cells =line.find(Cell);
          expect(cells).toHaveLength(cellsNumber)
          cells.forEach((cell, y)=> {
            if(x === linesNumber/ 2 && y === cellsNumber/2) {
                expect(cell.hasClass('ant')).toBe(true);
            }else {
                expect(cell.hasClass('ant')).toBe(false);
            }
          })
      })
    });
    then(/^I have a Material AppBar with title "(.*)"$/, title => {
      pending();
    });
    then("I have a play button on AppBar", () => {
      pending();
    });
  });