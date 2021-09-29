import { Card, CardContent, Grid, TextField, Typography, Button, makeStyles, InputAdornment } from '@material-ui/core';
import React, { useState } from 'react';
import Header from '../components/header';

const useStyles = makeStyles({
  gutter: {
    marginBottom: 20
  },
  buttonColor: {
    marginTop: '20px'
  },
  demoText: {
    fontSize: '50%'
  }
});

export default function SignIn(props) {
  const classes = useStyles();
  const [username, setUsername] = useState('demo');
  const [password, setPassword] = useState('test');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState('');

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
          setUsernameError(true);
          setPasswordError(true);
          setLoginError('Username or password incorrect');
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
                  defaultValue={'demo'} InputProps={{
                    endAdornment:
                      <InputAdornment
                        className={classes.demoText}
                        position="end"
                      >
                        Sign in as demo to test
                      </InputAdornment>
                  }}
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
                  helperText={loginError}
                  defaultValue={'test'}
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
                      color='primary'
                    >
                      Register
                    </Button>
                  </Grid>

                  <Grid item>
                    <Button
                      variant='contained'
                      className={classes.buttonColor}
                      type='submit'
                      color='primary'
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
