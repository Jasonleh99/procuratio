import React, { Component } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";

import FadeIn from "react-fade-in";

import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";

const CELL_COLOR = "#DEC0F1" // "#FFCCCC";

const styles = {
  container: {
    maxWidth: "100%",
    maxHeight: "100%"
  },
  fullWidth: {
    marginTop: 100,
    width: "100%"
  },
  resourceCell: {
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

class Resources extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentId: this.props.match.params.student_id,
      resources: [],
      isLoading: true
    };
  }

  async componentDidMount() {
    const response = await fetch(`/api/resources/200`);
    const body = await response.json();

    let resources = [];
    body.forEach(el => {
      resources.unshift({ title: el.title, body: el.body, id: el.id });
    });

    this.setState({ resources: resources, isLoading: false });
  }

  render() {
    const { classes } = this.props;
    const { resources, studentId } = this.state;

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
                  <Typography variant="h2">Resources</Typography>

                  <Grid container>
                    <Grid item xs style={{ paddingBottom: "10px" }}>
                      {resources.map((resource, i) => (
                        <Paper
                          className={classes.resourceCell}
                          key={"resourceCell_" + i}
                        >
                          <Grid container direction="column">
                            <Grid item xs>
                              <Typography variant="h4">
                                {resource.title}
                              </Typography>
                            </Grid>
                            <Grid item xs>
                              <Typography variant="h6">
                                {resource.body}
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

export default withStyles(styles)(Resources);
