import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '../context/userContext'

const LOGIN_URL = '/admin/login';

export function useGuard(redirect = LOGIN_URL) {
  const router = useRouter()
  const { loadingUser, user } = useUser()

  useEffect(() => {
    if (!(user || loadingUser)) {
      // Will redirect any unauthenticated requests.
      router.push(redirect)
    }
  }, [redirect, router, loadingUser, user]);
}

export function useAuth(redirect) {
  const router = useRouter()
  const { loadingUser, user } = useUser()

  useEffect(() => {
    if (!loadingUser && user) {
      // Will redirect any authenticated requests.
      router.push(redirect)
    }
  }, [redirect, router, loadingUser, user])
}
