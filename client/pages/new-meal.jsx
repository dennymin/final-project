import { makeStyles, TextField, Button, Avatar } from '@material-ui/core';
import React, { useState } from 'react';

const useStyles = makeStyles({
  justifyCenter: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px'
  },
  uploadImageRow: {
    display: 'flex',
    justifyContent: 'center',
    margin: '20px 0 30px 0'
  },
  buttonColor: {
    backgroundColor: '#C9D6DF'
  },
  inputColor: {
    backgroundColor: '#ffffff'
  },
  uploadButton: {
    backgroundColor: '#C9D6DF',
    position: 'relative',
    left: '50px'
  }
});

export default function NewMealForm(props) {
  const classes = useStyles();

  const [name, setName] = useState('');
  const [calories, setCalories] = useState(0);
  const [ingredients, setIngredients] = useState('');
  const [nutrition, setNutrition] = useState('');
  const [notes, setNotes] = useState('');
  const [pictureUrl, setPictureUrl] = useState('./images/placeholder.png');
  const [nameError, setNameError] = useState(false);
  const [caloriesError, setCaloriesError] = useState(false);
  const [ingredientsError, setIngredientsError] = useState(false);
  const [nutritionError, setNutritionError] = useState(false);
  const [notesError, setNotesError] = useState(false);
  const [pictureUrlError, setPictureUrlError] = useState(false);

  const handlePicture = e => {
    const newForm = new FormData(e.target);
    fetch('/api/new/meal/picture', {
      method: 'POST',
      body: newForm
    })
      .then(response => {
        console.log(response);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setNameError(false);
    setCaloriesError(false);
    setIngredientsError(false);
    setNutritionError(false);
    setNotesError(false);
    setPictureUrlError(false);
    if (name === '') {
      setNameError(true);
    }
    if (calories === 0) {
      setCaloriesError(true);
    }
    if (ingredients === 0) {
      setIngredientsError(true);
    }
    if (nutrition.length < 1) {
      setNutritionError(true);
    }
    if (notes === '') {
      setNotesError(true);
    }
    if (pictureUrl === '') {
      setPictureUrlError(true);
    }
    const data = {
      name: name,
      calories: calories,
      ingredients: ingredients,
      nutrition: nutrition,
      notes: notes,
      pictureUrl: pictureUrl
    };
    const sendToAddress = '/api/new/meal';
    fetch(sendToAddress, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => {
        response.json();
        e.target.reset();
      });
  };

  return (
    <div>
      <form
        noValidate
        autoComplete='off'
        onSubmit={handleSubmit}
      >
        <TextField
          label='Meal Name'
          className={classes.inputColor}
          variant='filled'
          margin='normal'
          required
          InputLabelProps={{ shrink: true }}
          fullWidth
          onChange={event => {
            setName(event.target.value);
          }}
          error={nameError}
        />

        <TextField
          label='Calories'
          className={classes.inputColor}
          variant='filled'
          margin='normal'
          required
          InputLabelProps={{ shrink: true }}
          fullWidth
          onChange={event => {
            setCalories(event.target.value);
          }}
          error={caloriesError}
        />

        <TextField
          label='Ingredients'
          className={classes.inputColor}
          variant='filled'
          margin='normal'
          required
          InputLabelProps={{ shrink: true }}
          fullWidth
          multiline
          rows={4}
          onChange={event => setIngredients(event.target.value)}
          error={ingredientsError}
        />

        <TextField
          label='Nutrition'
          className={classes.inputColor}
          variant='filled'
          margin='normal'
          required
          InputLabelProps={{ shrink: true }}
          fullWidth
          multiline
          rows={4}
          onChange={event => setNutrition(event.target.value)}
          error={nutritionError}
        />

        <TextField
          label='Notes'
          className={classes.inputColor}
          variant='filled'
          margin='normal'
          required
          InputLabelProps={{ shrink: true }}
          fullWidth
          multiline
          rows={4}
          onChange={event => setNotes(event.target.value)}
          error={notesError}
        />

        <div className={classes.uploadImageRow}>
          <Avatar
            variant='square'
            src={pictureUrl}
          />
          <Button
            variant='contained'
            component='label'
            onClick={handlePicture}
            className={classes.uploadButton}
          >
            Upload Image
            <input
              type='file'
              accept='image/*'
              hidden
            />
          </Button>
        </div>

        <div className={classes.justifyCenter}>
          <Button
            variant='contained'
            type='submit'
            className={classes.buttonColor}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
