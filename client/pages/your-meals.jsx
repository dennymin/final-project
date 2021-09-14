import { Grid, Card, CardContent, CardActions, Collapse, Typography, makeStyles, CardMedia } from '@material-ui/core';
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
    gutterBottom: {
      marginBottom: 30
    },
    gutterTop: {
      marginTop: 30
    }
  };
});

export default function YourMeals(props) {
  const classes = useStyles();
  const [serverData, pullServerData] = useState([{
    mealId: 0,
    calories: 0,
    name: '',
    ingredients: '',
    notes: '',
    pictureUrl: ''
  }]);

  useEffect(() => {
    let isCanceled = false;
    const serverAddress = '/api/your/meals';
    fetch(serverAddress)
      .then(response => response.json())
      .then(data => {
        !isCanceled && pullServerData(data);
      });
    return () => { isCanceled = true; };
  }, []);

  const MealList = props => {
    const mealList = props.entries;
    const renderedMeals = mealList.map(meal => {
      const [expanded, setExpanded] = useState(false);
      const handleExpandClick = () => {
        setExpanded(!expanded);
      };

      return (
        <Grid
          key={meal.mealId}
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
              <CardMedia
                className={classes.gutterBottom}
                component='img'
                image={meal.pictureUrl}
                title={`Picture of your ${meal.name}`}
              />
              <Typography
                className={classes.cardCategoryHeader}
              >
                Name:
              </Typography>
              <Typography
                className={classes.cardCategoryContent}
                paragraph={true}
              >
                {meal.name}
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
                {meal.calories} Calories
              </Typography>

              <CardActions className={classes.detailsExpanded}>
                <Typography
                  onClick={handleExpandClick}
                  className={classes.smallDetails}
                >
                  Expand for Ingredients, Nutrition, and Notes</Typography>
              </CardActions>
              <Collapse
                in={expanded}
                timeout='auto'
                unmountOnExit
              >
                <Typography
                  className={classes.cardCategoryHeader}
                >
                  Ingredients:
                </Typography>
                <Typography
                  className={classes.cardCategoryContent}
                  paragraph={true}
                >
                  {meal.ingredients}
                </Typography>
                <Typography
                  className={classes.cardCategoryHeader}
                >
                  Nutrition:
                </Typography>
                <Typography
                  className={classes.cardCategoryContent}
                  paragraph={true}
                >
                  {meal.nutrition}
                </Typography>
                <Typography
                  className={classes.cardCategoryHeader}
                >
                  Notes:
                </Typography>
                <Typography
                  className={classes.cardCategoryContent}
                >
                  {meal.notes}
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
        {renderedMeals}
      </Grid>
    );
  };

  return (
    <MealList entries={serverData} />
  );
}
