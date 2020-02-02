import React, { Component } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";

import FadeIn from "react-fade-in";

import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";

const CELL_COLOR = "#DEC0F1" // "#9999cc";

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
    width: "100%",
    backgroundColor: "#F0F0FF"
  }
};

class Notifications extends Component {
  constructor(props) {
    super(props);

    this.state = {
      parentId: this.props.match.params.parent_id,
      student: {
        name: "Beep Boop"
      },
      notifications: [],
      isLoading: true
    };
  }

  async componentDidMount() {
    const response = await fetch(`/api/notifications/teacher/200`);
    const body = await response.json();

    let notifications = [];
    body.forEach(el => {
      notifications.unshift({ title: el.title, body: el.body, id: el.id });
    });

    this.setState({ notifications: notifications, isLoading: false });
  }

  render() {
    const { classes } = this.props;
    const { notifications, parentId } = this.state;

    return (
      <>
        <Navbar parentId={parentId} />
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
                  <Typography variant="h2">Notifications</Typography>

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
      </>
    );
  }
}

export default withStyles(styles)(Notifications);
