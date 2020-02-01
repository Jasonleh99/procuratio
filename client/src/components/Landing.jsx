import React from "react";

import { Grid, Typography, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    maxHeight: "100%",
    maxWidth: "100%"
  },
  landingButtons: { 
    padding: "1em 2em"
  }
}));

const Landing = () => {
  const classes = useStyles();

  return (
    <Grid container direction="column" justify="center" alignItems="center" spacing={3} className={classes.container}>
      <Grid item>
        <Typography variant="h1">Name of Project</Typography>
      </Grid>
      <Grid item container justify="center">
        <Grid item className={classes.itemRight}>
          <Button variant="contained" color="primary" disableElevation className={classes.landingButtons}>
            <Typography variant="h4">Login</Typography>
          </Button>
        </Grid>
        <Grid item xs={1} />
        <Grid item className={classes.itemLeft}>
          <Button variant="contained" color="primary" disableElevation className={classes.landingButtons}>
            <Typography variant="h4">Teacher</Typography>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Landing;
