import clsx from 'clsx'
import gsap from 'gsap'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import firebase from '../lib/firebaseApp'
import { useUser } from '../context/userContext'
import { Blank } from '../components/Layout'
import { useImages } from '../data/useImages'

const useStyles = makeStyles({
  maskImage: {
    filter: 'blur(5px)',
  },
});

const masks = [
  '/images/masks/liquidMask1.svg',
  '/images/masks/liquidMask2.svg',
  '/images/masks/liquidMask3.svg',
]

export default function Stage() {
  const classes = useStyles()
  const { images } = useImages()

  useEffect(() => {
    if (!images.length) {
      // if we got no images it makes no sense to init
      return
    }

    if (typeof window !== 'undefined') {
      // client-side-only code
      gsap.timeline({ repeat: -1, repeatDelay: 0, yoyo: true })
        .to('.mask', { duration: (i) => [0.8, 1.3][i], y: -10266, ease: 'steps(29)', stagger: -0.3, onStart: swapImage }, 0)
        .to('.image', { duration: 2, scale: 1.1, transformOrigin: '50% 50%', ease: 'power2', onComplete: swapMask }, 0)
        .to('.image', { duration: 5 }) // acts as a pause, but doubles the amount as we are in yoyo mode

      let mask = 0;
      function swapMask() {
        if (mask >= masks.length - 1) mask = 0;
        else mask++;
        gsap.set('.mask', { attr: { 'xlink:href': masks[mask] } })
      }

      let image = 0;
      function swapImage() {
        if (image >= images.length - 1) image = 0;
        else image++;
        gsap.set('.image', { attr: { 'xlink:href': images[image].ext } })
      }

      // init stage
      swapMask()
      swapImage()
    }
  }, [images])

  return (
    <Blank>
      <svg viewBox="0 0 630 354" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask1">
          <image className="mask" xlinkHref="" y="0" width="630" height="10620" />
        </mask>
        <mask id="mask2">
          <image className="mask" xlinkHref="" y="0" width="630" height="10620" />
        </mask>
        <g mask="url(#mask2)">
          <image className={clsx('image', classes.maskImage)} xlinkHref="" width="630" height="460" />
        </g>
        <g mask="url(#mask1)">
          <image className="image" xlinkHref="" width="630" height="460" />
        </g>
      </svg>
    </Blank>
  )
}
