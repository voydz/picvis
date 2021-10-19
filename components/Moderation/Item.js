import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import firebase from '../../lib/firebaseApp'
import { IMAGES_PENDING, IMAGES_APPROVED, IMAGES_DECLINED } from '../../hooks/useImages'
import { formatDate } from '../../lib/utils'

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
    backgroundSize: 'cover',
    '&:hover': {
      backgroundSize: 'contain',
    },
  },
  danger: {
    color: theme.palette.error.main,
  },
}))

async function updateDocument(hash, data) {
  const db = firebase.firestore()

  try {
    await db.collection('images').doc(hash).update(data)
  } catch (err) {
    console.log(err);
  }
}

export function Item({ image }) {
  const classes = useStyles()

  async function handleRestore({ hash }) {
    await updateDocument(hash, { approved: -1 })
  }

  async function handleAccept({ hash }) {
    await updateDocument(hash, { approved: 1 })
  }

  async function handleDeny({ hash }) {
    await updateDocument(hash, { approved: 0 })
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card className={classes.card}>
        <CardHeader
          avatar={' '}
          title={image.sender_id}
          subheader={formatDate(image.timestamp)}
        />
        <CardMedia
          className={classes.cardMedia}
          image={image.ext}
        />

        {image.approved === IMAGES_PENDING && (
          <CardActions>
            <Button onClick={() => handleAccept(image)}>
              Annehmen
            </Button>
            <Button
              className={classes.danger}
              onClick={() => handleDeny(image)}
            >
              Löschen
            </Button>
          </CardActions>
        )}

        {image.approved === IMAGES_APPROVED && (
          <CardActions>
            <Button
              className={classes.danger}
              onClick={() => handleDeny(image)}
            >
              Löschen
            </Button>
          </CardActions>
        )}

        {image.approved === IMAGES_DECLINED && (
          <CardActions>
            <Button onClick={() => handleRestore(image)}>
              Wiederherstellen
            </Button>
          </CardActions>
        )}
      </Card>
    </Grid>
  )
}
