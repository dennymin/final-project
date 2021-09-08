import { makeStyles, TextField, Button, Select, InputLabel, FormControl, MenuItem, ListItemText, Checkbox } from '@material-ui/core';
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
  }
});
const differentMuscles = ['Chest', 'Back', 'Arms', 'Legs'];

export default function NewWorkoutForm(props) {
  const classes = useStyles();

  const [muscleName, setMuscles] = useState(['']);
  const handleChange = event => {
    setMuscles(event.target.value);
  };

  return (
    <div>
      <form>
        <TextField
          label='Date'
          variant='outlined'
          margin='normal'
          type='date'
          InputLabelProps={{ shrink: true }}
          defaultValue='2000-01-01'
          required
          fullWidth
        />
        <TextField
          label='Length'
          variant='outlined'
          margin='normal'
          InputLabelProps={{ shrink: true }}
          required
          fullWidth
        />
        <TextField
          label='Calories Burned'
          variant='outlined'
          margin='normal'
          InputLabelProps={{ shrink: true }}
          required
          fullWidth
        />
        <FormControl
          variant='outlined'
          fullWidth
          margin='normal'
          required
        >
          <InputLabel id="muscle-groups-label">Muscle Groups</InputLabel>
          <Select
            labelId="muscle-groups-label"
            id="muscle-groups-checkbox"
            label='Muscle Groups'
            multiple
            value={muscleName}
            onChange={handleChange}
            renderValue={selected => selected.join(' ')}
          >
            {differentMuscles.map(muscle => (
              <MenuItem key={muscle} value={muscle}>
                <Checkbox checked={muscleName.indexOf(muscle) > -1} />
                <ListItemText primary={muscle} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label='Details'
          variant='outlined'
          margin='normal'
          InputLabelProps={{ shrink: true }}
          required
          fullWidth
          multiline
          rows={8}
        />

        <div className={classes.justifyCenter}>
          <Button variant='contained'>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
