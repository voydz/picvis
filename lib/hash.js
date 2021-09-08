import { bmvbhash } from 'blockhash-core'
import { imageFromBuffer, getImageData } from '@canvas/image'

export async function fetchImageHash(src) {
  // fetch image data
  const data = await fetchImageData(src)

  // run the hashing function
  return await bmvbhash(data, 8)
}

async function fetchImageData(src) {
  // fetch the image
  const res = await fetch(src)

  // some buffer magic here and there
  const arrayBuffer = await res.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  // and finally extract the image data
  const image = await imageFromBuffer(buffer)
  return getImageData(image)
}


