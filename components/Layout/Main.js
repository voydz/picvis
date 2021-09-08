import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import firebase from '../../lib/firebaseApp'
import { Theming } from '../Theme'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
}));

export function Main({ children, title, dark }) {
  const classes = useStyles();

  async function handleLogout() {
    try {
      // further handling will be done by auth observer
      await firebase.auth().signOut()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Theming dark={dark}>
      <div className={classes.root}>
        <AppBar position="absolute">
          <Toolbar>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              {title}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>Abmelden</Button>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {children}
        </main>
      </div>
    </Theming>
  );
}
