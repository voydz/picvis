import React, { useState } from 'react'
import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Blank } from '../components/Layout'
import { Item } from '../components/Stage/Item'
import { fetchImages } from '../hooks/useImages'

import 'swiper/css'
import 'swiper/css/autoplay'

export default function Stage() {
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
          delay: 10000,
          disableOnInteraction: false,
        }}
        loop
      >
        {images.map(image => (
          <SwiperSlide key={image.hash}>
            <Item image={image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Blank>
  )
}
