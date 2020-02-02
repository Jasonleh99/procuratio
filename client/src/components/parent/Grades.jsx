import React, { Component } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";

import FadeIn from "react-fade-in";

import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";

import { Chart } from "react-google-charts";

const CELL_COLOR = "#2ecc71";

const styles = {
  container: {
    maxWidth: "100%",
    maxHeight: "100%"
  },
  fullWidth: {
    marginTop: 100,
    width: "100%"
  },
  gradeCell: {
    marginTop: 20,
    padding: 15,
    backgroundColor: CELL_COLOR
  },
  gradeGraph: {
    minHeight: 300,
    height: "100%"
  },
  fadeIn: {
    height: "100%",
    width: "100%"
  }
};

class Grades extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parentId: this.props.match.params.parent_id,
      student: {
        name: "Beep Boop"
      },
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
  }

  /* async componentDidMount() {
    add in the api call here
  } */

  convertToData() {
    const { grades } = this.state;
    let result = [["Subject", "Grade (%)"]];

    grades.forEach(grade => {
      const subject = grade.subject;
      const percent = parseFloat(
        (grade.studentScore / grade.totalScore) * 100
      ).toFixed(2);

      result.push([subject, percent]);
    });

    return result;
  }

  render() {
    const { classes } = this.props;
    const { grades, student, parentId } = this.state;

    return (
      <>
        <Navbar parentId={parentId} />
        <FadeIn className={classes.fadeIn}>
          <Grid
            container
            direction="column"
            alignItems="center"
            className={classes.container}
            spacing={2}
          >
            <Grid item className={classes.fullWidth}>
              <Grid container>
                <Grid item xs={1} />
                <Grid item xs={10}>
                  <Typography variant="h2">
                    {"Viewing " + student.name + "'s Grades"}
                  </Typography>

                  <Grid container>
                    <Grid
                      item
                      xs
                      lg={6}
                      style={{ paddingBottom: "10px", marginRight: "40px" }}
                    >
                      {grades.map((grade, i) => (
                        <Paper
                          className={classes.gradeCell}
                          key={"gradeCell_" + i}
                        >
                          <Grid container>
                            <Grid item md={6} xs>
                              <Typography variant="h5">
                                {grade.subject}
                              </Typography>
                            </Grid>
                            <Grid item md={4} xs>
                              <Typography variant="h5">
                                Score: {grade.studentScore} / {grade.totalScore}
                              </Typography>
                            </Grid>
                            <Grid item md={2} xs>
                              <Typography variant="h5">
                                {parseFloat(
                                  (grade.studentScore / grade.totalScore) * 100
                                ).toFixed(2)}
                                %
                              </Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      ))}
                    </Grid>
                    <Grid item xs lg={5}>
                      <Chart
                        chartType="Bar"
                        className={classes.gradeGraph}
                        loader={
                          <div style={{ height: "100%" }}>
                            Loading Grades...
                          </div>
                        }
                        data={this.convertToData()}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={1} />
              </Grid>
            </Grid>
          </Grid>
        </FadeIn>
      </>
    );
  }
}

export default withStyles(styles)(Grades);
