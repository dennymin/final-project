import { Card, CardContent, Grid, Typography, List, ListItem } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Header from '../components/header';

export default function Contacts(props) {
  const [userList, pullUsersList] = useState([{
    firstName: '',
    lastName: ''
  }]);

  useEffect(() => {
    let isCanceled = false;
    const serverAddress = '/api/others';
    fetch(serverAddress, {
      headers: {
        'signin-token': window.localStorage.getItem('signin-token')
      }
    })
      .then(response => response.json())
      .then(data => {
        !isCanceled && pullUsersList(data);
        const firstLetters = [];
        for (let i = 0; i < userList.length; i++) {
          const firstLetter = userList[i].firstName[0];
          if (!firstLetters.includes(firstLetter)) {
            firstLetters.push(firstLetter);
          }
        }
      });
    return () => { isCanceled = true; };
  }, [userList]);

  const contact = props => {
    // const contactList = props.people;
    // const renderedPeople = contactList.map(person => {

    // });
    const firstLetters = [];
    for (let i = 0; i < userList.length; i++) {
      const firstLetter = userList[i].firstName[0];
      if (!firstLetters.includes(firstLetter)) {
        firstLetters.push(firstLetter);
      }
    }
  };

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
              <List>
                <ListItem>
                  <Typography>
                    Denny
                  </Typography>
                </ListItem>
                <ListItem divider={true} alignItems='flex-start'>
                  <Typography>
                    Denny
                  </Typography>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
