import { Card, CardContent, Typography, makeStyles, TextField, Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

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
    }
  };
});

export default function Home(props) {
  const classes = useStyles();
  const [serverData, pullServerData] = useState([]);
  const dateToday = new Date();
  const dateForPicker = `${dateToday.getFullYear()}-${dateToday.getMonth() + 1}-${dateToday.getDate()}`;
  const workingDate = dateToday.toDateString().split('');
  workingDate.splice(3, 0, ',');
  workingDate.splice(11, 0, ',');
  const renderedDate = workingDate.join('');
  const todayInMilSeconds = dateToday.getTime();
  const lastWeekInSeconds = todayInMilSeconds - (604800 * 1000);
  const lastWeekDate = new Date(lastWeekInSeconds);
  const lastWeekDatePicker = `${lastWeekDate.getFullYear()}-${lastWeekDate.getMonth() + 1}-${lastWeekDate.getDate()}`;
  const lastWeekWorkingDate = lastWeekDate.toDateString().split('');
  lastWeekWorkingDate.splice(3, 0, ',');
  lastWeekWorkingDate.splice(11, 0, ',');
  const renderedStartDate = lastWeekWorkingDate.join('');

  useEffect(() => {
    let isCanceled = false;
    const serverAddress = '/api/your/fitness';
    fetch(serverAddress)
      .then(response => response.json())
      .then(data => {
        !isCanceled && pullServerData(data);
      });
    return () => { isCanceled = true; };
  }, []);

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
    <Button
        onClick={() => console.log(dateForPicker, lastWeekDatePicker)}
    >
      Info
    </Button>
      <Card
        className={classes.cardClass}
        raised={true}>
        <CardContent>
          {/* <Typography
            className={classes.cardCategoryHeader}
          >
            Today:
          </Typography>
          <Typography
            className={classes.cardCategoryContent}
            paragraph={true}
          >
            {renderedDate}
          </Typography>

          <Typography
            className={classes.cardCategoryHeader}
          >
            Starting from:
          </Typography>
          <Typography
            className={classes.cardCategoryContent}
            paragraph={true}
          >
            {renderedStartDate}
          </Typography> */}

          <form>
            <TextField
              label='Today'
              name='today'
              variant='filled'
              margin='normal'
              type='date'
              InputLabelProps={{ shrink: true }}
              fullWidth
              // onChange={event => {

              // }}
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
    </>
  );
}
