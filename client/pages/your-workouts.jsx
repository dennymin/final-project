import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles(theme => {
  return {
    cardWidth: {
      width: '100%'
    },
    centering: {
      display: 'flex',
      justifyContent: 'center'
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

  return (
    <div className={classes.centering}>
      <Card className={classes.cardWidth}>
        <CardContent>
          <Typography>
            {serverData[0].date.slice(0, 10)}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography>
            {serverData[0].length}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography>
            {serverData[0].caloriesBurned}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography>
            {serverData[0].details}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
