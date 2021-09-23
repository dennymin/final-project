import { Grid, Card, CardContent, CardActions, Collapse, Typography, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { add, format } from 'date-fns';
import Header from '../components/header';
import WorkoutsOrMeals from '../components/workout-vs-meal';
import Spinner from '../components/spinner';

const useStyles = makeStyles(theme => {
  return {
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
      flexWrap: 'wrap',
      flexGrow: 2
    },
    smallDetails: {
      fontSize: '0.8rem',
      color: 'rgb(150, 150, 150)',
      marginTop: 20,
      marginBottom: 7,
      '&:hover': {
        cursor: 'pointer'
      }
    },
    buttonColor: {
      backgroundColor: '#C9D6DF'
    },
    categories: {
      '&:hover': {
        cursor: 'pointer',
        fontStyle: 'italic'
      }
    },
    gutterBottom: {
      marginBottom: '30px'
    }
  };
});

export default function UserWorkouts(props) {
  const classes = useStyles();
  const [serverData, pullServerData] = useState([{
    userId: 0,
    date: new Date(),
    duration: 0,
    caloriesBurned: 0,
    details: '',
    workoutId: 0
  }]);
  const [loaded, setLoaded] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    userId: 0
  });

  useEffect(() => {
    let isCanceled = false;
    const serverAddress = `/api/social/workouts/${props.userId}`;
    const serverAddress2 = `api/${props.userId}`;
    fetch(serverAddress, {
      headers: {
        'signin-token': window.localStorage.getItem('signin-token')
      }
    })
      .then(response => response.json())
      .then(data => {
        !isCanceled && pullServerData(data);
      });

    fetch(serverAddress2, {
      headers: {
        'signin-token': window.localStorage.getItem('signin-token')
      }
    })
      .then(response => response.json())
      .then(data => {
        setLoaded(true);
        !isCanceled && setUserInfo(data);
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
      workout.date = new Date(workout.date);
      const timezoneOffset = workout.date.getTimezoneOffset();
      const correctedDate = add(workout.date, { minutes: timezoneOffset });
      const workingDate = format(correctedDate, 'iii, LLL do, yyyy');
      return (
        <Grid
          key={workout.workoutId}
          item={true}
          xs={12}
          sm={6}
          md={6}
          lg={4}
          xl={3}
        >
          <Card
            className={classes.cardClass}
            raised={true}>

            <CardContent>
              <Typography
                className={classes.dateSection}
                paragraph={true}
              >
                {workingDate}
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
                {workout.duration} Minutes
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
        spacing={4}
        container={true}
        justifyContent='flex-start'
      >
        {renderedWorkouts}
      </Grid>
    );
  };

  if (!loaded) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  const Content = props => {
    if (serverData.length === 0) {
      return (
        <div className='center'>
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
                  <Typography variant='h5' align='center' gutterBottom>
                    Nothing recorded yet!
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      );
    } else {
      return (
        <WorkoutList entries={serverData} />
      );
    }
  };

  return (
    <>
      <Header title={(`${userInfo.firstName}'s Workouts`).toUpperCase()} />
      <WorkoutsOrMeals userId={userInfo.userId}/>
      <Content/>
    </>
  );
}
