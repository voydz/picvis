import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

import { useTab } from '../../context/tabContext'
import { useImages, IMAGES_PENDING, IMAGES_APPROVED, IMAGES_DECLINED } from '../../hooks/useImages'

import { Item } from './Item'

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}))

function convertTabToRequest(tab) {
  switch (tab) {
    case 0: /** TAB_PENDING */
      return IMAGES_PENDING;

    case 1: /** TAB_APPROVED */
      return IMAGES_APPROVED;

    case 2: /** TAB_DECLINED */
      return IMAGES_DECLINED;
  }
}

function EmptyMessage({ tab }) {
  switch (tab) {
    case 0: /** TAB_PENDING */
      return (
        <Grid item>
          <Typography variant="h4">Keine weiteren Bilder.</Typography>
          <Typography variant="subtitle1">Neue Bilder erscheinen automatisch, wenn jemand welche geschickt hat.</Typography>
        </Grid>
    );

    case 1: /** TAB_APPROVED */
      return (
        <Grid item>
          <Typography variant="h4">Bisher keine Bilder.</Typography>
          <Typography variant="subtitle1">Du musst Bilder im Reiter &quot;Ausstehend&quot; annehmen.</Typography>
        </Grid>
    );

    case 2: /** TAB_DECLINED */
      return (
        <Grid item>
          <Typography variant="h4">Der Papierkorb ist leer.</Typography>
          <Typography variant="subtitle1">Hier kannst du gelöschte Bilder wiederherstellen.</Typography>
        </Grid>
    );
  }
}

export function Moderation() {
  const classes = useStyles()
  const tab = useTab()

  const { loadingImages, images } = useImages(
    convertTabToRequest(tab)
  )

  return (
    <Container className={classes.cardGrid} maxWidth="xl">
      {loadingImages ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={4}>
          {images.length === 0 ? (
            <EmptyMessage tab={tab} />
          ) : (
            images.map(image => (
              <Item key={image.hash} image={image} />
            )
          ))}
        </Grid>
      )}
    </Container>
  )
}
