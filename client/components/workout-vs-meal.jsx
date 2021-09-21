import React from 'react';
import { makeStyles, Link, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => {
  return {
    gutterBottom: {
      marginBottom: '30px'
    },
    categories: {
      '&:hover': {
        cursor: 'pointer',
        fontStyle: 'italic'
      }
    },
    disabled: {
      color: 'grey',
      cursor: 'not-allowed',
      textDecoration: 'none'
    },
    active: {
      textDecoration: 'underline'
    }
  };
});

export default function WorkoutsOrMeals(props) {
  const classes = useStyles();

  const currentWindow = () => {
    const currentURL = window.location.hash;
    if (currentURL.includes('meals')) {
      return (
        `#app/social/workouts/${props.userId}`
      );
    } else if (currentURL.includes('workouts')) {
      return (
        `#app/social/meals/${props.userId}`
      );
    }
  };

  // const currentWindowClass = () => {
  //   const currentURL = window.location.hash;
  //   if (currentURL.includes('meals')) {
  //     return (
  //       `#app/social/workouts/${props.userId}`
  //     );
  //   } else if (currentURL.includes('workouts')) {
  //     return (
  //       `#app/social/meals/${props.userId}`
  //     );
  //   }
  // };

  return (
    <Grid
      className={classes.gutterBottom}
      container
      justifyContent='space-evenly'
    >
      <Grid item>
        <Typography
          className={classes.categories}
        >
          <Link
            underline='none'
            color='textPrimary'
            href={currentWindow()}
          >
            Workouts
          </Link>
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          className={classes.categories}
        >
          <Link
            underline='none'
            color='textPrimary'
            href={currentWindow()}
          >
            Meals
          </Link>
        </Typography>
      </Grid>
    </Grid>
  );
}
