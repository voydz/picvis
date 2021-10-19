/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { viewImage } from '../../hooks/useImages'

const useStyles = makeStyles({
  image: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    objectFit: 'contain',
    background: '#fff',
  },
});

export function Item({ image }) {
  const classes = useStyles()

  async function handleView({ hash }) {
    await viewImage(hash)
  }

  useEffect(() => {
    // register image view
    handleView(image)
  }, [image])

  return (
    <img
      className={classes.image}
      src={image.ext}
      alt={image.hash}
    />
  );
}
