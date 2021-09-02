import clsx from 'clsx'
import gsap from 'gsap'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useUser } from '../context/userContext'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { Blank } from '../components/Layout'

const useStyles = makeStyles({
  maskImage: {
    filter: 'blur(5px)',
  },
});

export default function Stage() {
  const classes = useStyles()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // client-side-only code
      gsap.timeline({ repeat: -1, repeatDelay: 0, yoyo: true })
        .to('.mask', { duration: (i) => [0.8, 1.3][i], y: -10266, ease: 'steps(29)', stagger: -0.3, onStart: swapPhoto }, 0)
        .to('.image', { duration: 2, scale: 1.1, transformOrigin: '50% 50%', ease: 'power2', onComplete: swapMask }, 0)

      let mask = 1;
      function swapMask() {
        if (mask == 3) mask = 1;
        else mask++;
        gsap.set('.mask', { attr: { 'xlink:href': '/images/masks/liquidMask' + mask + '.svg' } })
      }
      let photo = 1;
      function swapPhoto() {
        if (photo == 3) photo = 1;
        else photo++;
        gsap.set('.image', { attr: { 'xlink:href': '/images/placeholder' + photo + '.jpg' } })
      }
    }
  })

  return (
    <Blank>
      <div className="main">
        <svg viewBox="0 0 630 352" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask1">
            <image className="mask" xlinkHref="/images/masks/liquidMask1.svg" y="-1" width="630" height="10620" />
          </mask>
          <mask id="mask2">
            <image className="mask" xlinkHref="/images/masks/liquidMask1.svg" y="-1" width="630" height="10620" />
          </mask>
          <g mask="url(#mask2)">
            <image className={clsx('image', classes.maskImage)} xlinkHref="/images/placeholder1.jpg" width="630" height="420" />
          </g>
          <g mask="url(#mask1)">
            <image className="image" xlinkHref="/images/placeholder1.jpg" width="630" height="420" />
          </g>
        </svg>
      </div>
    </Blank>
  )
}
