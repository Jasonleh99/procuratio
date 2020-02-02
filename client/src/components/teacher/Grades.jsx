import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";

import FadeIn from "react-fade-in";

import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";

import { Chart } from "react-google-charts";

const styles = {
  container: {
    maxWidth: "100%",
    maxHeight: "100%"
  },
  fullWidth: {
    marginTop: 100,
    width: "100%"
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
  state = {
    teacherId: this.props.match.params.teacher_id,
    overallGrades: [],
    isLoading: true
  };

  async componentDidMount() {
    const response = await fetch(`/api/teacher/grades/${this.state.teacherId}`);
    const body = await response.json();

    let grades = [];
    body.forEach(el => {
      grades.unshift({
        subject: el.subject,
        id: el.id,
        totalScore: el.total_score,
        studentScore: el.score
      });
    });
    
    this.setState({ overallGrades: grades, isLoading: false });
  }

  convertToData() {
    const { overallGrades } = this.state;
    let result = [["Subject", "Grade (%)"]];

    overallGrades.forEach(grade => {
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
    const { teacherId } = this.state;

    return (
      <>
        <Navbar teacherId={teacherId} />
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
                  <Typography variant="h2" style={{ marginBottom: "50px" }}>
                    Class Summary
                  </Typography>
                  <Grid item xs style={{ paddingBottom: "50px" }}>
                    <Typography variant="h4" style={{ marginBottom: "10px" }}>
                      Grade Statistics
                    </Typography>
                    <Chart
                      chartType="Bar"
                      loader={<div>Loading Grades...</div>}
                      data={[
                        [
                          "Subject",
                          "Average (%)"
                        ],
                        ["Math", 80],
                        ["English", 76],
                        ["Science", 56],
                        ["History", 90]
                      ]}
                    />
                  </Grid>
                  <Grid item xs>
                    <Typography variant="h4" style={{ marginBottom: "10px" }}>
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
                  {/* </Grid> */}
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
