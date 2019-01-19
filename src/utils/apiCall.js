
export function fetchRecipes (food = '') {
  return fetch(`https://api.edamam.com/search?q=${food}&app_id=6af31f0f&app_key=9a49e659b05ab1956a3a9153d274a35e&from=0&to=5`)
    .then((res) => res.json())
    .then(({ hits }) => hits.map(({ recipe }) => recipe));
}
