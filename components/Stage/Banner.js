/* eslint-disable @next/next/no-img-element */
import clsx from 'clsx'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import { viewImage } from '../../hooks/useImages'

const DEFAULT_DURATION = 60 * 1000; // 60s

const useStyles = makeStyles((theme) => ({
  banner: {
    left: -1000,
    bottom: 0,
    position: 'absolute',
    zIndex: 100,
    padding: theme.spacing(2),
    transition: 'left 1s ease-in-out',
  },
  bannerContent: {
    '&:last-child': {
      padding: theme.spacing(1),
    }
  },
  visible: {
    left: 0,
  },
}));

export function Banner({ duration = DEFAULT_DURATION }) {
  const classes = useStyles()
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(visible => !visible);
    }, duration);

    return () => clearInterval(id);
  }, [duration]);

  return (
    <div className={clsx(classes.banner, visible && classes.visible)}>
      <Card>
        <CardContent className={classes.bannerContent}>
          <Grid container alignItems="center">
            <Grid item>
              <Image
                src="/qr.png"
                alt="Schicke uns dein Bild"
                width="120"
                height="120"
              />
            </Grid>
            <Grid item>
              <Typography
                variant="h4"
                gutterBottom
              >
                Dein Foto auf der Leinwand?
              </Typography>
              <Typography variant="body1">
                Kein Problem! Sende es einfach per WhatsApp an<br />
                <Typography variant="button">+49 (0) 160 955 673 00</Typography> (oder scan den QR Code)
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}
