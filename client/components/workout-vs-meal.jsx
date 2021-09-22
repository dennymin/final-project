import React from 'react';
import { makeStyles, Link, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => {
  return {
    gutterBottom: {
      marginBottom: '30px'
    },
    disabled: {
      color: 'grey',
      textDecoration: 'none',
      '&:hover': {
        cursor: 'pointer'
      }
    },
    active: {
      textDecoration: 'underline',
      fontStyle: 'italic',
      cursor: 'default'
    }
  };
});

export default function WorkoutsOrMeals(props) {
  const classes = useStyles();

  const currentWindow = () => {
    const currentURL = window.location.hash;
    if (currentURL.includes('meals')) {
      return (
        `/#app/social/workouts/${props.userId}`
      );
    } else if (currentURL.includes('workouts')) {
      return (
        `/#app/social/meals/${props.userId}`
      );
    }
  };

  const currentWindowClass = url => {
    const currentURL = window.location.hash;
    if (currentURL.includes(url)) {
      return (
        classes.active
      );
    } else {
      return (
        classes.disabled
      );
    }
  };

  return (
    <Grid
      className={classes.gutterBottom}
      container
      justifyContent='space-evenly'
    >
      <Grid item>
        <Typography>
          <Link
            underline='none'
            color='textPrimary'
            href={currentWindow()}
            className={currentWindowClass('workouts')}
          >
            Workouts
          </Link>
        </Typography>
      </Grid>
      <Grid item>
        <Typography>
          <Link
            underline='none'
            color='textPrimary'
            href={currentWindow()}
            className={currentWindowClass('meals')}
          >
            Meals
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
}
