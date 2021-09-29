import React, { useState } from 'react';
import Header from '../components/header';
import { Card, CardContent, Grid, TextField, makeStyles, Button, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  gutter: {
    marginBottom: 20
  },
  buttonColor: {
    marginTop: '20px'
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
      .then(result => {
        window.location.hash = '';
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
          sm={8}
          md={5}
          lg={4}
          xl={4}
        >
          <Card
            raised={true}
          >
            <CardContent
            className={classes.gutter}
            >
              <form
              onSubmit={handleSubmit}>
                <Typography
                  variant='h5'
                  align='center'
                  gutterBottom={true}
                >
                  Register Account
                </Typography>
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
                      href=''
                      color='primary'
                    >
                      Sign-In
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button
                      variant='contained'
                      className={classes.buttonColor}
                      type='submit'
                      color='primary'
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
