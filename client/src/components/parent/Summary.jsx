import React, { Component } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";

import FadeIn from "react-fade-in";

import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";

import { Chart } from "react-google-charts";

const ASSIGNMENT_CELL_COLOR = "#FF6961";
const ANNOUNCEMENT_CELL_COLOR = "#AEC6CF";

const styles = {
  container: {
    maxWidth: "100%",
    maxHeight: "100%"
  },
  fullWidth: {
    marginTop: 100,
    width: "100%"
  },
  announcementCell: {
    marginTop: 20,
    padding: 15,
    backgroundColor: ANNOUNCEMENT_CELL_COLOR
  },
  assignmentCell: {
    marginTop: 20,
    padding: 15,
    backgroundColor: ASSIGNMENT_CELL_COLOR
  },
  fadeIn: {
    height: "100%",
    width: "100%"
  }
};

class Summary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parentId: this.props.match.params.parent_id,
      student: {
        name: "Beep Boop"
      },
      announcements: [
        {
          title: "sample announcement",
          body: "test"
        }
      ],
      assignments: [
        {
          title:
            "sample ansdflkjlakjlfkjasdlkfjlasdkjflksdjflksdjflkasdjflksdjfsdnouncement",
          dueDate: "12/25/2019",
          studentScore: 5,
          totalScore: 5
        },
        {
          title: "sample title",
          dueDate: "11/25/2020",
          studentScore: 5,
          totalScore: 5
        }
      ],
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

  async componentDidMount() {
    // Announcements
    const response = await fetch("/api/announcements/200");
    const body = await response.json();

    let announcements = [];
    body.forEach(el => {
      announcements.unshift({ title: el.title, body: el.body });
    });

    this.setState({ announcements: announcements });

    // Grades
    const response2 = await fetch(`/api/assignments/student/100`);
    const body2 = await response2.json();

    let subjectGrades = {};

    let grades = [];
    body2.forEach(el => {
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
          studentScore:
            subjectGrades[el.assignment.subject].studentScore + el.score
        };
        console.log(subjectGrades);
      }
    });

    Object.keys(subjectGrades).forEach(el => {
      grades.unshift(subjectGrades[el]);
    });

    this.setState({ grades: grades });

    // Assignments
    const response3 = await fetch(`/api/assignments/student/100`);
    const body3 = await response3.json();

    let assignments = [];
    body3.forEach(el => {
      assignments.unshift({
        title: el.assignment.title,
        subject: el.assignment.subject,
        submission_link: el.submission_link,
        score: el.score,
        totalScore: el.total_score,
        dueDate: el.assignment.date
      });
    });

    this.setState({ assignments: assignments });
  }  

  convertToProperCase(sub) {
    let subject = sub.toLowerCase();
    subject = subject.substr(0, 1).toUpperCase() + subject.substr(1);

    return subject;
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

  render() {
    const { classes } = this.props;
    const { announcements, assignments, student, parentId } = this.state;

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
              <Grid item container>
                <Grid item xs={1} />
                <Grid item xs={10}>
                  <Typography variant="h2">
                    {"Summary: " + student.name}
                  </Typography>

                  <Grid container>
                    <Grid
                      item
                      xs
                      style={{ paddingBottom: "10px"}}
                    >
                      {/* Announcement Section  */}
                      <Typography variant="h4" style={{ paddingTop: "30px" }}>
                        Announcements
                      </Typography>
                      {announcements.map((announce, i) => (
                        <Paper
                          className={classes.announcementCell}
                          key={"announcementCell_" + i}
                        >
                          <Grid container direction="column">
                            <Grid item xs>
                              <Typography variant="h5">
                                {announce.title}
                              </Typography>
                            </Grid>
                            <Grid item xs style={{ paddingTop: "15px" }}>
                              <Typography variant="h6">
                                {announce.body}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      ))}

                      {/* Assignment Section */}
                      <Typography variant="h4" style={{ paddingTop: "30px" }}>
                        Recent Assignments
                      </Typography>
                      {assignments.map((assignment, i) => (
                        <Paper
                          className={classes.assignmentCell}
                          key={"assignmentCell_" + i}
                        >
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
                                Score: {assignment.score} /{" "}
                                {assignment.totalScore}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      ))}

                      {/* Grade Section */}
                      <Typography variant="h4" style={{ paddingTop: "30px", paddingBottom: "10px"}}>
                        Grades
                      </Typography>
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
                  <Grid item xs={1} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </FadeIn>
      </>
    );
  }
}

export default withStyles(styles)(Summary);
