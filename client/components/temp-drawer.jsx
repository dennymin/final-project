import React, { useEffect } from 'react';
import { Drawer, IconButton, makeStyles, List, ListItem, Accordion, AccordionSummary, AccordionDetails, Typography, Link, Button } from '@material-ui/core';
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
    },
    logout: {
      fontStyle: 'italic'
    }
  };
});

export default function TempDrawer() {
  const classes = useStyles();

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [isFitnessOpen, setIsFitnessOpen] = React.useState(false);
  const [isSocialOpen, setIsSocialOpen] = React.useState(false);

  useEffect(() => {
    if (window.location.hash === '#app/home' || window.location.hash === '#app/your/workouts' || window.location.hash === '#app/your/meals' || window.location.hash === '#app/new/workout' || window.location.hash === '#app/new/meal') {
      setIsFitnessOpen(true);
    }
    if (window.location.hash === '#app/social') {
      setIsSocialOpen(true);
    }
  }, [isDrawerOpen]);

  return (
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
        <List>
          <ListItem className={classes.listFont}>
            <Accordion square={true} expanded={isFitnessOpen}>
              <AccordionSummary
                onClick={event => {
                  setIsFitnessOpen(!isFitnessOpen);
                  if (isSocialOpen === true) {
                    setIsSocialOpen(false);
                  }
                }}
              >
                My Fitness
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <Link
                    href='/#app/home'
                    underline='none'
                    color='textPrimary'
                    onClick={e => setIsDrawerOpen(!isDrawerOpen)}
                  >
                    Fitness Report
                  </Link>
                </Typography>
              </AccordionDetails>
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
                    href='/#app/your/meals'
                    underline='none'
                    color='textPrimary'
                    onClick={e => setIsDrawerOpen(!isDrawerOpen)}
                  >
                    Your Meals
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
          <ListItem className={classes.listFont}>
            <Accordion square={true} expanded={isSocialOpen}>
              <AccordionSummary
                onClick={event => {
                  setIsSocialOpen(!isSocialOpen);
                  if (isFitnessOpen === true) {
                    setIsFitnessOpen(false);
                  }
                }}
              >
                Social
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <Link
                    href='/#app/social'
                    underline='none'
                    color='textPrimary'
                    onClick={e => setIsDrawerOpen(!isDrawerOpen)}
                  >
                    Others
                  </Link>
                </Typography>
              </AccordionDetails>
            </Accordion>
          </ListItem>
          <Button
            color='secondary'
            className={classes.logout}
            variant='contained'
            fullWidth
            onClick={e => {
              setIsDrawerOpen(!isDrawerOpen);
              window.localStorage.setItem('signin-token', '');
              window.location.hash = '';
            }}
          >
            Sign Out
          </Button>
        </List>
        </Drawer>
      </span>
  );
}
