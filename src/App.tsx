// import { CircularProgress } from "material-ui";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as React from 'react';
import './App.css';
import Grid from './grid/Grid';
import { AppBar } from 'material-ui';

export default () => (
  <MuiThemeProvider>
    <AppBar title="Langton Ant" />
    <div className="center">
      {/* <CircularProgress size={180} thickness={5} /> */}
      <Grid lineNumber={21} rowNumber={21} />
    </div>
  </MuiThemeProvider>
);
