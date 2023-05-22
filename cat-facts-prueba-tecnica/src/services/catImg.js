
export const getCatImg = (fact) => {
  const firstThreeWords = fact.split(' ').splice(1, 3).join(' ')

  // split separa un string en palabras y devuelve un array
  // splice elimita elementos de un array y devuelve un array de los elementos eliminados
  // join junta los elementos de un array y devuelde una cadena de texto

  return fetch(`https://cataas.com/cat/says/${firstThreeWords}?json=true`)
    .then(res => res.json()) // .json recibe un JSON y devuelde un objeto de JavasScript
    .then(data => {
      const { url } = data
      console.log(url)
      return url
    })
}
