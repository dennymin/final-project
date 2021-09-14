import React from 'react';
import { Drawer, IconButton, makeStyles, List, ListItem, Accordion, AccordionSummary, AccordionDetails, Typography, Link } from '@material-ui/core';
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

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const list = () => {
    return (
    <>
      <List>
        <ListItem className={classes.listFont}>
          <Accordion square={true} expanded={true}>
            <AccordionSummary>
              My Fitness
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <Link
                  href='/#app/your/workouts'
                  underline='none'
                  color='textPrimary'
                  onClick={e => setIsDrawerOpen(!isDrawerOpen)}
                >
                  Your Workouts
                </Link>
              </Typography>
            </AccordionDetails>
            <AccordionDetails>
              <Typography>
                <Link
                  href='/#app/new/workout'
                  underline='none'
                  color='textPrimary'
                  onClick={e => setIsDrawerOpen(!isDrawerOpen)}
                >
                  New Workout
                </Link>
              </Typography>
            </AccordionDetails>
            <AccordionDetails>
              <Typography>
                <Link
                  href='/#app/new/meal'
                  underline='none'
                  color='textPrimary'
                  onClick={e => setIsDrawerOpen(!isDrawerOpen)}
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
  // <ThemeProvider theme = { theme }>
      <span className={classes.positioning}>
        <IconButton
          onClick={e => setIsDrawerOpen(!isDrawerOpen)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
        className={classes.drawer}
        open={isDrawerOpen}
        variant='temporary'
        classes={{ paper: classes.drawerPaper }}
          onClose={e => setIsDrawerOpen(!isDrawerOpen)}
        >
          {list()}
        </Drawer>
        </span>
  // </ThemeProvider>
  );
}
