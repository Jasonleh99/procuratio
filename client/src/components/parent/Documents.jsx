import React, { Component } from "react";
import { Grid, Typography, Paper } from "@material-ui/core";

import FadeIn from "react-fade-in";

import { withStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";

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
    marginTop: 20,
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
      parentId: this.props.match.params.parent_id,
      documents: [],
      isLoading: true
    };
  }

  async componentDidMount() {
    const response = await fetch(`/api/documents/200`);
    const body = await response.json();

    let documents = [];
    body.forEach(el => {
      documents.unshift({ title: el.title, pdf_link: el.pdf_link, id: el.id });
    });

    this.setState({ documents: documents, isLoading: false });
  }

  render() {
    const { classes } = this.props;
    const { documents, parentId } = this.state;

    return (
      <>
        <Navbar parentId={parentId} />
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
                  <Typography variant="h2">Important Documents</Typography>

                  <Grid container>
                    <Grid
                      item
                      xs
                      style={{ paddingBottom: "10px"}}
                    >
                      {documents.map((document, i) => (
                        <Paper
                          className={classes.documentCell}
                          key={"documentCell_" + i}
                        >
                          <a
                            href={document.pdf_link}
                            style={{ textDecoration: "none", color: "black" }}
                            target="_"
                          >
                            <Typography variant="h4">
                              {document.title}
                            </Typography>
                          </a>
                        </Paper>
                      ))}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={1} />
              </Grid>
            </Grid>
          </Grid>
        </FadeIn>
      </>
    );
  }
}

export default withStyles(styles)(Documents);
