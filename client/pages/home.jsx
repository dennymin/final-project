import { Card, CardContent, Typography, makeStyles, TextField, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import { sub, format } from 'date-fns';
import Spinner from '../components/spinner';

const useStyles = makeStyles(theme => {
  return {
    cardCategoryHeader: {
      fontWeight: 'bold',
      fontSize: '1.4rem',
      marginBottom: 3
    },
    cardCategoryContent: {
      fontStyle: 'italic',
      fontSize: '1.3rem',
      color: '#52616B'
    },
    gutter: {
      marginBottom: 20
    }
  };
});

export default function Home(props) {
  const classes = useStyles();
  const [serverData, pullServerData] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const dateToday = new Date();
  const defaultEndPicker = format(dateToday, 'yyyy-MM-dd');
  const weekAgo = sub(new Date(), { days: 7 });
  const defaultStartPicker = format(weekAgo, 'yyyy-MM-dd');

  const [endDate, setEndDate] = useState(defaultEndPicker);
  const [startDate, setStartDate] = useState(defaultStartPicker);
  const params = new URLSearchParams({ startDate, endDate });
  const queryString = '?' + params.toString();

  useEffect(() => {
    let isCanceled = false;
    const serverAddress = '/api/your/fitness' + queryString;
    fetch(serverAddress, {
      method: 'GET',
      headers: {
        'signin-token': window.localStorage.getItem('signin-token')
      }
    })
      .then(response => response.json())
      .then(data => {
        setLoaded(true);
        !isCanceled && pullServerData(data);
      });
    return () => { isCanceled = true; };
  }, [startDate, endDate]);

  if (!loaded) {
    return (
    <>
      <Spinner/>
    </>
    );
  }

  return (
    <>
      <Header title='FITNESS REPORT'/>
      <Grid
        container
        justifyContent='center'
      >
        <Grid
          item
          xs={12}
          sm={10}
          md={10}
          lg={10}
          xl={10}
        >
          <Card raised={true}>
          <CardContent>
            <form>
              <TextField
                label='End Date'
                name='endDate'
                variant='standard'
                margin='normal'
                type='date'
                InputLabelProps={{ shrink: true }}
                defaultValue={defaultEndPicker}
                fullWidth
                onChange={event => {
                  setEndDate(event.target.value);
                }}
                className={classes.gutter}
              />

              <TextField
                label='Start Date'
                name='startDate'
                variant='standard'
                margin='normal'
                type='date'
                InputLabelProps={{ shrink: true }}
                defaultValue={defaultStartPicker}
                fullWidth
                onChange={event => {
                  setStartDate(event.target.value);
                }}
                className={classes.gutter}
              />
            </form>

            <Typography
              className={classes.cardCategoryHeader}
            >
              Number of Workouts:
            </Typography>
            <Typography
              className={classes.cardCategoryContent}
              paragraph={true}
            >
              {serverData.workouts}
            </Typography>

            <Typography
              className={classes.cardCategoryHeader}
            >
              Average Workout Time:
            </Typography>
            <Typography
              className={classes.cardCategoryContent}
              paragraph={true}
            >
              {serverData.workoutTime / serverData.workouts} Minutes
            </Typography>

            <Typography
              className={classes.cardCategoryHeader}
            >
              Average Calories Burned:
            </Typography>
            <Typography
              className={classes.cardCategoryContent}
              paragraph={true}
            >
              {(serverData.caloriesBurned / serverData.workouts).toFixed(2)} Calories/Workout
            </Typography>

            <Typography
              className={classes.cardCategoryHeader}
            >
              Total Calories Burned:
            </Typography>
            <Typography
              className={classes.cardCategoryContent}
              paragraph={true}
            >
              {serverData.caloriesBurned} Calories Burned
            </Typography>

            <Typography
              className={classes.cardCategoryHeader}
            >
              Muscles Worked Out:
            </Typography>
            <Typography
              className={classes.cardCategoryContent}
            >
              Chest: {serverData.Chest}
            </Typography>
            <Typography
              className={classes.cardCategoryContent}
            >
              Back: {serverData.Back}
            </Typography>
            <Typography
              className={classes.cardCategoryContent}
            >
              Arms: {serverData.Arms}
            </Typography>
            <Typography
              className={classes.cardCategoryContent}
            >
              Legs: {serverData.Legs}
            </Typography>
          </CardContent>
        </Card>
        </Grid>
      </Grid>
    </>
  );
}
