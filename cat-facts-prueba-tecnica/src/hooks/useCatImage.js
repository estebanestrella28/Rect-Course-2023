import { getCatImg } from '../services/catImg'
import { useState, useEffect } from 'react'

const CAT_IMG_PRREFIX = 'https://cataas.com'

// para crear un customHook se crea una funcion con el prefijo "use"
export function useCatImage ({ fact }) {
  const [imgCat, setImgCat] = useState()

  // recuperar la imagen cada vez que la cita cambia
  useEffect(() => {
    if (!fact) return // si el fact es undefined no devuelve nada
    getCatImg({ fact }).then(newCatUrl => setImgCat(newCatUrl))
  }, [fact])
  return { imgCat: `${CAT_IMG_PRREFIX}${imgCat}` }
}
