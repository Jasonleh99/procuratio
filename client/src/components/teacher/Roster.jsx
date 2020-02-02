import React, { Component } from "react";
import {
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions
} from "@material-ui/core";

import FadeIn from "react-fade-in";

import MaterialTable from "material-table";

import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";

const styles = {
  container: {
    maxWidth: "100%",
    maxHeight: "100%"
  },
  fullWidth: {
    marginTop: 100,
    width: "100%"
  },
  fadeIn: {
    height: "100%",
    width: "100%"
  }
};

class Roster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teacherId: this.props.match.params.teacher_id,
      studentColumns: [
        { title: "Student Name", field: "name" },
        { title: "Username", field: "username" },
        { title: "Password", field: "password" },
        { title: "Pairing ID", field: "pairingId" },
        { title: "Parent", field: "parent" }
      ],
      parentColumns: [
        { title: "Parent Name", field: "name" },
        { title: "Username", field: "username" },
        { title: "Password", field: "password" },
        { title: "Student", field: "student" }
      ],
      students: [
        {
          name: "Charles Test",
          username: "cte123",
          password: "temp_pass",
          pairingId: "qwerty",
          parent: "Billy Bob"
        },
        {
          name: "Charles sdfsd",
          username: "cdste123",
          password: "temp_psdsdass",
          pairingId: "qddwerty",
          parent: "Bilddddly Bob"
        },
        {
          name: "Charles sdfsd",
          username: "cdste123",
          password: "temp_psdsdass",
          pairingId: "qddwerty",
          parent: "Bilddddly Bob"
        },
        {
          name: "Charles sdfsd",
          username: "cdste123",
          password: "temp_psdsdass",
          pairingId: "qddwerty",
          parent: "Bilddddly Bob"
        }
      ],
      parents: [
        {
          name: "Charles Parent",
          username: "sdfhja3",
          password: "asdfasdklhj23",
          student: "Charles sdfsd"
        },
        {
          name: "Charles Parent",
          username: "sdfhja3",
          password: "asdfasdklhj23",
          student: "Charles sdfsd"
        },
        {
          name: "Charles Parent",
          username: "sdfhja3",
          password: "asdfasdklhj23",
          student: "Charles sdfsd"
        },
        {
          name: "Charles Parent",
          username: "sdfhja3",
          password: "asdfasdklhj23",
          student: "Charles sdfsd"
        },
        {
          name: "Charles Parent",
          username: "sdfhja3",
          password: "asdfasdklhj23",
          student: "Charles sdfsd"
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

  handleSubmit = () => {
    this.handleClose();
  };

  render() {
    const { classes } = this.props;
    const {
      students,
      studentColumns,
      parents,
      parentColumns,
      teacherId,
      open
    } = this.state;

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
                      <Typography variant="h2">Class Roster</Typography>
                    </Grid>
                    {(students.length === 0 || parents.length === 0) && (
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
                              Generate Accounts
                            </Typography>
                          </Button>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                  <MaterialTable
                    title=""
                    columns={studentColumns}
                    data={students}
                  />

                  <Typography variant="h2" style={{ marginTop: "50px" }}>
                    Parent Roster
                  </Typography>
                  <MaterialTable
                    title=""
                    columns={parentColumns}
                    data={parents}
                  />
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
          <DialogTitle id="assignment-dialog">Generate Accounts</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Generate student and parent accounts for your class. In their
              respective text fields, put a separate name for each person in the
              class in the format of [LAST_NAME], [FIRST_NAME].
            </DialogContentText>
            <Grid container direction="column">
              <Grid item container xs>
                <TextField
                  autoFocus
                  id="student-names"
                  label="Student Names"
                  fullWidth
                  multiline
                  rows="5"
                  style={{ paddingBottom: "30px" }}
                />
              </Grid>
              <Grid item container xs>
                <TextField
                  id="parent-names"
                  label="Parent Names"
                  fullWidth
                  multiline
                  rows="5"
                />
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
      </>
    );
  }
}

export default withStyles(styles)(Roster);
