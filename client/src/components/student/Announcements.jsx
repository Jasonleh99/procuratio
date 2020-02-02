import React, { Component } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";

import FadeIn from "react-fade-in";

import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";

const CELL_COLOR = "#DEC0F1" // "#AEC6CF";

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

class Announcements extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentId: this.props.match.params.student_id,
      announcements: [],
      isLoading: true
    };
  }

  async componentDidMount() {
    const response = await fetch("/api/announcements/200");
    const body = await response.json();

    let announcements = [];
    body.forEach(el => {
      announcements.unshift({ title: el.title, body: el.body });
    });

    this.setState({ announcements: announcements });
  }

  render() {
    const { classes } = this.props;
    const { announcements, studentId } = this.state;

    return (
      <>
        <Navbar studentId={studentId} />
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
                  <Typography variant="h2">Announcements</Typography>

                  <Grid container>
                    <Grid item xs style={{ paddingBottom: "10px" }}>
                      {announcements.map((announce, i) => (
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

export default withStyles(styles)(Announcements);
