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
    position: "absolute",
    zIndex: "1"
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
      <MenuItem component={Link} to={{ pathname: "/announcements" }}>
        Announcements
      </MenuItem>
      <MenuItem component={Link} to={{ pathname: "/assignments" }}>
        Assignments
      </MenuItem>
      <MenuItem component={Link} to={{ pathname: "/grades" }}>
        Grades
      </MenuItem>
      <MenuItem component={Link} to={{ pathname: "/resources" }}>
        Resources
      </MenuItem>
      <MenuItem component={Link} to={{ pathname: "/contact"}}>
        Contact Teacher
      </MenuItem>
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
    <div className={classes.root}>
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
