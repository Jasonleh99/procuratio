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

const CELL_COLOR = "#ffb347";

const styles = {
  container: {
    maxWidth: "100%",
    maxHeight: "100%"
  },
  fullWidth: {
    marginTop: 100,
    width: "100%"
  },
  documentCell: {
    padding: 15,
    backgroundColor: CELL_COLOR
  },
  fadeIn: {
    height: "100%",
    width: "100%"
  }
};

class Documents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teacherId: this.props.match.params.teacher_id,
      documents: [],
      isLoading: true,
      open: false
    };
  }

  async componentDidMount() {
    const response = await fetch(`/api/documents/${this.state.teacherId}`);
    const body = await response.json();

    let documents = [];
    body.forEach(el => {
      documents.unshift({ title: el.title, pdf_link: el.pdf_link, id: el.id });
    });

    this.setState({ documents: documents, isLoading: false });
  }


  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  // implement function to make an api call
  async handleSubmit() {
    const name = document.querySelector("#document-title").value;
    let description = document.querySelector("#document-link").value;

    if (description.indexOf("http") === -1) {
      description = "https://".concat(description);
    }

    const teacherId = this.state.teacherId;
    const id = Math.floor(Math.random() * 9999999);

    await fetch(`/api/documents/new_document`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id,
        title: name,
        pdf_link: description,
        teacher: {
          id: teacherId
        }
      })
    }).then(() => {
      this.setState({
        documents: [...this.state.documents, { title: name, pdf_link: description, id: id }]
      });
    });

    this.handleClose();
  }

  async handleDeleteDocument(i) {
    await fetch(`/api/delete/document/${this.state.documents[i].id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(() => {
      let array = [...this.state.documents];
      array.splice(i, 1);
      this.setState({ documents: array });
    });
  }

  render() {
    const { classes } = this.props;
    const { documents, teacherId, open } = this.state;

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
                      <Typography variant="h2">Important Documents</Typography>
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
                          <Typography variant="h6">Create Document</Typography>
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid container>
                    <Grid item xs style={{ paddingBottom: "10px" }}>
                      {documents.map((document, i) => (
                        <Grid
                          container
                          alignItems="center"
                          style={{ marginTop: 20 }}
                          key={"documentCell_" + i}
                        >
                          <Grid item xs={11}>
                            <Paper
                              className={classes.documentCell}
                            >
                              <a
                                href={document.pdf_link}
                                style={{
                                  textDecoration: "none",
                                  color: "black"
                                }}
                                target="_"
                              >
                                <Typography variant="h4">
                                  {document.title}
                                </Typography>
                              </a>
                            </Paper>
                          </Grid>
                          <Grid item xs={1}>
                            <IconButton
                              onClick={() => this.handleDeleteDocument(i)}
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
          aria-labelledby="document-dialog"
        >
          <DialogTitle id="document-dialog">New Document</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Create a new document by specifying the title and a link to your
              document.
            </DialogContentText>
            <Grid container direction="column">
              <Grid item container xs>
                <TextField
                  autoFocus
                  id="document-title"
                  label="Document Title"
                  fullWidth
                  style={{ paddingBottom: "30px" }}
                />
                <TextField id="document-link" label="Document Link" fullWidth />
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
              onClick={() => this.handleSubmit()}
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

export default withStyles(styles)(Documents);
