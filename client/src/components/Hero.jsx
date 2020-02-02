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
    maxHeight: "100%",
    maxWidth: "100%",
    height: "100%"
  },
  card: {
    marginTop: "40px",
    width: "40%",
    height: "50%",
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
  projectTitle: {
    marginTop: "100px",
    marginLeft: "30px"
  },
  heroDesc: {
    marginTop: "100px",
    marginBottom: "150px"
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
        <Grid container direction="column" style={{ height: "100%" }}>
          <Grid item container xs>
            <Grid item xs={1} />
            <Grid item xs={4} className={classes.projectTitle}>
              <Grid container>
                <img src={CompanyLogo} width="88px" alt="company-logo" />
                <Typography variant="h1" style={{ paddingLeft: "15px" }}>
                  <Box fontWeight="fontWeightBold" m={1}>
                    Hero Labs
                  </Box>
                </Typography>
              </Grid>
              <Typography variant="h4" className={classes.heroDesc}>
                Where intuitive classroom management develops the next
                generation of heroes.
              </Typography>
              <Typography variant="h4">Sign up as a...</Typography>
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={3} style={{ marginTop: "60px" }}>
              <img src={MainLogo} width="520px" alt="main-logo" />
            </Grid>
          </Grid>

          <Grid item container xs>
            {/* Parent Card */}
            <Grid item container justify="center" xs>
              <Card className={classes.card} variant="outlined">
                <CardContent
                  style={{ height: "100%", width: "100%", padding: 0 }}
                >
                  <Typography
                    variant="h4"
                    align="center"
                    style={{ height: "20%" }}
                  >
                    <Box
                      fontWeight="fontWeightBold"
                      m={1}
                      style={{ height: "100%", paddingTop: "10px" }}
                    >
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
            <Grid item container justify="center" xs>
              <Card className={classes.card} variant="outlined">
                <CardContent
                  style={{ height: "100%", width: "100%", padding: 0 }}
                >
                  <Typography
                    variant="h4"
                    align="center"
                    style={{ height: "20%" }}
                  >
                    <Box
                      fontWeight="fontWeightBold"
                      m={1}
                      style={{ height: "100%", paddingTop: "10px" }}
                    >
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
            <Grid item container justify="center" xs>
              <Card className={classes.card} variant="outlined">
                <CardContent
                  style={{ height: "100%", width: "100%", padding: 0 }}
                >
                  <Typography
                    variant="h4"
                    align="center"
                    style={{ height: "20%" }}
                  >
                    <Box
                      fontWeight="fontWeightBold"
                      m={1}
                      style={{ height: "100%", paddingTop: "10px" }}
                    >
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
