import React, { Component } from "react";
import {
  Grid,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";

const styles = {
  container: {
    maxWidth: "100%",
    maxHeight: "100%"
  }
};

class Announcements extends Component {
  state = {
    announcements: [
      {
        title:
          "sample ansdflkjlakjlfkjasdlkfjlasdkjflksdjflksdjflkasdjflksdjfsdnouncement",
        body: "hey hey hey"
      },
      {
        title: "sample title",
        body: "how is it already 2"
      }
    ],
    isLoading: true
  };

  /* async componentDidMount() {
    add in the api call here
  } */

  render() {
    const { classes } = this.props;
    const { announcements } = this.state;

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
          <Grid item>
            <Typography variant="h2">Announcements</Typography>
          </Grid>
          <Grid item container>
            <Grid item xs={1} />
            <Grid item xs={10}>
              {announcements.map(announce => (
                <Paper style={{ marginBottom: "100px" }}>
                  <div>
                    <Typography variant="h5">{announce.title}</Typography>
                  </div>
                  <div>
                    <Typography variant="p">{announce.body}</Typography>
                  </div>
                </Paper>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </>
    );
  }
}

export default withStyles(styles)(Announcements);
