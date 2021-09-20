import { Card, CardContent, Grid, Typography, List, ListItem, Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Header from '../components/header';

export default function Contacts(props) {
  const [userList, pullUserList] = useState({});

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
        !isCanceled && pullUserList(data);
      });
    return () => { isCanceled = true; };
  }, [userList]);

  const ContactsList = props => {
    const contacts = props.contacts;
    const firstLetters = Object.keys(contacts);
    const LetterSymbols = firstLetters.map(firstLetter => {
      const letterNames = contacts[firstLetter].map(user => {
        return (
          <ListItem key={user.firstName}>
            <Typography>
              {user.firstName}
            </Typography>
          </ListItem>
        );
      });
      return (
        <ListItem key={firstLetter}>
          <Avatar key={firstLetter}>
            {firstLetter.toUpperCase()}
          </Avatar>
          <List>
            {letterNames}
          </List>
        </ListItem>
      );
    });
    return (
      <List>
        {LetterSymbols}
      </List>
    );
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
                  <ContactsList contacts={userList}></ContactsList>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
