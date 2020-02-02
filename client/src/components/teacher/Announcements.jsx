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

const CELL_COLOR = "#AEC6CF";

const styles = {
  container: {
    maxWidth: "100%",
    maxHeight: "100%"
  },
  fullWidth: {
    marginTop: 100,
    width: "100%"
  },
  announcementCell: {
    padding: 15,
    backgroundColor: CELL_COLOR
  },
  fadeIn: {
    height: "100%",
    width: "100%"
  }
};

class Announcements extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teacherId: this.props.match.params.teacher_id,
      announcements: [],
      isLoading: true,
      open: false
    };
  }

  async componentDidMount() {
    const response = await fetch(`/api/announcements/${this.state.teacherId}`);
    const body = await response.json();

    let announcements = [];
    body.forEach(el => {
      announcements.unshift({ title: el.title, body: el.body, id: el.id });
    });

    this.setState({ announcements: announcements, isLoading: false });
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  // implement function to make an api call
  async handleSubmit() {
    if (this.state === undefined || this.state.isLoading) {
      console.err("Still loading...");
    }

    const name = document.querySelector("#announcement-title").value;
    const description = document.querySelector("#announcement-body").value;

    if (name === undefined || description === undefined) {
      console.err("YOU NEED TO PUT IN A NAME OR DESCRIPTION");
    }

    const teacherId = this.state.teacherId;
    const id = Math.floor(Math.random() * 9999999);

    await fetch(`/api/announcements/new_announcement`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id,
        title: name,
        body: description,
        teacher: {
          id: teacherId
        }
      })
    }).then(() => {
      this.setState({
        announcements: [
          ...this.state.announcements,
          { title: name, body: description, id: id }
        ]
      });
    });

    this.handleClose();
  }

  async handleDeleteAnnouncement(i) {
    await fetch(`/api/delete/announcement/${this.state.announcements[i].id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(() => {
      let array = [...this.state.announcements];
      array.splice(i, 1);
      this.setState({ announcements: array });
    });
  }

  render() {
    const { classes } = this.props;
    const { announcements, teacherId, open } = this.state;

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
                      <Typography variant="h2">Announcements</Typography>
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
                            Create Announcement
                          </Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs style={{ paddingBottom: "10px" }}>
                      {announcements.map((announce, i) => (
                        <Grid
                          container
                          alignItems="center"
                          style={{ marginTop: 20 }}
                        >
                          <Grid item xs={11}>
                            <Paper
                              className={classes.announcementCell}
                              key={"announcementCell_" + i}
                            >
                              <Grid container direction="column">
                                <Grid item xs>
                                  <Typography variant="h4">
                                    {announce.title}
                                  </Typography>
                                </Grid>
                                <Grid item xs style={{ paddingTop: "15px" }}>
                                  <Typography variant="h6">
                                    {announce.body}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Paper>
                          </Grid>
                          <Grid item xs={1}>
                            <IconButton
                              onClick={() => this.handleDeleteAnnouncement(i)}
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
          aria-labelledby="announcement-dialog"
        >
          <DialogTitle id="announcement-dialog">New Announcement</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Create a new announcement by specifying the title and body of your
              announcement.
            </DialogContentText>
            <Grid container direction="column">
              <Grid item container xs>
                <TextField
                  autoFocus
                  id="announcement-title"
                  label="Announcement Title"
                  fullWidth
                  style={{ paddingBottom: "30px" }}
                />
                <TextField
                  id="announcement-body"
                  label="Announcement Body"
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

export default withStyles(styles)(Announcements);
