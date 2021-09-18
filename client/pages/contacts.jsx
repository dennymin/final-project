import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import React from 'react';
import Header from '../components/header';

export default function Contacts(props) {
  return (
    <>
      <Header title='SOCIAL' />
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
          <Card raised={true}>
            <CardContent>
              <Typography>
                Hi
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
