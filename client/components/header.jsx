import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  pageHeader: {
    marginTop: '30px',
    marginBottom: '20px',
    fontFamily: 'Roboto Condensed',
    fontWeight: '600',
    fontStyle: 'italic'
  }
});

export default function Header(props) {
  const classes = useStyles();
  return (
        <Typography
          variant='h4'
          component='h2'
          align='center'
          gutterBottom
          className={classes.pageHeader}
        >
          New Workout
        </Typography>
  );
}
