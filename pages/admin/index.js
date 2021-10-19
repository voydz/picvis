import React from 'react'
import { useGuard } from '../../hooks/useGuard'
import { Main } from '../../components/Layout'
import { Moderation } from '../../components/Moderation'

export default function Admin() {
  // Will redirect any unauthenticated requests.
  useGuard()

  return (
    <Main dark title="Bilderverwaltung">
      <Moderation />
    </Main>
  )
}
