import React from 'react';
import { Container, Typography, makeStyles } from '@material-ui/core';
import NewWorkoutForm from './new-workout';
const useStyles = makeStyles({
  marginTop10pxBottom20px: {
    marginTop: '30px',
    marginBottom: '20px'
  }
});

export default function Home(props) {
  const classes = useStyles();
  return (
    <>
      <Container>
          <Typography
            variant='h4'
            component='h2'
            align='center'
            gutterBottom
          className={classes.marginTop10pxBottom20px}
          >
            New Workout
          </Typography>

          <NewWorkoutForm />
      </Container>
    </>
  );
}
