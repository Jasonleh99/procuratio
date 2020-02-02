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
      assignments: [
        {
          title: "Multiplication Practice",
          dueDate: "12/25/2019",
          maxScore: 5
        },
        {
          title: "Division Practice",
          dueDate: "12/26/2019",
          maxScore: 5
        },
        {
          title: "Multiplication Practice",
          dueDate: "12/25/2019",
          maxScore: 5
        },
        {
          title: "Division Practice",
          dueDate: "12/26/2019",
          maxScore: 5
        }
      ],
      isLoading: true,
      open: false,
      openFile: false,
      currentAssignment: undefined,
      selectedStudent: undefined
    };
  }

  /* async componentDidMount() {
    add in the api call here
  } */

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  // implement function to make an api call
  handleSubmit = () => {
    const name = document.querySelector("#assignment-name").value;
    const dueDate = document.querySelector("#due-date").value;
    const maxScore = parseInt(document.querySelector("#max-score").value);

    this.setState({
      assignments: [
        ...this.state.assignments,
        {
          title: name,
          dueDate: dueDate,
          maxScore: maxScore
        }
      ]
    });
    this.handleClose();
  };

  handleSelection = event => {
    this.setState({ selectedStudent: event.target.value });
  };

  handleAssignmentOpen = i => {
    this.setState({ openFile: true, currentAssignment: i });
  };

  handleAssignmentClose = () => {
    this.setState({ openFile: false, currentAssignment: undefined });
  };

  handleUploadCompleted = (id, url) => {
    console.log("handleUploadCompleted(), id:", id, " - url:", url);
  };

  handleDeleteAssignment = i => {
    let array = [...this.state.assignments];
    array.splice(i, 1);
    this.setState({ assignments: array });
  };

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
                          onClick={this.handleAssignmentOpen}
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
                                Max Score: {assignment.maxScore}
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
                <TextField
                  autoFocus
                  id="assignment-name"
                  label="Assignment Name"
                  fullWidth
                  style={{ paddingBottom: "30px" }}
                />
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
              onClick={this.handleSubmit}
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
