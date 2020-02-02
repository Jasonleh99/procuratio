import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Landing from "./components/Landing";
import { makeStyles } from "@material-ui/core";
import Student from "./components/student/Student";
import Announcements from "./components/student/Announcements";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { createMuiTheme } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    height: "100%"
  }
}));

const App = () => {
  const classes = useStyles();

  return (
    <div>
      <MuiThemeProvider theme={THEME}></MuiThemeProvider>
      <BrowserRouter>
        <div className={classes.root}>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/student" component={Student} />
            <Route exact path="/announcement" component={Announcements} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

const THEME = createMuiTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500
  }
});

export default App;
