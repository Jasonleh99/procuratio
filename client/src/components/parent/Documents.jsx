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

class Documents extends Component {
  state = {
    documents: [
      {
        title: "Document 1",
        link: "https://google.com"
      },
      {
        title: "RESOURCE 2",
        link: "https://facebook.com"
      }
    ],
    isLoading: true
  };

  /* async componentDidMount() {
    add in the api call here
  } */

  render() {
    const { classes } = this.props;
    const { documents } = this.state;

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
            <Typography variant="h2">Important Documents</Typography>
          </Grid>
          <Grid item container>
            <Grid item xs={1} />
            <Grid item xs={10}>
              {documents.map(document => (
                <Paper style={{ marginBottom: "100px" }}>
                  <Typography variant="h4">
                    <a href={document.link}>{document.title}</a>
                  </Typography>
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

export default withStyles(styles)(Documents);
