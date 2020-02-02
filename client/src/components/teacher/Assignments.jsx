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
  DialogActions
} from "@material-ui/core";

import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";

const styles = {
  container: {
    maxWidth: "100%",
    maxHeight: "100%"
  },
  fullWidth: {
    width: "100%"
  },
  fullButton: {
    height: "100%",
    width: "auto"
  }
};

class Assignments extends Component {
  constructor(props) {
    super();
    this.state = {
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
      open: false
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

  render() {
    const { classes } = this.props;
    const { assignments, open } = this.state;

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
                        Create Assignment
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                {assignments.map(assignment => (
                  <Link to={{ pathname: "/current-assignment/upload" }}>
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
                            Max Score: {assignment.maxScore}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Link>
                ))}
              </Grid>
              <Grid item xs={1} />
            </Grid>
          </Grid>
        </Grid>
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
                      autoFocus
                      id="due-date"
                      label="Due Date"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={1} />
                  <Grid item xs>
                    <TextField
                      autoFocus
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
              onClick={this.handleClose}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withStyles(styles)(Assignments);
