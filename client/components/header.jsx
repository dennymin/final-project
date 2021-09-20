import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  pageHeader: {
    marginTop: '30px',
    marginBottom: '20px',
    fontFamily: 'Roboto Condensed',
    fontWeight: '600',
    fontStyle: 'italic'
  }
});

export default function Header(props) {
  const classes = useStyles();
  let variantStyle = 'h4';
  if (props.title.length > 15) {
    variantStyle = 'h5';
  }
  return (
        <Typography
          variant={variantStyle}
          component='h2'
          align='center'
          gutterBottom
          className={classes.pageHeader}
        >
          {props.title}
        </Typography>
  );
}
