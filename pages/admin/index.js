import { useEffect } from 'react'
import Link from 'next/link'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { useUser } from '../../context/userContext'
import { Main } from '../../components/Layout'

export default function Home() {
  // Our custom hook to get context values
  const { loadingUser, user } = useUser()

  const profile = { username: 'nextjs_user', message: 'Awesome!!' }

  useEffect(() => {
    if (!loadingUser) {
      // You know that the user is loaded: either logged in or out!
      console.log(user)
    }
  }, [loadingUser, user])

  const createUser = async () => {
    const db = getFirestore()
    await setDoc(doc(db, 'profile', profile.username), profile)
    alert('User created!!')
  }

  return (
    <Main>
      <h1 className="title">Next.js w/ Firebase Client-Side</h1>
      <p className="description">Fill in your credentials to get started</p>

      <p className="description">
        Cloud Firestore Security Rules write permissions are required for
        adding users
      </p>
      <button onClick={createUser}>Create nextjs_user</button>

      <p className="description">
        Please press the link below after adding the user
      </p>
      <Link href={`/profile/${profile.username}`} passHref>
        <a>Go to SSR Page</a>
      </Link>
    </Main>
  )
}
