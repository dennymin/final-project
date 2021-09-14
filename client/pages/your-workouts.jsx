import { Grid, Card, CardContent, CardActions, Collapse, Typography, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles(theme => {
  return {
    cardClass: {
      width: '100%',
      margin: 15,
      border: '1px hidden',
      borderRadius: 10,
      paddingTop: 5,
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
      marginBottom: 3
    },
    cardCategoryContent: {
      fontStyle: 'italic',
      fontSize: '1.3rem',
      color: '#52616B'
    },
    detailsExpanded: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap'
    },
    smallDetails: {
      fontSize: '0.8rem',
      color: 'rgb(150, 150, 150)',
      marginTop: 20,
      marginBottom: 7,
      '&:hover': {
        cursor: 'pointer'
      }
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
      const [expanded, setExpanded] = useState(false);
      const handleExpandClick = () => {
        setExpanded(!expanded);
      };
      const workoutDate = new Date(workout.date);
      const workingDate = workoutDate.toDateString().split('');
      workingDate.splice(3, 0, ',');
      workingDate.splice(11, 0, ',');
      const renderedDate = workingDate.join('');
      return (
        <Grid
          key={workout.workoutId}
          item={true}
          md={6}
          lg={4}
          container
        >
          <Card
          className={classes.cardClass}
          raised={true}>

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
                Workout Length:
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
                Calories:
              </Typography>
              <Typography
                className={classes.cardCategoryContent}
                paragraph={true}
              >
                {workout.caloriesBurned} Calories Burned
              </Typography>

              <Typography
                className={classes.cardCategoryHeader}
              >
                Muscles Worked Out:
              </Typography>
              <Typography
                className={classes.cardCategoryContent}
                paragraph={false}
              >
                {workout.muscles}
              </Typography>

              <CardActions className={classes.detailsExpanded}>
                <Typography
                  onClick={handleExpandClick}
                  className={classes.smallDetails}
                >
                  Expand for Details</Typography>
              </CardActions>
              <Collapse
                in={expanded}
                timeout='auto'
                unmountOnExit
              >
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
              </Collapse>

            </CardContent>
          </Card>
        </Grid>
      );
    });
    return (
        <Grid
          spacing={2}
          container
          justifyContent='flex-start'
        >
          {renderedWorkouts}
        </Grid>
    );
  };

  return (
    <WorkoutList entries={serverData}/>
  );
}
