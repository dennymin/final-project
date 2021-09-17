import { Card, CardContent, Grid, TextField, Typography, Button, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import Header from '../components/header';

const useStyles = makeStyles({
  gutter: {
    marginBottom: 20
  },
  buttonColor: {
    marginTop: '20px',
    backgroundColor: '#C9D6DF'
  }
});

export default function SignIn(props) {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();

    if (username === '') {
      setUsernameError(true);
    }
    if (password === '') {
      setPasswordError(true);
    }
    const userData = { username, password };
    const sendToAddress = '/api/auth/signin';
    fetch(sendToAddress, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
      .then(response => response.json())
      .then(result => {
        window.localStorage.setItem('signin-token', result.token);
        if (!result.error) {
          window.location.hash = 'app/home';
        } else {
          window.location.hash = '';
        }
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
            <CardContent>
              <form
                onSubmit={handleSubmit}
              >
                <Typography
                  variant='h5'
                  align='center'
                  gutterBottom={true}
                >
                  Sign In
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
                      href='#app/register'
                    >
                      Register
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button
                      variant='contained'
                      className={classes.buttonColor}
                      type='submit'
                    >
                      Sign In
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
