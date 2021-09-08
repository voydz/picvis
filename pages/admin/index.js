import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
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
  },
  cardContent: {
    flexGrow: 1,
  },
}))

export default function Admin() {
  const classes = useStyles()
  const router = useRouter()
  const { loadingUser, user } = useUser()
  const { loadingImages, images } = useImages()

  useEffect(() => {
    if (!(user || loadingUser)) {
      // Will redirect any unauthenticated requests.
      router.push('/admin/login')
    }
  }, [router, loadingUser, user])

  return (
    <Main dark title="Verwaltung">
      <Container className={classes.cardGrid} maxWidth="xl">
        {loadingImages ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={4}>
            {images.map((card, i) => (
              <Grid item key={i} xs={12} sm={6} md={4} lg={3} xl={2}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    This is a media card. You can use this section to describe the content.
                  </CardContent>
                  <CardActions>
                    <Button>
                      Annehmen
                    </Button>
                    <Button>
                      Löschen
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Main>
  )
}
