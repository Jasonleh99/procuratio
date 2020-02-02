import React from "react";
import ReactDOM from "react-dom";
import { Spring } from "react-spring/renderprops";
import { Grid, Typography, Button, makeStyles } from "@material-ui/core";

import { Keyframes, animated, config } from "react-spring/renderprops";
import delay from "delay";

export default function FadeIn() {
  return (
    <Spring from={{ opacity: 1 }}>
      {props => (
        <div style={props}>
          <div style={c1Style}>
            <Typography Typography="Roboto" variant="h2">
              my hero academia
            </Typography>
            {/*<Typography variant="h4">
              Serving
              <Spring
                from={{ number: 0 }}
                to={{ number: 1000 }}
                config={{
                  delay: 1500,
                  duration: 3000
                }}
              >
                {props => <div>{props.number.toFixed()}</div>}
              </Spring>
              </Typography>*/}
          </div>
        </div>
      )}
    </Spring>
  );
}

const c1Style = {
  background: "steelblue",
  color: "white",
  padding: "1.5rem"
};

const counter = {
  background: "#333",
  textAlign: "center",
  width: "100px",
  borderRadius: "50%",
  margin: "1rem auto"
};
