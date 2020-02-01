import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Landing from "./components/Landing";
import { makeStyles } from "@material-ui/core";
import Student from "./components/student/Student";
import Announcements from "./components/student/Announcements";
import Assignments from "./components/student/Assignments";
import Grades from "./components/student/Grades";
import Resources from "./components/student/Resources";

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

          {/* Student paths */}
          <Route exact path="/:student_id/student" render={(props) => <Student {...props} />} />
          <Route exact path="/:student_id/student/announcements" render={(props) => <Announcements {...props} />} />
          <Route exact path="/:student_id/student/assignments" render={(props) => <Assignments {...props} />} />
          <Route exact path="/:student_id/grades" render={(props) => <Grades {...props} />} />
          <Route exact path="/:student_id/resources" render={(props) => <Resources {...props} />} />

          {/* Parent paths */}
          <Route exact path="/student_summary" />
          
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
