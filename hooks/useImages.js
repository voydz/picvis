import React, { useState, useEffect } from 'react'
import firebase from '../lib/firebaseApp'

export const IMAGES_APPROVED = 1
export const IMAGES_DECLINED = 0
export const IMAGES_PENDING = -1

export async function updateImage(hash, data) {
  const db = firebase.firestore()

  try {
    await db.collection('images').doc(hash).update(data)
  } catch (err) {
    console.log(err);
  }
}

export async function viewImage(hash) {
  await updateImage(hash, {
    views: firebase.firestore.FieldValue.increment(1),
  });
}

export async function fetchImages(query = q => q) {
  const db = firebase.firestore()
  const docRef = db.collection('images')
    .where('approved', '==', IMAGES_APPROVED)
    .orderBy('views', 'asc')
    .limit(10)

  try {
    const items = []

    const querySnapshot = await docRef.get()
    querySnapshot.forEach((doc) => {
      items.push(doc.data())
    })

    return items
  } catch (err) {
    console.log(err);
    return []
  }
}

export function useImages(approved) {
  const [images, setImages] = useState([])
  const [loadingImages, setLoadingImages] = useState(true) // Helpful, to update the UI accordingly.

  useEffect(() => {
    const db = firebase.firestore()
    const q = db.collection('images')
      .where('approved', '==', approved)
      .orderBy('timestamp', 'asc')

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
