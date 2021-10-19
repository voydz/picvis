import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Badge from '@material-ui/core/Badge'
import VisibilityIcon from '@material-ui/icons/Visibility'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { IMAGES_PENDING, IMAGES_APPROVED, IMAGES_DECLINED, updateImage } from '../../hooks/useImages'
import { formatSender, formatDate } from '../../lib/utils'

const useStyles = makeStyles((theme) => ({
  avatar: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
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
  cardHeader: {
    paddingLeft: theme.spacing(1),
  },
  cardActions: {
    justifyContent: 'right',
  },
  danger: {
    color: theme.palette.error.main,
  },
}))

function ItemActions({
  positiveAction,
  onPositiveClick,
  negativeAction,
  onNegativeClick
}) {
  const classes = useStyles()

  return (
    <CardActions className={classes.cardActions}>
      {onPositiveClick && (
        <Button onClick={onPositiveClick}>
          {positiveAction}
        </Button>
      )}
      {onNegativeClick && (
        <Button
          className={classes.danger}
          onClick={onNegativeClick}
        >
          {negativeAction}
        </Button>
      )}
    </CardActions>
  );
}

export function Item({ image }) {
  const classes = useStyles()

  async function handleRestore({ hash }) {
    await updateImage(hash, { approved: -1 })
  }

  async function handleAccept({ hash }) {
    await updateImage(hash, { approved: 1 })
  }

  async function handleDeny({ hash }) {
    await updateImage(hash, { approved: 0 })
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Badge
              badgeContent={image.views}
              max={10000}
              color="primary"
              showZero
            >
              <VisibilityIcon alt="# mal Angezeigt" />
            </Badge>
          }
          classes={{
            title: classes.cardHeader,
            subheader: classes.cardHeader,
          }}
          title={formatSender(image.sender_id)}
          subheader={formatDate(image.timestamp)}
        />
        <CardMedia
          className={classes.cardMedia}
          image={image.ext}
        />

        {image.approved === IMAGES_PENDING && (
          <ItemActions
            positiveAction="Annehmen"
            onPositiveClick={() => handleAccept(image)}
            negativeAction="Löschen"
            onNegativeClick={() => handleDeny(image)}
          />
        )}

        {image.approved === IMAGES_APPROVED && (
          <ItemActions
            negativeAction="Löschen"
            onNegativeClick={() => handleDeny(image)}
          />
        )}

        {image.approved === IMAGES_DECLINED && (
          <ItemActions
            positiveAction="Wiederherstellen"
            onPositiveClick={() => handleRestore(image)}
          />
        )}
      </Card>
    </Grid>
  )
}
