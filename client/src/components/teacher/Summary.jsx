import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";

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
    // const { announcements } = this.state;
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
              <Typography variant="h2">Class Summary</Typography>
            </Grid>
            <Grid item xs={1} />
          </Grid>
          <Grid item container>
            <Grid item xs={1} />
            <Grid item xs={10} container>
              <Grid item xs md={6}>
                <Typography variant="h5" style={{ paddingBottom: "20px" }}>
                  Grades
                </Typography>
                <Chart
                  chartType="Bar"
                  loader={<div>Loading Grades...</div>}
                  data={[
                    [
                      "Subject",
                      "Average (%)",
                      "Median (%)",
                      "Standard Deviation (%)"
                    ],
                    ["Math", 80, 90, 10],
                    ["English", 76, 60, 5],
                    ["Science", 56, 70, 7.6],
                    ["History", 90, 75, 19]
                  ]}
                />
              </Grid>
              <Grid item xs md={6}>
                <Typography variant="h5" style={{ paddingBottom: "20px" }}>
                  Class Performance
                </Typography>
                <Chart
                  chartType="LineChart"
                  loader={<div>Loading Class Performance...</div>}
                  data={[
                    ["x", "Math", "English", "Science", "History"],
                    ["January", 50, 60, 76, 88],
                    ["February", 57, 60, 77, 77],
                    ["March", 61, 58, 70, 81],
                    ["April", 73, 64, 89, 100],
                    ["May", 88, 76, 90, 74]
                  ]}
                  options={{
                    hAxis: {
                      title: "Month"
                    },
                    vAxis: {
                      title: "Class Average (%)"
                    }
                  }}
                />
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
