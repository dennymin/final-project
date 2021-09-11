import React from 'react';
import { Drawer, IconButton, makeStyles, List, ListItem, Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 200;

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
    }
  };
});

export default function TempDrawer() {
  const classes = useStyles();
  const theme = createTheme({
    overrides: {
      MuiAccordion: {

      }
    }
  });

  const [state, setState] = React.useState(false);
  const toggleDrawer = e => {
    state === true ? setState(false) : setState(true);
  };

  const list = () => {
    return (
    <div>
      <List>
        <ListItem className={classes.listFont}>
          <Accordion>
            <AccordionSummary>
              My Fitness
            </AccordionSummary>
            <AccordionDetails>
                <Typography
                  fullWidth
                  href='#/app/new/workout'
                >
                  New Workout
                </Typography>
                <Typography
                  fullWidth
                  href='#/app/new/meal'
                >
                  New Meal
                </Typography>
            </AccordionDetails>
          </Accordion>
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
