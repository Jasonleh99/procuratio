import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";

import MaterialTable from "material-table";

import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";

const styles = {
  container: {
    maxWidth: "100%",
    maxHeight: "100%"
  },
  fullWidth: {
    width: "100%"
  }
};

class ClassRoster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [
        { title: "Name", field: "name" },
        { title: "Username", field: "username" },
        { title: "Password", field: "password" },
        { title: "Pairing ID", field: "pairingId" },
        { title: "Parent", field: "parent" }
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
      isLoading: true
    };
  }

  /* async componentDidMount() {
    add in the api call here
  } */

  render() {
    const { students, columns } = this.state;
    const { classes } = this.props;

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
                <Typography variant="h2">Class Roster</Typography>
                <MaterialTable
                  title=""
                  columns={columns}
                  data={students}
                />
              </Grid>
              <Grid item xs={1} />{" "}
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  }
}

export default withStyles(styles)(ClassRoster);
