import './App.css'
import { useCatImage } from './hooks/useCatImage'
import { useCatFact } from './hooks/useCatFact'

export function App () {
  const { fact, getRandomFact } = useCatFact()
  const { imgCat } = useCatImage({ fact })

  const handleClick = () => {
    getRandomFact()
  }

  return (
    <main>
      <h1> Cat Fact</h1>
      <button onClick={handleClick}>Recargar</button>

      <section>
        {fact && <p>{fact}</p>}
        {imgCat && <img src={imgCat} alt={`Image generated using the first three words of ${fact}`} />}
      </section>

    </main>
  )
}
