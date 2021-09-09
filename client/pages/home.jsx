import React from 'react';
import { Container, Typography, makeStyles, createTheme, ThemeProvider } from '@material-ui/core';
import NewWorkoutForm from './new-workout';
const useStyles = makeStyles({
  pageHeader: {
    marginTop: '30px',
    marginBottom: '20px',
    fontFamily: 'Roboto Condensed',
    fontWeight: '600',
    fontStyle: 'italic'
  }
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#52616B'
    }
  }
});

export default function Home(props) {
  const classes = useStyles();
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container>
            <Typography
              variant='h4'
              component='h2'
              align='center'
              gutterBottom
            className={classes.pageHeader}
            >
              New Workout
            </Typography>

            <NewWorkoutForm />
        </Container>
        </ThemeProvider>
    </>
  );
}
