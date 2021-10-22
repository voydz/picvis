import React, { useState } from 'react'
import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Blank } from '../components/Layout'
import { Banner, Item } from '../components/Stage'
import { useGuard } from '../hooks/useGuard'
import { fetchImages } from '../hooks/useImages'

import 'swiper/css'
import 'swiper/css/autoplay'

export default function Stage() {
  // Will redirect any unauthenticated requests.
  useGuard()

  const [images, setImages] = useState([])

  return (
    <Blank>
      <Swiper
        modules={[Autoplay]}
        onReachEnd={async () => {
          // refetch images
          const images = await fetchImages()
          setImages(images)
        }}
        autoplay={{
          delay: process.env.NEXT_PUBLIC_SLIDESHOW_DELAY,
          disableOnInteraction: false,
        }}
        loop
      >
        {images.map(image => (
          <SwiperSlide key={image.hash}>
            {({isActive, isDuplicate}) => (
              <Item image={image} shown={isActive && !isDuplicate} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <Banner duration={process.env.NEXT_PUBLIC_BANNER_DURATION} />
    </Blank>
  )
}
