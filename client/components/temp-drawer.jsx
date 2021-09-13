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
      top: 20,
      left: 10
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
        root: {
          backgroundColor: '#F0F5F9',
          width: '100%'
        }
      },
      MuiAccordionSummary: {
        root: {
          fontWeight: '500'
        }
      },
      MuiAccordionDetails: {
        root: {
          backgroundColor: '#e8e8e8'
        }
      },
      MuiDrawer: {
        paper: {
          backgroundColor: '#C9D6DF'
        }
      }
    }
  });

  const [state, setState] = React.useState(false);
  const toggleDrawer = e => {
    state === true ? setState(false) : setState(true);
  };

  const list = () => {
    return (
    <>
      <List>
        <ListItem className={classes.listFont}>
          <Accordion square={true}>
            <AccordionSummary>
              My Fitness
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Link
                  href='/#app/your/workouts'
                  underline='hover'
                  color='textPrimary'
                  onClick={e => toggleDrawer(e)}
                >
                  Your Workouts
                </Link>
              </Typography>
            </AccordionDetails>
            <AccordionDetails>
              <Typography>
                <Link
                  href='/#app/new/workout'
                  underline='hover'
                  color='textPrimary'
                  onClick={e => toggleDrawer(e)}
                >
                  New Workout
                </Link>
              </Typography>
            </AccordionDetails>
            <AccordionDetails>
              <Typography>
                <Link
                  href='/#app/new/meal'
                  underline='hover'
                  color='textPrimary'
                  onClick={e => toggleDrawer(e)}
                >
                  New Meal
                </Link>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </ListItem>
      </List>
    </>
    );
  };

  return (
    <ThemeProvider theme = { theme }>
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
    </ThemeProvider>
  );
}
