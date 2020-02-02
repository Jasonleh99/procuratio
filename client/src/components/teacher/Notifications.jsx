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

import FadeIn from "react-fade-in";

import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";

const CELL_COLOR = "#9999CC";

const styles = {
  container: {
    maxWidth: "100%",
    maxHeight: "100%"
  },
  fullWidth: {
    marginTop: 100,
    width: "100%"
  },
  notificationCell: {
    marginTop: 20,
    padding: 15,
    backgroundColor: CELL_COLOR
  },
  fadeIn: {
    height: "100%",
    width: "100%"
  }
};

class Notifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teacherId: this.props.match.params.teacher_id,
      student: {
        name: "Beep Boop"
      },
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

  // implement function to make an api call
  handleSubmit = () => {
    const name = document.querySelector("#notification-title").value;
    const description = document.querySelector("#notification-body").value;

    this.setState({
      notifications: [
        ...this.state.notifications,
        { title: name, body: description }
      ]
    });

    this.handleClose();
  };

  render() {
    const { classes } = this.props;
    const { notifications, teacherId, open } = this.state;

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
              <Grid item container>
                <Grid item xs={1} />
                <Grid item xs={10}>
                  <Grid container>
                    <Grid item xs>
                      <Typography variant="h2">Notifications</Typography>
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
                            Create Notification
                          </Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs style={{ paddingBottom: "10px" }}>
                      {notifications.map((notification, i) => (
                        <Paper
                          className={classes.notificationCell}
                          key={"notificationCell_" + i}
                        >
                          <Grid container direction="column">
                            <Grid item xs>
                              <Typography variant="h4">
                                {notification.title}
                              </Typography>
                            </Grid>
                            <Grid item xs style={{ paddingTop: "15px" }}>
                              <Typography variant="h6">
                                {notification.body}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Paper>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={1} />
              </Grid>
            </Grid>
          </Grid>
        </FadeIn>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="notification-dialog"
        >
          <DialogTitle id="notification-dialog">New Announcement</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Create a new announcement by specifying the title and body of your
              announcement.
            </DialogContentText>
            <Grid container direction="column">
              <Grid item container xs>
                <TextField
                  autoFocus
                  id="notification-title"
                  label="Notification Title"
                  fullWidth
                  style={{ paddingBottom: "30px" }}
                />
                <TextField
                  id="notification-body"
                  label="Notification Body"
                  fullWidth
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

export default withStyles(styles)(Notifications);
