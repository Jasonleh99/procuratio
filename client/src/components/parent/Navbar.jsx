import React from "react";

import { Link, withRouter } from "react-router-dom";
import {
  Button,
  Drawer,
  MenuList,
  MenuItem,
  makeStyles,
  Typography
} from "@material-ui/core";

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
        <MenuItem
          component={Link}
          to={{ pathname: prefix.concat("/contact") }}
          className={classes.menuItem}
        >
          Contact Teacher
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
