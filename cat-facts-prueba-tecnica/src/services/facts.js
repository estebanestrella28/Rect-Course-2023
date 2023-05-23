const factURI = 'https://catfact.ninja/fact'

export const getFact = () => {
  return fetch(factURI)
    .then(res => res.json())
    .then(data => {
      const { fact } = data
      // console.log(fact)
      return fact
    })
}
