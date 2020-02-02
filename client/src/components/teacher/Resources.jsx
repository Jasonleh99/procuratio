import React, { Component } from "react";
import {
  Grid,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  IconButton
} from "@material-ui/core";

import FadeIn from "react-fade-in";

import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";

import DeleteIcon from "@material-ui/icons/Delete";

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
      teacherId: this.props.match.params.teacher_id,
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
      isLoading: true,
      open: false
    };
  }

  /* async componentDidMount() {
    add in the api call here
  } */

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  // implement function to make an api call
  handleSubmit = () => {
    const name = document.querySelector("#resource-name").value;
    const description = document.querySelector("#resource-description").value;

    this.setState({
      resources: [...this.state.resources, { title: name, body: description }]
    });

    this.handleClose();
  };

  handleDeleteResource = i => {
    let array = [...this.state.resources];
    array.splice(i, 1);
    this.setState({ resources: array });
  };

  render() {
    const { classes } = this.props;
    const { resources, teacherId, open } = this.state;

    return (
      <>
        <Navbar teacherId={teacherId} />
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
                  <Grid container>
                    <Grid item xs>
                      <Typography variant="h2">Resources</Typography>
                    </Grid>
                    <Grid item xs>
                      <Grid
                        container
                        style={{ height: "100%" }}
                        justify="flex-end"
                        alignItems="center"
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleClickOpen}
                        >
                          <Typography variant="h6">Create Resource</Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs style={{ paddingBottom: "10px" }}>
                      {resources.map((resource, i) => (
                        <Grid
                          container
                          alignItems="center"
                          style={{ marginTop: 20 }}
                        >
                          <Grid item xs={11}>
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
                          </Grid>
                          <Grid item xs={1}>
                            <IconButton
                              onClick={() => this.handleDeleteResource(i)}
                            >
                              <DeleteIcon fontSize="large" />
                            </IconButton>
                          </Grid>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={1} />
              </Grid>
            </Grid>
          </Grid>
        </FadeIn>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="resource-dialog"
        >
          <DialogTitle id="resource-dialog">New Resource</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Create a new resource by specifying the name of your resource and
              a description of it (can put a link for students to access).
            </DialogContentText>
            <Grid container direction="column">
              <Grid item container xs>
                <TextField
                  autoFocus
                  id="resource-name"
                  label="Resource Name"
                  fullWidth
                  style={{ paddingBottom: "30px" }}
                />
                <TextField
                  id="resource-description"
                  label="Resource Description"
                  fullWidth
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleClose}
              variant="contained"
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={this.handleSubmit}
              variant="contained"
              color="primary"
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

export default withStyles(styles)(Resources);
