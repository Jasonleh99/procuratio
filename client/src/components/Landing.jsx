import React, { Component, Fragment } from "react";

import {
  Grid,
  Typography,
  Button,
  makeStyles,
  CssBaseline
} from "@material-ui/core";
import Component1 from "./FadeIn";
import Component2 from "./DropDown";
import ReactDOM from "react-dom";
import { shadows } from "@material-ui/system";
import { withStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import Icon from "@material-ui/core/Icon";
import StudentLogo from "../svg/001-superhero.svg";
import TeacherLogo from "../svg/002-superhero.svg";
import ParentLogo from "../svg/003-superhero.svg";
import MainLogo from "../svg/047-superhero.svg";
import AboutLogo from "../svg/016-superhero.svg";
import CompanyLogo from "../svg/flasks.svg";

import "./styles.css";

const useStyles = makeStyles(theme => ({
  container: {
    maxHeight: "100%",
    maxWidth: "100%"
  },
  itemLeft: {
    backgroundColor: "blue"
  },
  itemCenter: {
    justifyContent: "center"
  },
  itemRight: {
    backgroundColor: "red"
  },
  landingButtons: {
    padding: "1em 2em"
  },
  card: {
    minWidth: 200,
    minHeight: 150,
    maxWidth: 300,
    margin: "auto",
    transition: "0.3s",
    boxShadow: "0 4px 20px -12px rgba(0,0,0,0.3)",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
    }
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  heroMain: {
    paddingTop: "5em"
  },
  aboutHero: {
    paddingTop: "5em"
  },
  companyLogo: {
    paddingTop: ".3em",
    paddingRight: ".3em"
  },
  title: {
    flexDirection: "row"
  },
  signUp: {
    paddingTop: "1.5em"
  }
}));

const Landing = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={3}
      className={classes.container}
    >
      {/*<Grid
        item
        container
        className={classes.itemCenter}
        justify="center"
        justifyContent="center"
      >
        <Component1 />
      </Grid>*/}
      <section id="main">
        <div className="main-text">
          <h1 className={classes.title}>
            <img
              className={classes.companyLogo}
              src={CompanyLogo}
              width="80em"
            />
            Hero Labs
          </h1>
          <p className="main-desc">
            Where intuitive classroom management develops the next generation of
            heroes. <br /> <br /> <br /> <br /> Sign up as a...
          </p>
        </div>
        <img className={classes.heroMain} src={MainLogo} width="420" />
      </section>

      <Grid
        item
        container
        className={classes.itemCenter}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item container className={classes.itemCenter} justify="center" xs>
          {/*card actions are a thing btw*/}
          <Card className={classes.card} variant="outlined">
            <CardContent>
              <Typography
                fontWeight="200"
                variant="h5"
                component="h2"
                align="center"
              >
                Parent
              </Typography>
              <Grid
                item
                container
                className={classes.itemCenter}
                justify="center"
                xs
              >
                <img src={ParentLogo} height={100} width={100} />
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid
          item
          container
          className={classes.itemCenter}
          justify="center"
          alignItems="center"
          xs
        >
          <Card className={classes.card} variant="outlined">
            <CardContent justify="center">
              <Typography variant="h5" component="h2" align="center">
                Student
              </Typography>
              <Grid
                item
                container
                className={classes.itemCenter}
                justify="center"
                xs
              >
                <img src={StudentLogo} height={100} width={100} />
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item container className={classes.itemCenter} justify="center" xs>
          <Card className={classes.card} variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h2" align="center">
                Teacher
              </Typography>
              <Grid
                item
                container
                className={classes.itemCenter}
                justify="center"
                xs
              >
                <img src={TeacherLogo} height={100} width={100} />
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <section id="about">
          <div className="about-text">
            <h1>It just got a whole lot easier to manage a classroom.</h1>
            <p className="about-desc">
              <strong>An all-new classroom management system.</strong> <br /> We
              connect elementary school teachers with students and parents to
              build amazing communities.
            </p>
          </div>
          <img
            className={classes.aboutHero}
            src={AboutLogo}
            width="420"
            alt="hero-main-image"
          />
        </section>

        <footer>
          <p className="footer">Designed & Built by the Frontend Gang 🤪</p>
        </footer>
      </Grid>
    </Grid>
  );
};

export default Landing;
