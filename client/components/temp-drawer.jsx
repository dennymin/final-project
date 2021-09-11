import React from 'react';
import { Drawer, IconButton, makeStyles, Button, List, ListItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 150;

const useStyles = makeStyles(theme => {
  return {
    drawer: {
      width: drawerWidth
    },
    drawerPaper: {
      width: drawerWidth
    },
    positioning: {
      position: 'absolute',
      top: 20
    },
    listFont: {
      fontFamily: 'Roboto',
      padding: 0
    },
    fullWidth: {
      width: '100%'
    }
  };
});

export default function TempDrawer() {
  const [state, setState] = React.useState(false);
  const classes = useStyles();
  const toggleDrawer = e => {
    state === true ? setState(false) : setState(true);
  };

  const list = () => {
    return (
    <div>
      <List>
        <ListItem className={classes.listFont}>
          <Button className={classes.fullWidth}>
            My Fitness
          </Button>
        </ListItem>
      </List>
    </div>
    );
  };

  return (
    <span className={classes.positioning}>
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
        {list()}
      </Drawer>
    </span>
  );
}
