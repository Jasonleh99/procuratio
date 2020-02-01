import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Landing from "./components/Landing";
import { makeStyles } from "@material-ui/core";
import Student from "./components/student/Student";
import Announcements from "./components/student/Announcements";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    height: "100%",
  }
}));

const App = () => {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/student" component={Student} />
          <Route exact path="/announcement" component={Announcements} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
