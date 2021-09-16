import React, { useState } from 'react';
import Header from '../components/header';
import { Card, CardContent, Grid, TextField, makeStyles, Button } from '@material-ui/core';

const useStyles = makeStyles({
  gutter: {
    marginBottom: 20
  },
  buttonColor: {
    marginTop: '20px',
    backgroundColor: '#C9D6DF'
  }
});

export default function Register(props) {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    if (username === '') {
      setUsernameError(true);
    }
    if (password === '') {
      setPasswordError(true);
    }
    if (firstName === '') {
      setFirstNameError(true);
    }
    if (lastName === '') {
      setLastNameError(true);
    }
    const newUserData = { username, password, firstName, lastName };
    const sendToAddress = '/api/auth/register';
    fetch(sendToAddress, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUserData)
    })
      .then(response => {
        response.json();
        event.target.reset();
      })
    ;
  };

  return (
    <>
      <Header title='GITFIT' />
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
          <Card
            className={classes.cardClass}
            raised={true}
          >
            <CardContent
            className={classes.gutter}
            >
              <form
              onSubmit={handleSubmit}>
                <TextField
                  label='Username'
                  margin='normal'
                  variant='outlined'
                  required
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  onChange={event => setUsername(event.target.value)}
                  error={usernameError}
                />
                <TextField
                  label='Password'
                  margin='normal'
                  variant='outlined'
                  type='password'
                  required
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  onChange={event => setPassword(event.target.value)}
                  error={passwordError}
                />
                <TextField
                  label='First Name'
                  margin='normal'
                  variant='outlined'
                  required
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  onChange={event => setFirstName(event.target.value)}
                  error={firstNameError}
                />
                <TextField
                  label='Last Name'
                  margin='normal'
                  variant='outlined'
                  required
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  onChange={event => setLastName(event.target.value)}
                  error={lastNameError}
                />
                <Grid
                container
                justifyContent='center'
                spacing={6}
                >
                  <Grid item>
                    <Button
                      variant='contained'
                      className={classes.buttonColor}
                      component='a'
                    >
                      Sign-In
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button
                      variant='contained'
                      className={classes.buttonColor}
                      type='submit'
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
