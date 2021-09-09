import React from 'react';
import { Container, Typography, makeStyles, createTheme, ThemeProvider } from '@material-ui/core';
import NewWorkoutForm from './new-workout';
const useStyles = makeStyles({
  marginTop10pxBottom20px: {
    marginTop: '30px',
    marginBottom: '20px'
  },
  backgroundColor: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100vh',
    backgroundColor: '#F0F5F9'
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
        <Container className={classes.backgroundColor}>
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
        </ThemeProvider>
    </>
  );
}
