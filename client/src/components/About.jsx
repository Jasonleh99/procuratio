import React from "react";
import { Grid, Typography, makeStyles, Box } from "@material-ui/core";

import AboutLogo from "../svg/016-superhero.svg";

const useStyles = makeStyles(theme => ({
  container: {
    maxHeight: "100%",
    maxWidth: "100%",
    height: "100%"
  },
  aboutHero: {
    paddingTop: "5em"
  }
}));

const About = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid item xs={1} />
      <Grid item container xs={5} justify="center">
        <Grid item container direction="column" justify="center">
          <Typography variant="h1" style={{ marginBottom: "30px" }}>
            <Box
              fontWeight="fontWeightBold"
              m={1}
              style={{ height: "100%", margin: 0 }}
            >
              It just got a whole lot easier to manage a classroom.
            </Box>
          </Typography>
          <Typography variant="h3">
            <Box fontWeight="fontWeightBold" m={1} style={{ margin: 0 }}>
              An all-new classroom management system.
            </Box>
          </Typography>
          <Typography variant="h3">
            We connect elementary school teachers with students and parents to
            build amazing communities.
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={2} />
      <Grid item container xs={3} justify="center">
        <img className={classes.aboutHero} src={AboutLogo} width="520px" alt="about-logo"/>
      </Grid>
    </Grid>
  );
};

export default About;
