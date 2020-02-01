import React, { Component } from "react";
import {
  Grid,
  Typography,
  Paper
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";

const styles = {
  container: {
    maxWidth: "100%",
    maxHeight: "100%"
  }
};

class Assignments extends Component {
  state = {
    assignments: [
      { 
        title:
          "Multiplication Practice",
        dueDate: "12/25/2019",
        studentScore: 5,
        totalScore: 5
      },
      {
        title:
          "Division Practice",
        dueDate: "12/26/2019",
        studentScore: 4,
        totalScore: 5
      }
    ],
    isLoading: true
  };

  /* async componentDidMount() {
    add in the api call here
  } */

  render() {
    const { classes } = this.props;
    const { assignments } = this.state;

    return (
      <>
        <Navbar />
        <Grid
          container
          direction="column"
          alignItems="center"
          className={classes.container}
          spacing={2}
        >
          <Grid item>
            <Typography variant="h2">Assignments</Typography>
          </Grid>
          <Grid item container>
            <Grid item xs={1} />
            <Grid item xs={10}>
              {assignments.map(assignment => (
                <Paper style={{ marginBottom: "100px" }}>
                  <Grid container>
                    <Grid item md={8} xs>
                      <Typography variant="h5">
                        {assignment.title}
                      </Typography>
                    </Grid>
                    <Grid item md={2} xs>
                      <Typography variant="h5">
                        {assignment.dueDate}
                      </Typography>
                    </Grid>
                    <Grid item md={2} xs>
                      <Typography variant="h5">
                        Score: {assignment.studentScore} / {assignment.totalScore}
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </>
    );
  }
}

export default withStyles(styles)(Assignments);
