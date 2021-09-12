import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import React, { useEffect } from 'react';

const useStyles = makeStyles(theme => {
  return {
    cardWidth: {
      width: '75%'
    },
    centering: {
      display: 'flex',
      justifyContent: 'center'
    }
  };
});

export default function YourWorkouts(props) {
  const classes = useStyles();

  useEffect(() => {
    const serverAddress = '/api/your/workouts';
    fetch(serverAddress, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        response.json();
      }).then(data => {
        console.log(data);
      });
  }
  );

  return (
    <div className={classes.centering}>
      <Card className={classes.cardWidth}>
        <CardContent>
          <Typography>
            Hello
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
