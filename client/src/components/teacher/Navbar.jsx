import React from "react";

import { Link, withRouter } from "react-router-dom";
import {
  Drawer,
  MenuList,
  MenuItem,
  makeStyles,
  Typography,
  IconButton
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/MenuOutlined";

const MENU_BACKGROUND = "#9965F4";
const MENU_ITEM_HOVER = "white";

const useStyles = makeStyles(theme => ({
  root: {
    position: "absolute",
    zIndex: "1"
  },
  drawer: {
    width: 240,
    backgroundColor: MENU_BACKGROUND
  },
  menuHeader: {
    paddingLeft: 10
  },
  menuItem: {
    "&:hover": {
      background: MENU_ITEM_HOVER
    }
  }
}));

const Navbar = props => {
  const [state, setState] = React.useState({
    displayMenu: false
  });

  const classes = useStyles();

  const prefix = "/" + props.teacherId + "/teacher";

  const menu = (
    <MenuList>
      <MenuList>
        <Typography
          variant="h6"
          className={classes.menuHeader}
          style={{ color: "white" }}
        >
          Class
        </Typography>
        <MenuItem
          component={Link}
          to={{ pathname: prefix.concat("/class-roster") }}
          style={{ color: "white" }}
        >
          Class Roster
        </MenuItem>
        <MenuItem
          component={Link}
          to={{ pathname: prefix.concat("/assignments") }}
          style={{ color: "white" }}
        >
          Assignments
        </MenuItem>
        <MenuItem
          component={Link}
          to={{ pathname: prefix.concat("/grades") }}
          style={{ color: "white" }}
        >
          Grades
        </MenuItem>
      </MenuList>

      <MenuList>
        <Typography
          variant="h6"
          className={classes.menuHeader}
          style={{ color: "white" }}
        >
          Media
        </Typography>
        <MenuItem
          component={Link}
          to={{ pathname: prefix.concat("/announcements") }}
          style={{ color: "white" }}
        >
          Announcements
        </MenuItem>
        <MenuItem
          component={Link}
          to={{ pathname: prefix.concat("/notifications") }}
          style={{ color: "white" }}
        >
          Notifications
        </MenuItem>
      </MenuList>

      <MenuList>
        <Typography
          variant="h6"
          className={classes.menuHeader}
          style={{ color: "white" }}
        >
          Files
        </Typography>
        <MenuItem
          component={Link}
          to={{ pathname: prefix.concat("/resources") }}
          style={{ color: "white" }}
        >
          Resources
        </MenuItem>
        <MenuItem
          component={Link}
          to={{ pathname: prefix.concat("/documents") }}
          style={{ color: "white" }}
        >
          Documents
        </MenuItem>
      </MenuList>

      <MenuItem
        component={Link}
        to={{ pathname: "/" }}
        style={{ color: "white" }}
      >
        Logout
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
      <IconButton onClick={toggleMenu(true)} style={{ marginTop: "5px" }}>
        <MenuIcon fontSize="large" />
      </IconButton>
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
