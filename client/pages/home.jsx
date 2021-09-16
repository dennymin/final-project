import { Card, CardContent, Typography, makeStyles, TextField, Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import { sub, format } from 'date-fns';

const useStyles = makeStyles(theme => {
  return {
    cardClass: {
      width: '100%',
      border: '1px hidden',
      borderRadius: 10,
      paddingTop: 5,
      backgroundColor: '#e8e8e8'
    },
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
    fetch(serverAddress)
      .then(response => response.json())
      .then(data => {
        !isCanceled && pullServerData(data);
      });
    return () => { isCanceled = true; };
  }, [startDate, endDate]);

  const returningNumbers = {
    workouts: serverData.length,
    workoutTime: 0,
    caloriesBurned: 0,
    musclesWorked: {
      Chest: 0,
      Back: 0,
      Arms: 0,
      Legs: 0
    }
  };

  for (let i = 0; i < serverData.length; i++) {
    returningNumbers.workoutTime = serverData[i].length + returningNumbers.workoutTime;
    returningNumbers.caloriesBurned = serverData[i].caloriesBurned + returningNumbers.caloriesBurned;
    if (serverData[i].muscles.includes('Chest')) {
      returningNumbers.musclesWorked.Chest = returningNumbers.musclesWorked.Chest + 1;
    }
    if (serverData[i].muscles.includes('Back')) {
      returningNumbers.musclesWorked.Back = returningNumbers.musclesWorked.Chest + 1;
    }
    if (serverData[i].muscles.includes('Arms')) {
      returningNumbers.musclesWorked.Arms = returningNumbers.musclesWorked.Chest + 1;
    }
    if (serverData[i].muscles.includes('Legs')) {
      returningNumbers.musclesWorked.Legs = returningNumbers.musclesWorked.Chest + 1;
    }
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
          <Card
          className={classes.cardClass}
          raised={true}>
          <CardContent>

            <form>
              <TextField
                label='End Date'
                name='endDate'
                variant='outlined'
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
                variant='outlined'
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
              Workouts:
            </Typography>
            <Typography
              className={classes.cardCategoryContent}
              paragraph={true}
            >
              {returningNumbers.workouts}
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
              {(returningNumbers.workoutTime / returningNumbers.workouts).toFixed(2)} Minutes
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
              {(returningNumbers.caloriesBurned / returningNumbers.workouts).toFixed(2)} Calories/Workout
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
              {returningNumbers.caloriesBurned} Calories Burned
            </Typography>

            <Typography
              className={classes.cardCategoryHeader}
            >
              Muscles Worked Out:
            </Typography>
            <Typography
              className={classes.cardCategoryContent}
            >
              Chest: {returningNumbers.musclesWorked.Chest}
            </Typography>
            <Typography
              className={classes.cardCategoryContent}
            >
              Back: {returningNumbers.musclesWorked.Back}
            </Typography>
            <Typography
              className={classes.cardCategoryContent}
            >
              Arms: {returningNumbers.musclesWorked.Arms}
            </Typography>
            <Typography
              className={classes.cardCategoryContent}
            >
              Legs: {returningNumbers.musclesWorked.Legs}
            </Typography>
          </CardContent>
        </Card>
        </Grid>
      </Grid>
    </>
  );
}
