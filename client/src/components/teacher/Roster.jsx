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
    width: "100%",
    backgroundColor: "#F0F0FF"
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
        { title: "Parent", field: "parent" }
      ],
      parentColumns: [
        { title: "Parent Name", field: "name" },
        { title: "Username", field: "username" },
        { title: "Password", field: "password" },
        { title: "Student", field: "student" }
      ],
      students: [],
      parents: [],
      isLoading: true,
      open: false
    };
  }

  componentDidMount() {
    // const response = await fetch(`/api/teacher/${this.state.teacherId}`);
    // const body = await response.json();

    // console.log(body);

    // let students = [];
    // body.forEach(el => {
    //   students.unshift({
    //     name: el.user.name,
    //     username: el.user.login,
    //     password: el.user.password,
    //     parent: el.parent.user.name
    //   });
    // });

    // let parents = [];
    // body.forEach(el => {
    //   parents.unshift({
    //     name: el.user.name,
    //     username: el.user.login,
    //     password: el.user.password,
    //     student: el.student.user.name
    //   });
    // });

    // this.setState({ students: students, parents: parents, isLoading: false });
  }

  handleGenerateUsers = (students, parents) => {};

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  async handleSubmit() {
    const students = document.querySelector("#student-names").value.split("\n");
    const parents = document.querySelector("#parent-names").value.split("\n");

    if (students.length !== parents.length) {
      alert("Number of students and parents don't match!");
      return;
    }

    let studentArr = [];
    let parentArr = [];

    for (let i = 0; i < students.length; i++) {
      const s_username = students[i].split(" ").join("");
      const s_password = Math.random()
        .toString(36)
        .slice(-8);

      // const u_id = Math.random() * 99999999;
      // const u2_id = Math.random() * 99999999;
      // const u_id = 90;
      // const u2_id = 91;

      // const s_id = Math.random() * 99999999;
      // const s_id = 1;

      const p_username = parents[i].split(" ").join("");
      const p_password = Math.random()
        .toString(36)
        .slice(-8);
      // const p_id = Math.random() * 99999999;
      // const p_id = 2;

      // const teacher_id = this.state.teacherId;

      studentArr.unshift({
        name: students[i],
        username: s_username,
        password: s_password,
        parent: parents[i]
      });

      parentArr.unshift({
        name: parents[i],
        username: p_username,
        password: p_password,
        student: students[i]
      });

      // let response = await fetch(`/api/new_user`, {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({
      //     name: students[i],
      //     login: s_username,
      //     password: s_password,
      //     id: u_id
      //   })
      // });

      // let response2 = await fetch(`/api/new_user`, {
      //   method: "POST",
      //   headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json"
      //   },
      //   body: JSON.stringify({
      //     name: parents[i],
      //     login: p_username,
      //     password: p_password,
      //     id: u2_id
      //   })
      // });

      // setTimeout(
      //   await fetch(`/api/new_student`, {
      //     method: "POST",
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json"
      //     },
      //     body: JSON.stringify({
      //       user: {
      //         id: u_id
      //       },
      //       id: s_id,
      //       parent: {
      //         id: null
      //       },
      //       teacher: {
      //         id: teacher_id
      //       },
      //       pairid: null
      //     })
      //   }),
      //   10000
      // );

      // setTimeout(
      //   await fetch(`/api/new_parent`, {
      //     method: "POST",
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json"
      //     },
      //     body: JSON.stringify({
      //       user: {
      //         id: u2_id
      //       },
      //       id: p_id,
      //       student: {
      //         id: s_id
      //       }
      //     })
      //   }),
      //   15000
      // );
    }

    this.setState({ students: studentArr, parents: parentArr });

    this.handleClose();
  }

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
              class in the format of [FIRST_NAME] [LAST_NAME].
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
              onClick={() => this.handleSubmit()}
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
