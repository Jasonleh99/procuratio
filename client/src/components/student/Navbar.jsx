import React from "react";

import { Link, withRouter } from "react-router-dom";
import {
  Button,
  Drawer,
  MenuList,
  MenuItem,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    position: "absolute"
  },
  drawer: {
    width: 240
  }
}));

const Navbar = () => {
  const [state, setState] = React.useState({
    displayMenu: false
  });

  const classes = useStyles();

  const menu = (
    <MenuList>
      <MenuItem component={Link} to={{ pathname: "/" }}>
        Home
      </MenuItem>
      <MenuItem component={Link} to={{ pathname: "/announcement" }}>
        Announcements
      </MenuItem>
      <MenuItem component={Link} to={{ pathname: "/assignments" }}>
        Assignments
      </MenuItem>
      <MenuItem>Grades</MenuItem>
      <MenuItem>Resources</MenuItem>
      <MenuItem>Contact Teacher</MenuItem>
    </MenuList>
  );

  const toggleMenu = open => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ displayMenu: open });
  };

  return (
    <div>
      <Button onClick={toggleMenu(true)}>Menu</Button>
      <Drawer
        open={state.displayMenu}
        onClose={toggleMenu(false)}
        classes={{ paper: classes.drawer }}
      >
        {menu}
      </Drawer>
    </div>
  );
};

export default withRouter(Navbar);
