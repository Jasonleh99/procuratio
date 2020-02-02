import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";

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
      isLoading: true
    };
  }

  /* async componentDidMount() {
    add in the api call here
  } */

  render() {
    const { classes } = this.props;
    const { students, studentColumns, parents, parentColumns, teacherId } = this.state;

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
                  <Typography variant="h2">Class Roster</Typography>
                  <MaterialTable title="" columns={studentColumns} data={students} />

                  <Typography variant="h2" style={{ marginTop: "50px" }}>Parent Roster</Typography>
                  <MaterialTable title="" columns={parentColumns} data={parents} />
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

export default withStyles(styles)(Roster);
