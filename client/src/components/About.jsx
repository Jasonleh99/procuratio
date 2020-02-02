import React from "react";
import { Grid, Typography, makeStyles, Box } from "@material-ui/core";

import AboutLogo from "../svg/016-superhero.svg";

const useStyles = makeStyles(theme => ({
  container: {
    width: "100%",
    height: "100%"
  }
}));

const About = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.container}>
      <Grid item xs={1} />
      <Grid item container justify="center">
        <Grid item container direction="column" justify="center" xs={6}>
          <Typography
            variant="h2"
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              marginBottom: "30px"
            }}
          >
            <Box
              fontWeight="fontWeightBold"
              style={{ height: "100%", margin: 0 }}
            >
              About Us
            </Box>
          </Typography>
          <Typography variant="h4">
            <Box fontWeight="fontWeightBold" style={{ margin: 0 }}>
              It just got a whole lot easier to manage a classroom.
            </Box>
          </Typography>
          <Typography variant="h4">
            We connect elementary school teachers with students and parents to
            build amazing communities.
          </Typography>
        </Grid>
        <Grid item container justify="center" xs={4}>
          <img
            src={AboutLogo}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              paddingLeft: "10em"
            }}
            alt="about-logo"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default About;
