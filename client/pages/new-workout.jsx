import { makeStyles, TextField, Button, Select, InputLabel, FormControl, MenuItem, ListItemText, Checkbox, InputAdornment } from '@material-ui/core';
import React, { useState } from 'react';

const useStyles = makeStyles({
  flexWrap: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  justifyCenter: {
    display: 'flex',
    justifyContent: 'center'
  },
  fullFlex: {
    flexBasis: '100%'
  },
  marginBottom: {
    marginBottom: '5px'
  },
  buttonColor: {
    marginTop: '20px',
    backgroundColor: '#C9D6DF'
  }
});
const differentMuscles = ['Chest', 'Back', 'Arms', 'Legs'];

export default function NewWorkoutForm(props) {
  // const today = new Date();
  // const todayYear = today.getFullYear();
  // const todayMonth = today.getMonth().toString();
  // const todayDay = today.getDay().toString();
  // const todayFormatted = `${todayYear}-${todayMonth.length === 1 ? '0' + todayMonth : todayMonth}-${todayDay.length === 1 ? '0' + todayDay : todayDay}`;
  const classes = useStyles();

  const [date, setDate] = useState('');
  const [length, setLength] = useState(0);
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [muscleName, setMuscles] = useState([]);
  const [details, setDetails] = useState('');
  const [dateError, setDateError] = useState(false);
  const [lengthError, setLengthError] = useState(false);
  const [caloriesBurnedError, setCaloriesBurnedError] = useState(false);
  const [muscleNameError, setMusclesError] = useState(false);
  const [detailsError, setDetailsError] = useState(false);
  const handleChange = event => {
    setMuscles(event.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setDateError(false);
    setLengthError(false);
    setCaloriesBurnedError(false);
    setMusclesError(false);
    setDetailsError(false);
    if (date === '') {
      setDateError(true);
    }
    if (length === 0) {
      setLengthError(true);
    }
    if (caloriesBurned === 0) {
      setCaloriesBurnedError(true);
    }
    if (muscleName.length < 1) {
      setMusclesError(true);
    }
    if (details === '') {
      setDetailsError(true);
    }
    const data = {
      date: date,
      length: length,
      caloriesBurned: caloriesBurned,
      muscleGroups: muscleName,
      details: details
    };
    const sendToAddress = '/api';
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
          label='Date'
          variant='filled'
          margin='normal'
          type='date'
          placeholder=''
          InputLabelProps={{ shrink: true }}
          required
          fullWidth
          onChange={event => setDate(event.target.value)}
          error={dateError}
        />

        <TextField
          label='Length'
          variant='filled'
          margin='normal'
          required
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: <InputAdornment position="end">Minutes</InputAdornment>
          }}
          fullWidth
          onChange={event => {
            setLength(event.target.value);
          }}
          error={lengthError}
          color='primary'
        />

        <TextField
          label='Calories Burned'
          variant='filled'
          margin='normal'
          required
          InputLabelProps={{ shrink: true }}
          fullWidth
          onChange={event => setCaloriesBurned(event.target.value)}
          error={caloriesBurnedError}
        />

        <FormControl
          variant='filled'
          fullWidth
          margin='normal'
          required
          error={muscleNameError}
        >
          <InputLabel shrink id="muscle-groups-label">Muscle Groups</InputLabel>
          <Select
            labelId="muscle-groups-label"
            id="muscle-groups-checkbox"
            label='Muscle Groups'
            displayEmpty
            multiple
            value={muscleName}
            onChange={handleChange}
            renderValue={selected => selected.join(' ')}
          >
            {differentMuscles.map(muscle => (
              <MenuItem key={muscle} value={muscle}>
                <Checkbox color='primary' checked={muscleName.indexOf(muscle) > -1} />
                <ListItemText primary={muscle} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label='Details'
          variant='filled'
          margin='normal'
          required
          InputLabelProps={{ shrink: true }}
          fullWidth
          multiline
          rows={8}
          onChange={event => setDetails(event.target.value)}
          error={detailsError}
        />

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
