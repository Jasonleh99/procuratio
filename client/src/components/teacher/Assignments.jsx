import React, { Component } from "react";
import {
  Grid,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton
} from "@material-ui/core";

import FadeIn from "react-fade-in";

import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";

import DeleteIcon from "@material-ui/icons/Delete";

import UppyModal from "./UppyModal";

import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

const CELL_COLOR = "#FF6961";

const styles = {
  container: {
    maxWidth: "100%",
    maxHeight: "100%"
  },
  fullWidth: {
    marginTop: 100,
    width: "100%"
  },
  assignmentCell: {
    padding: 15,
    backgroundColor: CELL_COLOR
  },
  fadeIn: {
    height: "100%",
    width: "100%"
  }
};

class Assignments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teacherId: this.props.match.params.teacher_id,
      students: ["John Doe", "yes"],
      assignments: [],
      isLoading: true,
      open: false,
      openFile: false,
      currentAssignment: undefined,
      selectedStudent: undefined
    };

    this.handleUploadCompleted = this.handleUploadCompleted.bind(this);
  }

  async componentDidMount() {
    const response = await fetch(
      `/api/assignments/teacher/${this.state.teacherId}`
    );
    const body = await response.json();

    let assignments = [];
    body.forEach(el => {
      assignments.unshift({
        title: el.title,
        subject: el.subject,
        id: el.id,
        totalScore: el.totalScore,
        dueDate: el.date
      });
    });

    this.setState({ assignments: assignments, isLoading: false });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  // implement function to make an api call
  async handleSubmit() {
    const name = document.querySelector("#assignment-name").value;
    const dueDate = document.querySelector("#due-date").value;
    const totalScore = parseInt(document.querySelector("#max-score").value);
    const subject = document.querySelector("#subject").value;

    const teacherId = this.state.teacherId;
    const id = Math.floor(Math.random() * 9999999);

    await fetch(`/api/assignments/new_assignment`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id,
        title: name,
        date: dueDate,
        totalScore: totalScore,
        subject: subject.toUpperCase(),
        summary: "",
        teacher: {
          id: teacherId
        }
      })
    }).then(() => {
      this.setState({
        assignments: [
          ...this.state.assignments,
          {
            title: name,
            subject: subject,
            id: id,
            totalScore: totalScore,
            dueDate: dueDate
          }
        ]
      });
    });

    this.handleClose();
  }

  handleSelection = event => {
    this.setState({ selectedStudent: event.target.value });
  };

  handleAssignmentOpen = i => {
    this.setState({ openFile: true, currentAssignment: i });
  };

  handleAssignmentClose = () => {
    this.setState({ openFile: false, currentAssignment: undefined });
  };

  async handleUploadCompleted(url) {
    await fetch(`/api/assignments/new_assignment_submission`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: Math.floor(Math.random() * 9999999),
        assignment: {
          id: this.state.assignments[this.state.currentAssignment].id
        },
        student: {
          id: 100
        },
        total_score: this.state.assignments[this.state.currentAssignment]
          .totalScore,
        teacher: {
          id: this.state.teacherId
        },
        submission_link: url
      })
    });
  }

  async handleDeleteAssignment(i) {
    await fetch(`/api/delete/assignment/${this.state.assignments[i].id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(() => {
      let array = [...this.state.assignments];
      array.splice(i, 1);
      this.setState({ assignments: array });
    });
  }

  render() {
    const { classes } = this.props;
    const { assignments, open, teacherId, openFile, students } = this.state;

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
                  <Grid container>
                    <Grid item xs>
                      <Typography variant="h2">Assignments</Typography>
                    </Grid>
                    <Grid item xs>
                      <Grid
                        container
                        style={{ height: "100%" }}
                        justify="flex-end"
                        alignItems="center"
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleClickOpen}
                        >
                          <Typography variant="h6">
                            Create Assignment
                          </Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  {assignments.map((assignment, i) => (
                    <Grid
                      container
                      alignItems="center"
                      style={{ marginTop: 20 }}
                    >
                      <Grid item xs={11}>
                        <Paper
                          className={classes.assignmentCell}
                          key={"assignmentCell_" + i}
                          onClick={() => this.handleAssignmentOpen(i)}
                          style={{ cursor: "pointer" }}
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
                                Max Score: {assignment.totalScore}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      </Grid>
                      <Grid item xs={1}>
                        <IconButton
                          onClick={() => this.handleDeleteAssignment(i)}
                        >
                          <DeleteIcon fontSize="large" />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
                <Grid item xs={1} />
              </Grid>
            </Grid>
          </Grid>
        </FadeIn>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="assignment-dialog"
        >
          <DialogTitle id="assignment-dialog">New Assignment</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Create a new assignment by specifying the assignment name, the due
              date, and the maximum score a student can achieve.
            </DialogContentText>
            <Grid container direction="column">
              <Grid item container xs>
                <Grid container>
                  <Grid item xs>
                    <TextField
                      autoFocus
                      id="assignment-name"
                      label="Assignment Name"
                      fullWidth
                      style={{ paddingBottom: "30px" }}
                    />
                  </Grid>
                  <Grid item xs={1} />
                  <Grid item xs>
                    <TextField id="subject" label="Subject" fullWidth />
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs>
                    <TextField
                      id="due-date"
                      label="Due Date (mm/dd/yyyy)"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={1} />
                  <Grid item xs>
                    <TextField
                      type="number"
                      id="max-score"
                      label="Max Score"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleClose}
              variant="contained"
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => this.handleSubmit()}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openFile}
          onClose={this.handleAssignmentClose}
          aria-labelledby="submission-dialog"
        >
          <DialogTitle id="submission-dialog">
            Upload Student Submission
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Upload a student's submission for this assignment. You can select
              the student that you want from the drop down menu.
            </DialogContentText>
            <Grid container justify="center">
              <Grid item xs>
                <UppyModal handleUploadCompleted={this.handleUploadCompleted} />
              </Grid>
              <Grid item xs></Grid>
              <Grid item xs>
                <FormControl required style={{ width: "100%" }}>
                  <InputLabel id="student-selector">Student</InputLabel>
                  <Select
                    labelId="student-selector"
                    id="student-menu"
                    onChange={this.handleSelection}
                  >
                    {students.map((student, i) => (
                      <MenuItem value={student} key={"student_" + i}>
                        {student}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleAssignmentClose}
              variant="contained"
              color="secondary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withStyles(styles)(Assignments);
