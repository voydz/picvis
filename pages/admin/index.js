import React, { useEffect } from 'react'
import {useRouter} from 'next/router'
import { getAuth, signOut } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { useUser } from '../../context/userContext'
import { Main } from '../../components/Layout'
import Button from '@material-ui/core/Button'

export default function Admin() {
  const { loadingUser, user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!(user || loadingUser)) {
      // Will redirect any unauthenticated requests.
      router.push('/admin/login')
    }
  }, [router, loadingUser, user])

  async function handleLogout() {
    const auth = getAuth()
    try {
      // further handling will be done by auth observer
      await signOut(auth)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Main dark title="Verwaltung">
      Hello {user?.email}

      <Button
        type="button"
        variant="contained"
        color="primary"
        onClick={handleLogout}
      >
        Abmelden
      </Button>
    </Main>
  )
}
