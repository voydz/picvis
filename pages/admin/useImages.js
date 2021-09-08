import React, { useState, useEffect } from 'react'
import firebase from '../../lib/firebaseApp'

export function useImages() {
  const [images, setImages] = useState([])
  const [loadingImages, setLoadingImages] = useState(true) // Helpful, to update the UI accordingly.

  useEffect(() => {
    const db = firebase.firestore()
    const q = db.collection('images').where('approved', '==', -1)
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
  }, [])

  return { loadingImages, images };
}
