import { makeStyles, TextField, Button } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
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
  }
});

export default function NewMealForm(props) {
  const classes = useStyles();

  const rowHeight = 3;
  const [name, setName] = useState('');
  const [calories, setCalories] = useState(0);
  const [ingredients, setIngredients] = useState('');
  const [nutrition, setNutrition] = useState('');
  const [notes, setNotes] = useState('');
  const [pictureUrl, setPictureUrl] = useState(null);
  const [nameError, setNameError] = useState(false);
  const [caloriesError, setCaloriesError] = useState(false);
  const [ingredientsError, setIngredientsError] = useState(false);
  const [nutritionError, setNutritionError] = useState(false);
  const [notesError, setNotesError] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setNameError(false);
    setCaloriesError(false);
    setIngredientsError(false);
    setNutritionError(false);
    setNotesError(false);
    if (name === '') {
      setNameError(true);
    }
    if (calories < 0) {
      setCaloriesError(true);
    }
    if (ingredients === '') {
      setIngredientsError(true);
    }
    if (nutrition.length < 1) {
      setNutritionError(true);
    }
    if (notes === '') {
      setNotesError(true);
    }
    const newForm = new FormData(e.target);
    newForm.append('pictureUrl', pictureUrl);
    const sendToAddress = '/api/new/meal';
    fetch(sendToAddress, {
      method: 'POST',
      body: newForm
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
          name='name'
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
          name='calories'
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
          name='ingredients'
          className={classes.inputColor}
          variant='filled'
          margin='normal'
          required
          InputLabelProps={{ shrink: true }}
          fullWidth
          multiline
          rows={rowHeight}
          onChange={event => setIngredients(event.target.value)}
          error={ingredientsError}
        />

        <TextField
          label='Nutrition'
          name='nutrition'
          className={classes.inputColor}
          variant='filled'
          margin='normal'
          required
          InputLabelProps={{ shrink: true }}
          fullWidth
          multiline
          rows={rowHeight}
          onChange={event => setNutrition(event.target.value)}
          error={nutritionError}
        />

        <TextField
          label='Notes'
          name='notes'
          className={classes.inputColor}
          variant='filled'
          margin='normal'
          required
          InputLabelProps={{ shrink: true }}
          fullWidth
          multiline
          rows={rowHeight}
          onChange={event => setNotes(event.target.value)}
          error={notesError}
        />

        <div className={classes.uploadImageRow}>
            <DropzoneArea
              acceptedFiles={['image/*']}
              dropzoneText={'Drag and drop picture of food here *'}
              filesLimit={1}
              onChange={files => setPictureUrl(files[0])}
            />
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
