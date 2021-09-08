import React, { useState, useEffect } from 'react'
import firebase from '../../lib/firebaseApp'

export const IMAGES_APPROVED = 1
export const IMAGES_DECLINED = 0
export const IMAGES_PENDING = -1

export function useImages(approved = IMAGES_PENDING) {
  const [images, setImages] = useState([])
  const [loadingImages, setLoadingImages] = useState(true) // Helpful, to update the UI accordingly.

  useEffect(() => {
    const db = firebase.firestore()
    const q = db.collection('images').where('approved', '==', approved)
    const unsubscriber = q.onSnapshot((querySnapshot) => {
      try {
        const items = []

        // Update images in realtime.
        querySnapshot.forEach((doc) => {
          items.push(doc.data())
        })

        setImages(items)
      } catch (error) {
        // Most probably a connection error. Handle appropriately.
      } finally {
        setLoadingImages(false)
      }
    })

    // Unsubscribe listener on unmount
    return () => unsubscriber()
  }, [approved])

  return { loadingImages, images };
}
