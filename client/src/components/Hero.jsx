import React from "react";
import {
  Grid,
  Typography,
  makeStyles,
  Card,
  CardContent,
  Box
} from "@material-ui/core";

/* Icons on the Landing page */
import StudentLogo from "../svg/001-superhero.svg";
import TeacherLogo from "../svg/002-superhero.svg";
import ParentLogo from "../svg/003-superhero.svg";
import MainLogo from "../svg/047-superhero.svg";
import CompanyLogo from "../svg/flasks.svg";

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: "#efe5fd",
    maxHeight: "100%",
    maxWidth: "100%",
    height: "100%"
  },
  card: {
    paddingTop: "30px",
    maxWidth: "50%",
    minWidth: "50%",
    maxHeight: "35%",
    transition: "0.3s",
    boxShadow: "0 4px 20px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  hero: {
    height: "100%",
    maxHeight: "100%",
    width: "100%",
    maxWidth: "100%"
  },
  heroDesc: {
    marginTop: "1em",
    marginBottom: "1em"
  },
  title: {
    fontSize: "5em",
    paddingLeft: ".3em"
  },
  heroText: {
    paddingTop: "3em"
  }
}));

const Hero = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <Grid item className={classes.hero}>
        <Grid container direction="column">
          <Grid item container xs>
            <Grid item xs={1} />
            <Grid item xs={7}>
              <Grid className={classes.heroText} container item>
                <img src={CompanyLogo} width="88px" alt="company-logo" />
                <Typography className={classes.title} variant="h1">
                  <Box fontWeight="fontWeightBold">Hero Labs</Box>
                </Typography>
              </Grid>
              <Typography variant="h4" className={classes.heroDesc}>
                Where intuitive classroom management develops the next
                generation of heroes.
              </Typography>
              <Typography variant="h4">Sign up as a...</Typography>
            </Grid>
            <Grid item container justify="center" xs={3}>
              <img
                src={MainLogo}
                alt="main-logo"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  paddingBottom: "2em",
                  paddingTop: "2em"
                }}
              />
            </Grid>
          </Grid>

          <Grid item container xs>
            {/* Parent Card */}
            <Grid item container justify="center" xs={4}>
              <Card className={classes.card} variant="outlined">
                <CardContent
                  style={{ height: "100%", width: "100%", padding: 0 }}
                >
                  <Typography
                    variant="h4"
                    align="center"
                    style={{ height: "20%", fontSize: "1.5em" }}
                  >
                    <Box fontWeight="fontWeightBold" style={{ height: "100%" }}>
                      Parent
                    </Box>
                  </Typography>
                  <Grid
                    item
                    container
                    justify="center"
                    xs
                    style={{ height: "80%" }}
                  >
                    <img
                      src={ParentLogo}
                      height={"80%"}
                      width={"auto"}
                      alt="parent-logo"
                    />
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Student Card */}
            <Grid item container justify="center" xs={4}>
              <Card className={classes.card} variant="outlined">
                <CardContent
                  style={{ height: "100%", width: "100%", padding: 0 }}
                >
                  <Typography
                    variant="h4"
                    align="center"
                    style={{ height: "20%", fontSize: "1.5em" }}
                  >
                    <Box fontWeight="fontWeightBold" style={{ height: "100%" }}>
                      Student
                    </Box>
                  </Typography>
                  <Grid
                    item
                    container
                    justify="center"
                    xs
                    style={{ height: "80%" }}
                  >
                    <img
                      src={StudentLogo}
                      height={"80%"}
                      width={"auto"}
                      alt="student-logo"
                    />
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            {/* Teacher Card */}
            <Grid item container justify="center" xs={4}>
              <Card className={classes.card} variant="outlined">
                <CardContent
                  style={{ height: "100%", width: "100%", padding: 0 }}
                >
                  <Typography
                    variant="h4"
                    align="center"
                    style={{ height: "20%", fontSize: "1.5em" }}
                  >
                    <Box fontWeight="fontWeightBold" style={{ height: "100%" }}>
                      Teacher
                    </Box>
                  </Typography>
                  <Grid
                    item
                    container
                    justify="center"
                    xs
                    style={{ height: "80%" }}
                  >
                    <img
                      src={TeacherLogo}
                      height={"80%"}
                      width={"auto"}
                      alt="teacher-logo"
                    />
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Hero;
