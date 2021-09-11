import React from 'react';
import { Drawer, IconButton, makeStyles, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 150;

const useStyles = makeStyles(theme => {
  return {
    drawer: {
      width: drawerWidth
    },
    drawerPaper: {
      width: drawerWidth
    }
  };
});

export default function TempDrawer() {
  const [state, setState] = React.useState(false);
  const classes = useStyles();
  const toggleDrawer = e => {
    state === true ? setState(false) : setState(true);
  };
  return (
    <>
      <IconButton
        onClick={e => toggleDrawer(e)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
      className={classes.drawer}
      open={state}
      variant='temporary'
      classes={{ paper: classes.drawerPaper }}
      onClose={e => toggleDrawer(e)}
      >
        <Typography onClick={e => toggleDrawer(e)} onKeyDown={e => toggleDrawer(e)}>Hi</Typography>
      </Drawer>
    </>
  );
}
