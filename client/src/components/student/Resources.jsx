import React, { Component } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";

import FadeIn from "react-fade-in";

import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";

const CELL_COLOR = "#FFCCCC";

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
    width: "100%"
  }
};

class Resources extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentId: this.props.match.params.student_id,
      resources: [
        {
          title: "Resource 1",
          body: "YES"
        },
        {
          title: "RESOURCE 2",
          body: "F U C K"
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
                    <Grid
                      item
                      xs
                      style={{ paddingBottom: "10px", marginRight: "40px" }}
                    >
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
