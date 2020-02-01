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

class Grades extends Component {
  state = {
    grades: [
      { 
        subject: "Math",
        studentScore: 10,
        totalScore: 15
      },
      {
        subject: "English",
        studentScore: 5,
        totalScore: 10
      }
    ],
    isLoading: true
  };

  /* async componentDidMount() {
    add in the api call here
  } */

  render() {
    const { classes } = this.props;
    const { grades } = this.state;

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
            <Typography variant="h2">Grades</Typography>
          </Grid>
          <Grid item container>
            <Grid item xs={1} />
            <Grid item xs={10}>
              {grades.map(grade => (
                <Paper style={{ marginBottom: "100px" }}>
                  <Grid container>
                    <Grid item md={8} xs>
                      <Typography variant="h5">
                        {grade.subject}
                      </Typography>
                    </Grid>
                    <Grid item md={2} xs>
                      <Typography variant="h5">
                        Score: {grade.studentScore} / {grade.totalScore}
                      </Typography>
                    </Grid>
                    <Grid item md={2} xs>
                      <Typography variant="h5">
                        {parseFloat(grade.studentScore / grade.totalScore * 100).toFixed(2)}%
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

export default withStyles(styles)(Grades);
