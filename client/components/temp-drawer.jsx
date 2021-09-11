import React from 'react';
import { Drawer, IconButton, makeStyles, List, ListItem, Accordion, AccordionSummary, AccordionDetails, Typography, Link } from '@material-ui/core';
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
                href='/#app/new/workout'
              >
                <Link
                  href='/#app/new/workout'
                  underline='hover'
                >
                  New Workout
                </Link>
              </Typography>
            </AccordionDetails>
            <AccordionDetails>
              <Typography
                href='/#app/new/meal'
              >
                <Link
                  href='/#app/new/meal'
                  underline='hover'
                >
                  New Meal
                </Link>
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
