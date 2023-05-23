import { useState, useEffect } from 'react'
import { getFact } from '../services/facts'

export function useCatFact () {
  const [fact, setFact] = useState()

  useEffect(() => {
    getFact().then(newfact => setFact(newfact))
  }, [])

  const getRandomFact = async () => {
    const newFact = await getFact()
    setFact(newFact)
  }

  return { fact, getRandomFact }
}
