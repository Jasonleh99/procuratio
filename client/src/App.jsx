import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

import Landing from "./components/Landing";

/* Student imports */
import Student from "./components/student/Student";
import S_Announcements from "./components/student/Announcements";
import S_Assignments from "./components/student/Assignments";
import S_Grades from "./components/student/Grades";
import S_Resources from "./components/student/Resources";

/* Parent imports */
import P_Summary from "./components/parent/Summary";
import P_Assignments from "./components/parent/Assignments";
import P_Grades from "./components/parent/Grades";
import P_Notifications from "./components/parent/Notifications";
import P_Documents from "./components/parent/Documents";

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
          <Route exact path="/:student_id/student/announcements" render={(props) => <S_Announcements {...props} />} />
          <Route exact path="/:student_id/student/assignments" render={(props) => <S_Assignments {...props} />} />
          <Route exact path="/:student_id/grades" render={(props) => <S_Grades {...props} />} />
          <Route exact path="/resources" render={(props) => <S_Resources {...props} />} />

          {/* Parent paths */}
          <Route exact path="/student_summary" render={(props) => <P_Summary {...props} />} />
          <Route exact path="/assignments" render={(props) => <P_Assignments {...props} />} />
          <Route exact path="/grades" render={(props) => <P_Grades {...props} />} />
          <Route exact path="/notifications" render={(props) => <P_Notifications {...props} />} />
          <Route exact path="/documents" render={(props) => <P_Documents {...props} />} />


        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
