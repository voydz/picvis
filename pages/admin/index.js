import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import firebase from '../../lib/firebaseApp'
import { formatDate } from '../../lib/utils'
import { Main } from '../../components/Layout'
import { useUser } from '../../context/userContext'
import { useImages } from './useImages'

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
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
}))


async function setDocument(hash, data) {
  const db = firebase.firestore()

  try {
    await db.collection('images').doc(hash).update(data)
  } catch (err) {
    console.log(err);
  }
}

export default function Admin() {
  const classes = useStyles()
  const router = useRouter()
  const { loadingUser, user } = useUser()
  const { loadingImages, images } = useImages()

  async function handleAccept({ hash }) {
    await setDocument(hash, { approved: 1 })
  }

  async function handleDeny({ hash }) {
    await setDocument(hash, { approved: 0 })
  }

  useEffect(() => {
    if (!(user || loadingUser)) {
      // Will redirect any unauthenticated requests.
      router.push('/admin/login')
    }
  }, [router, loadingUser, user])

  return (
    <Main dark title="Bilderverwaltung">
      <Container className={classes.cardGrid} maxWidth="xl">
        {loadingImages ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={4}>
            {images.length === 0 ? (
                <Grid item>
                  <Typography variant="h4">Keine weiteren Bilder.</Typography>
                  <Typography variant="subtitle1">Neue Bilder erscheinen automatisch, wenn jemand welche geschickt hat.</Typography>
                </Grid>
            ) : (
              images.map(image => (
                <Grid item key={image.hash} xs={12} sm={6} md={4} lg={3} xl={2}>
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
                    <CardActions>
                      <Button onClick={() => handleAccept(image)}>
                        Annehmen
                      </Button>
                      <Button onClick={() => handleDeny(image)}>
                        Löschen
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              )
            ))}
          </Grid>
        )}
      </Container>
    </Main>
  )
}
