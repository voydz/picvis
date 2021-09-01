import Link from 'next/link'
import { useEffect } from 'react'
import { useUser } from '../context/userContext'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

import { Blank } from '../components/Layout'

export default function Stage() {
  return (
    <Blank>
      <h1 className="title">Stage</h1>
    </Blank>
  )
}
