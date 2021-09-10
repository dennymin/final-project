import { makeStyles, TextField, Button } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';
import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

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
  const theme = createTheme({
    overrides: {
      MuiDropzoneArea: {
        root: {
          display: 'flex',
          flexWrap: 'wrap',
          minHeight: 160,
          border: '1px hidden',
          borderBottom: '1px solid',
          borderTopRightRadius: 4,
          borderTopLeftRadius: 4,
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
          backgroundColor: '#e8e8e8'
        },
        textContainer: {
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          flexDirection: 'column'
        },
        text: {
          marginTop: 15,
          marginBottom: 5,
          fontSize: 'small',
          color: 'rgb(100, 100, 100)'
        },
        icon: {
          width: 70,
          height: 30,
          marginBottom: 0,
          color: 'rgb(100, 100, 100)'
        }
      },
      MuiDropzonePreviewList: {
        root: {
          display: 'flex',
          margin: 0,
          justifyContent: 'center',
          alignItems: 'center'
        },
        imageContainer: {
          display: 'inline',
          padding: '4px !important'
        },
        image: {
          maxWidth: 80,
          maxHeight: 80,
          objectFit: 'cover',
          boxShadow: 'none',
          padding: 4,
          borderRadius: 5
        }
      },
      MuiDropzoneSnackbar: {
        successAlert: {
          display: 'none'
        }
      }
    }
  });
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
    if (calories === 0) {
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
          <ThemeProvider theme={theme}>
            <DropzoneArea
              acceptedFiles={['image/*']}
              dropzoneText={'Drag and drop picture of food here *'}
              filesLimit={1}
              onChange={
                files => {
                  setPictureUrl(files[0]);
                }
              }
            />
          </ThemeProvider>
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
