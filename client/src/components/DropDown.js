import React, { Component } from "react";
import { Spring } from "react-spring/renderprops";
import { Grid, Typography, Button, makeStyles } from "@material-ui/core";

export class DropDown extends Component {
  render() {
    return (
      <Spring from={{ opacity: 1 }}>
        {props => (
          <div style={props}>
            <div style={c2Style}>
              <Typography variant="h1">Procuratio</Typography>
            </div>
          </div>
        )}
      </Spring>
    );
  }
}

const c2Style = {
  background: "slateblue",
  color: "white",
  padding: "1.5rem"
};

export default DropDown;
