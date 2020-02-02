import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import Landing from "./components/Landing";

/* Student imports */
import SAnnouncements from "./components/student/Announcements";
import SAssignments from "./components/student/Assignments";
import SGrades from "./components/student/Grades";
import SResources from "./components/student/Resources";

/* Parent imports */
import PSummary from "./components/parent/Summary";
import PAssignments from "./components/parent/Assignments";
import PGrades from "./components/parent/Grades";
import PNotifications from "./components/parent/Notifications";
import PDocuments from "./components/parent/Documents";
import PResources from "./components/parent/Resources";
import PAnnouncements from "./components/parent/Announcements";

/* Teacher imports */
import TSummary from "./components/teacher/Summary";
import TClassRoster from "./components/teacher/ClassRoster";
import TAssignments from "./components/teacher/Assignments";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    height: "100%"
  }
}));

const App = () => {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <Switch>
          <Route exact path="/" component={Landing} />
          {/* <Route exact path="/parent/:parentId" /> Need to add features to landing so it's more dynamic */}

          {/* Student paths */}
          <Route
            exact
            path="/:student_id/student/announcements"
            render={props => <SAnnouncements {...props} />}
          />
          <Route
            exact
            path="/:student_id/student/assignments"
            render={props => <SAssignments {...props} />}
          />
          <Route
            exact
            path="/:student_id/student/grades"
            render={props => <SGrades {...props} />}
          />
          <Route
            exact
            path="/:student_id/student/resources"
            render={props => <SResources {...props} />}
          />

          {/* Parent paths */}
          <Route
            exact
            path="/:parent_id/parent/student-summary"
            render={props => <PSummary {...props} />}
          />
          <Route
            exact
            path="/:parent_id/parent/assignments"
            render={props => <PAssignments {...props} />}
          />
          <Route
            exact
            path="/:parent_id/parent/grades"
            render={props => <PGrades {...props} />}
          />
          <Route
            exact
            path="/:parent_id/parent/notifications"
            render={props => <PNotifications {...props} />}
          />
          <Route
            exact
            path="/:parent_id/parent/documents"
            render={props => <PDocuments {...props} />}
          />
          <Route
            exact
            path="/:parent_id/parent/resources"
            render={props => <PResources {...props} />}
          />
          <Route
            exact
            path="/:parent_id/parent/announcements"
            render={props => <PAnnouncements {...props} />}
          />

          {/* Teacher paths */}
          <Route
            exact
            path="/class-summary"
            render={props => <TSummary {...props} />}
          />
          <Route
            exact
            path="/class-roster"
            render={props => <TClassRoster {...props} />}
          />
          <Route
            exact
            path="/assignments"
            render={props => <TAssignments {...props} />}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
