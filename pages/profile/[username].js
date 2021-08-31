import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { getFirestore, doc, getDoc } from 'firebase/firestore'

export default function Profile() {
  const [profile, setProfile] = useState({})
  const router = useRouter()
  const { username } = router.query

  useEffect(() => {
    const fetchProfile = async () => {
      const db = getFirestore()
      const result = await getDoc(doc(db, 'profile', username))
      if (result.exists())
        setProfile(result.data())
    }
    if (username)
      fetchProfile()
  }, [username])

  return (
    <div className="container">
      <Head>
        <title>Next.js w/ Firebase Client-Side</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Next.js w/ Firebase Server-Side</h1>
        <h2>{profile.username}</h2>
        <h2>{profile.message}</h2>
      </main>
    </div>
  )
}