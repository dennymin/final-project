import { Card, CardContent, Grid, Typography, List, ListItem, Avatar, makeStyles, Link } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import _ from 'lodash';

const useStyles = makeStyles(theme => {
  return {
    sectional: {
      marginBottom: '20px'
    },
    linkStyling: {
      '&:hover': {
        cursor: 'pointer'
      }
    },
    avatarStyling: {
      backgroundColor: 'rgb(0,0,0,0)',
      color: '#52616B',
      fontWeight: 'bold',
      fontStyle: 'italic',
      fontSize: '2rem'
    }
  };
});

export default function Contacts(props) {
  const classes = useStyles();
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
  }, []);

  const ContactsList = props => {
    const contacts = props.contacts;
    const firstLetters = Object.keys(contacts);
    const LetterSymbols = firstLetters.map(firstLetter => {
      const letterNames = contacts[firstLetter].map(user => {
        return (
          <ListItem
            divider={user !== contacts[firstLetter][contacts[firstLetter].length - 1]}
            key={user.firstName}
          >
            <Typography>
              <Link
                href={`#app/social/workouts/${user.userId}`}
                underline='none'
                color='textPrimary'
                className={classes.linkStyling}
              >
                {_.capitalize(user.firstName)}
              </Link>
            </Typography>
          </ListItem>
        );
      });
      return (
        <div
          className={classes.sectional}
          key={firstLetter}
        >
          <Avatar
            variant='rounded'
            className={classes.avatarStyling}
            key={firstLetter}
          >
            {firstLetter.toUpperCase()}
          </Avatar>
          <List>
            {letterNames}
          </List>
        </div>
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
              <ContactsList contacts={userList}></ContactsList>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
