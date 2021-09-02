import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Theming } from '../Theme'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
}));

export function Blank({ children, dark }) {
  const classes = useStyles();

  return (
    <Theming dark={dark}>
      <div className={classes.root}>
        <main className={classes.content}>
          {children}
        </main>
      </div>
    </Theming>
  );
}
