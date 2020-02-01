import React, { Component } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";

import { Chart } from "react-google-charts";

const styles = {
  container: {
    maxWidth: "100%",
    maxHeight: "100%"
  },
  header: {
    paddingBottom: "150px"
  }
};

class Summary extends Component {
  state = {
    announcements: [
      {
        title:
          "sample ansdflkjlakjlfkjasdlkfjlasdkjflksdjflksdjflkasdjflksdjfsdnouncement",
        body: "hey hey hey"
      },
      {
        title: "sample title",
        body: "how is it already 2"
      }
    ],
    isLoading: true
  };

  /* async componentDidMount() {
    add in the api call here
  } */

  render() {
    const { announcements } = this.state;
    const { classes } = this.props;

    return (
      <>
        <Navbar />
        <Grid
          container
          direction="column"
          alignItems="center"
          className={classes.container}
        >
          <Grid item container className={classes.header}>
            <Grid item xs={1} />
            <Grid item xs={10}>
              <Typography variant="h2">Summary: ________________</Typography>
            </Grid>
            <Grid item xs={1} />
          </Grid>
          <Grid item container>
            <Grid item xs={1} />
            <Grid item xs={10} container>
              <Grid item xs>
                <Typography variant="h5" style={{ paddingBottom: "20px" }}>
                  Grades
                </Typography>
                <Chart
                  chartType="Bar"
                  loader={<div>Loading Grades...</div>}
                  data={[
                    ["Subject", "Score (%)", "Class Average (%)"],
                    ["Math", 80, 90],
                    ["English", 76, 60],
                    ["Science", 56, 70],
                    ["History", 90, 75]
                  ]}
                  height={'100%'}
                />
              </Grid>
              <Grid item xs={1} />
              <Grid item xs>
                <Typography variant="h5" style={{ paddingBottom: "20px" }}>
                  Recent Assignments
                </Typography>
                {announcements.map(announce => (
                  <Paper style={{ marginBottom: "100px" }}>
                    <div>
                      <Typography variant="h5">{announce.title}</Typography>
                    </div>
                    <div>
                      <Typography variant="p">{announce.body}</Typography>
                    </div>
                  </Paper>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={1} />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles(styles)(Summary);
