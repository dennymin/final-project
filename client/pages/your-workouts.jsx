import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles(theme => {
  return {
    cardClass: {
      width: '100%',
      margin: 15,
      border: '1px hidden',
      borderRadius: 25,
      padding: 5
    },
    centering: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    italics: {
      fontStyle: 'italic',
      fontSize: '1.5rem'
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
    details: ''
  }]);

  useEffect(() => {
    const serverAddress = '/api/your/workouts';
    fetch(serverAddress, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        pullServerData(data);
      });
  }
  );

  const WorkoutList = props => {
    const workoutList = props.entries;
    const renderedWorkouts = workoutList.map(workout => {
      const workoutDate = new Date(workout.date);
      const workingDate = workoutDate.toDateString().split('');
      workingDate.splice(3, 0, ',');
      workingDate.splice(11, 0, ',');
      const renderedDate = workingDate.join('');
      return (
        <Card key={workout.date} className={classes.cardClass} raised={false}>
          <CardContent>
            <Typography
            className={classes.italics}
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
