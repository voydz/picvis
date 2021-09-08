import React, { useState, useEffect } from 'react'
import {useRouter} from 'next/router'
import firebase from '../../lib/firebaseApp'
import { useUser } from '../../context/userContext'
import { Main } from '../../components/Layout'
import Button from '@material-ui/core/Button'

function useImages() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true) // Helpful, to update the UI accordingly.

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
        setLoading(false)
      }
    })

    // Unsubscribe listener on unmount
    return () => unsubscriber()
  }, [])

  return {loading, images};
}

export default function Admin() {
  const { loadingUser, user } = useUser()
  const router = useRouter()
  const images = useImages()

  async function handleNew() {
    try {
      console.log('Trigg')
      const db = firebase.firestore()
      const doc = await db.collection('images').add({
        name: 'test',
        approved: -1,
      })
      console.log('Document written', doc.id)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (!(user || loadingUser)) {
      // Will redirect any unauthenticated requests.
      router.push('/admin/login')
    }
  }, [router, loadingUser, user])

  return (
    <Main dark title="Verwaltung">
      Hello {user?.email}
      <Button variant="outlined" onClick={handleNew}>Test create</Button>
      {JSON.stringify(images)}
    </Main>
  )
}
