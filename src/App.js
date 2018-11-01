// import { CircularProgress } from "material-ui";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as React from 'react';
import './App.css';
import Grid from './Grid/Grid';
import { AppBar } from 'material-ui';

export default () => (
  <MuiThemeProvider>
    <AppBar title="Langton Ant" />
    <div className="center">
      <Grid linesNumber={21} columnsNumber={21} />
    </div>
  </MuiThemeProvider>
);
