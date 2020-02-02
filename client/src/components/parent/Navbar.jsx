import React from "react";

import { Link, withRouter } from "react-router-dom";
import {
  IconButton,
  Drawer,
  MenuList,
  MenuItem,
  makeStyles,
  Typography
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/MenuOutlined";

const MENU_BACKGROUND = "#8ef5f0";
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

  // TODO: Handle undefined case for props.parentId
  const prefix = "/" + props.parentId + "/parent";

  const menu = (
    <MenuList className={classes.menuWrapper}>
      <MenuList>
        <MenuItem
          component={Link}
          to={{ pathname: prefix.concat("/student-summary") }}
          className={classes.menuItem}
        >
          Overview
        </MenuItem>
      </MenuList>

      <MenuList>
        <Typography variant="h6" className={classes.menuHeader}>
          Class
        </Typography>
        <MenuItem
          component={Link}
          to={{ pathname: prefix.concat("/assignments") }}
          className={classes.menuItem}
        >
          View Student Assignments
        </MenuItem>
        <MenuItem
          component={Link}
          to={{ pathname: prefix.concat("/grades") }}
          className={classes.menuItem}
        >
          View Student Grades
        </MenuItem>
      </MenuList>

      <MenuList>
        <Typography variant="h6" className={classes.menuHeader}>
          Media
        </Typography>
        <MenuItem
          component={Link}
          to={{ pathname: prefix.concat("/announcements") }}
          className={classes.menuItem}
        >
          Announcements
        </MenuItem>
        <MenuItem
          component={Link}
          to={{ pathname: prefix.concat("/notifications") }}
          className={classes.menuItem}
        >
          Notifications
        </MenuItem>
      </MenuList>

      <MenuList>
        <Typography variant="h6" className={classes.menuHeader}>
          Files
        </Typography>
        <MenuItem
          component={Link}
          to={{ pathname: prefix.concat("/resources") }}
          className={classes.menuItem}
        >
          Resources
        </MenuItem>
        <MenuItem
          component={Link}
          to={{ pathname: prefix.concat("/documents") }}
          className={classes.menuItem}
        >
          Documents
        </MenuItem>
      </MenuList>

      <MenuItem component={Link} to={{ pathname: "/" }}>
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
