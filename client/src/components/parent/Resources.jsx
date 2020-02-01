import React, { Component } from "react";
import {
  Grid,
  Typography,
  Paper,
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";

const styles = {
  container: {
    maxWidth: "100%",
    maxHeight: "100%"
  }
};

class Resources extends Component {
  state = {
    resources: [
      { 
        title:
          "Resource 1",
        body: "YES"
      },
      {
        title: "RESOURCE 2",
        body: "F U C K"
      }
    ],
    isLoading: true
  };

  /* async componentDidMount() {
    add in the api call here
  } */

  render() {
    const { classes } = this.props;
    const { resources } = this.state;

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
            <Typography variant="h2">Resources</Typography>
          </Grid>
          <Grid item container>
            <Grid item xs={1} />
            <Grid item xs={10}>
              {resources.map(resource => (
                <Paper style={{ marginBottom: "100px" }}>
                  <div>
                    <Typography variant="h4">{resource.title}</Typography>
                  </div>
                  <div>
                    <Typography variant="h6">{resource.body}</Typography>
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

export default withStyles(styles)(Resources);
