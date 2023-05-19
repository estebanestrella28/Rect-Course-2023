import { useEffect, useState } from 'react'
import './App.css'
const factURI = 'https://catfact.ninja/fact'
const PREFIX = 'https://cataas.com'

export function App () {
  const [fact, setFact] = useState()
  const [imgCat, setImgCat] = useState()

  // trae el fact de la api
  useEffect(() => {
    fetch(factURI)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        console.log(fact)
        setFact(fact)
      })
  }, [])

  // recuperar la imagen cada vez que la cita cambia
  useEffect(() => {
    if (!fact) return // si el fact es undefined no devuelve nada

    const firstThreeWords = fact.split(' ').splice(1, 3).join(' ')

    // split separa un string en palabras y devuelve un array
    // splice delete elements of an array y devuelve los elementos eliminados
    // join junta los elementos de un array y devuelde una cadena de texto

    fetch(`https://cataas.com/cat/says/${firstThreeWords}?json=true`)
      .then(res => res.json())
      .then(data => {
        const { url } = data
        console.log(url)
        setImgCat(url)
      })
  }, [fact])

  return (
    <main>
      <h1> Cat Fact</h1>
      <button>Recargar</button>

      <section>
        {fact && <p>{fact}</p>}
        {imgCat && <img src={`${PREFIX}${imgCat}`} alt={`Image generated using the first three words of ${fact}`} />}
      </section>

    </main>
  )
}
