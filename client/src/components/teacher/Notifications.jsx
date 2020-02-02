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
  IconButton
} from "@material-ui/core";

import FadeIn from "react-fade-in";

import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";
import DeleteIcon from "@material-ui/icons/Delete";

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
      notifications: [],
      isLoading: true,
      open: false
    };
  }

  async componentDidMount() {
    const response = await fetch(
      `/api/notifications/teacher/${this.state.teacherId}`
    );
    const body = await response.json();

    let notifications = [];
    body.forEach(el => {
      notifications.unshift({ title: el.title, body: el.body, id: el.id });
    });

    this.setState({ notifications: notifications, isLoading: false });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  // implement function to make an api call
  async handleSubmit() {
    const name = document.querySelector("#notification-title").value;
    const description = document.querySelector("#notification-body").value;

    const teacherId = this.state.teacherId;

    await fetch(`/api/notifications/new_notification`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: Math.floor(Math.random() * 9999999),
        title: name,
        body: description,
        teacher: {
          id: teacherId
        }
      })
    }).then(() => {
      this.setState({
        notifications: [
          ...this.state.notifications,
          { title: name, body: description }
        ]
      });
    });

    this.handleClose();
  }

  async handleDeleteNotification(i) {
    await fetch(`/api/delete/notification/${this.state.notifications[i].id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(() => {
      let array = [...this.state.notifications];
      array.splice(i, 1);
      this.setState({ notifications: array });
    });
  }

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
                        <Grid
                          container
                          alignItems="center"
                          style={{ marginTop: 20 }}
                        >
                          <Grid item xs={11}>
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
                          </Grid>
                          <Grid item xs={1}>
                            <IconButton
                              onClick={() => this.handleDeleteNotification(i)}
                            >
                              <DeleteIcon fontSize="large" />
                            </IconButton>
                          </Grid>
                        </Grid>
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
          <DialogTitle id="notification-dialog">New Notification</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Create a new notification by specifying the title and body of your
              notification.
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

export default withStyles(styles)(Notifications);
