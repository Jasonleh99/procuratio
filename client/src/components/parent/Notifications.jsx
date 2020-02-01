import React, { Component } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";

const styles = {
  container: {
    maxWidth: "100%",
    maxHeight: "100%"
  }
};

class Notifications extends Component {
  state = {
    notifications: [
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
    const { notifications } = this.state;
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
          <Grid item>
            <Typography variant="h2">Notifications</Typography>
          </Grid>
          <Grid item container>
            <Grid item xs={1} />
            <Grid item xs={10}>
              {notifications.map(notification => (
                <Paper style={{ marginBottom: "100px" }}>
                  <div>
                    <Typography variant="h5">{notification.title}</Typography>
                  </div>
                  <div>
                    <Typography variant="p">{notification.body}</Typography>
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

export default withStyles(styles)(Notifications);
