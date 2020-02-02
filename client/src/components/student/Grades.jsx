import React, { Component } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";

import FadeIn from "react-fade-in";

import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";

import { Chart } from "react-google-charts";

const CELL_COLOR = "#DEC0F1" // "#2ECC71";

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
    width: "100%",
    backgroundColor: "#F0F0FF"
  }
};

class Grades extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentId: this.props.match.params.student_id,
      grades: [],
      isLoading: true
    };
  }

  async componentDidMount() {
    const response = await fetch(`/api/assignments/student/100`);
    const body = await response.json();

    let subjectGrades = {};

    let grades = [];
    body.forEach(el => {
      const index = Object.keys(subjectGrades).indexOf(el.assignment.subject);
      if (index === -1) {
        console.log(el);
        subjectGrades[el.assignment.subject] = {
          subject: el.assignment.subject,
          totalScore: el.total_score,
          studentScore: el.score
        };
      } else {
        subjectGrades[el.assignment.subject] = {
          subject: el.assignment.subject,
          totalScore:
            subjectGrades[el.assignment.subject].totalScore + el.total_score,
          studentScore: subjectGrades[el.assignment.subject].studentScore + el.score
        };
        console.log(subjectGrades);
      }
    });

    Object.keys(subjectGrades).forEach(el => {
      grades.unshift(subjectGrades[el]);
      // console.log(el);
    });

    this.setState({ grades: grades, isLoading: false });
  }

  convertToData() {
    const { grades } = this.state;
    let result = [["Subject", "Grade (%)"]];

    grades.forEach(grade => {
      const subject = this.convertToProperCase(grade.subject);
      const percent = parseFloat(
        (grade.studentScore / grade.totalScore) * 100
      ).toFixed(2);

      result.push([subject, percent]);
    });

    return result;
  }

  convertToProperCase(sub) {
    let subject = sub.toLowerCase();
    subject = subject.substr(0, 1).toUpperCase() + subject.substr(1);

    return subject;
  }

  render() {
    const { classes } = this.props;
    const { grades, studentId } = this.state;

    return (
      <>
        <Navbar studentId={studentId} />
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
                  <Typography variant="h2">Grades</Typography>

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
                                {this.convertToProperCase(grade.subject)}
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
                    <Grid item xs lg={5} style={{ marginTop: 20 }}>
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
