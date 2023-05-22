import { useEffect, useState } from 'react'
import { getFact } from './services/facts'
import './App.css'
import { getCatImg } from './services/catImg'

const CAT_IMG_PRREFIX = 'https://cataas.com'

export function App () {
  const [fact, setFact] = useState()
  const [imgCat, setImgCat] = useState()

  // trae la cita de la api
  useEffect(() => {
    getFact().then(newfact => setFact(newfact))
  }, [])

  // recuperar la imagen cada vez que la cita cambia
  useEffect(() => {
    if (!fact) return // si el fact es undefined no devuelve nada
    getCatImg(fact).then(newCatUrl => setImgCat(newCatUrl))
  }, [fact])

  const handleClick = async () => {
    const newFact = await getFact()
    setFact(newFact)
  }

  return (
    <main>
      <h1> Cat Fact</h1>
      <button onClick={handleClick}>Recargar</button>

      <section>
        {fact && <p>{fact}</p>}
        {imgCat && <img src={`${CAT_IMG_PRREFIX}${imgCat}`} alt={`Image generated using the first three words of ${fact}`} />}
      </section>

    </main>
  )
}
