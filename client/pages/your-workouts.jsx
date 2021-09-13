import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles(theme => {
  return {
    cardClass: {
      width: '100%',
      margin: 15,
      border: '1px hidden',
      borderRadius: 25,
      padding: 5,
      backgroundColor: '#e8e8e8'
    },
    centering: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    dateSection: {
      fontStyle: 'italic',
      fontSize: '1.6rem'
    },
    cardCategoryHeader: {
      fontWeight: 'bold',
      fontSize: '1.4rem',
      marginBottom: 4
    },
    cardCategoryContent: {
      fontStyle: 'italic',
      fontSize: '1.3rem',
      color: '#52616B'
    }
  };
});

export default function YourWorkouts(props) {
  const classes = useStyles();
  const [serverData, pullServerData] = useState([{
    userId: 0,
    date: '',
    length: 0,
    caloriesBurned: 0,
    details: '',
    workoutId: 0
  }]);

  useEffect(() => {
    let isCanceled = false;
    const serverAddress = '/api/your/workouts';
    fetch(serverAddress)
      .then(response => response.json())
      .then(data => {
        !isCanceled && pullServerData(data);
      });
    return () => { isCanceled = true; };
  }, []);

  const WorkoutList = props => {
    const workoutList = props.entries;
    const renderedWorkouts = workoutList.map(workout => {
      const workoutDate = new Date(workout.date);
      const workingDate = workoutDate.toDateString().split('');
      workingDate.splice(3, 0, ',');
      workingDate.splice(11, 0, ',');
      const renderedDate = workingDate.join('');
      return (
        <Card key={workout.workoutId} className={classes.cardClass} raised={true}>
          <CardContent>
            <Typography
              className={classes.dateSection}
              paragraph={true}
            >
              {renderedDate}
            </Typography>

            <Typography
              className={classes.cardCategoryHeader}
            >
              Length:
            </Typography>
            <Typography
              className={classes.cardCategoryContent}
              paragraph={true}
            >
              {workout.length} Minutes
            </Typography>

            <Typography
              className={classes.cardCategoryHeader}
            >
              Calories Burned:
            </Typography>
            <Typography
              className={classes.cardCategoryContent}
              paragraph={true}
            >
              {workout.caloriesBurned}
            </Typography>

            <Typography
              className={classes.cardCategoryHeader}
            >
              Muscle Groups:
            </Typography>
            <Typography
              className={classes.cardCategoryContent}
              paragraph={true}
            >
              {workout.muscles}
            </Typography>

            <Typography
              className={classes.cardCategoryHeader}
            >
              Details:
            </Typography>
            <Typography
              className={classes.cardCategoryContent}
            >
              {workout.details}
            </Typography>

          </CardContent>
        </Card>);
    });
    return (
      <div className={classes.centering}>
        {renderedWorkouts}
      </div>
    );
  };

  return (
    <WorkoutList entries={serverData}/>
  );
}
