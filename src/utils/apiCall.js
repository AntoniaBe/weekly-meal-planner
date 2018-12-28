
export function fetchRecipes (food = '') {
  return fetch(`https://api.edamam.com/search?q=${food}&app_id=a0697a0d&app_key=f0946cf1ba1a71c0ed601acd6f6bc910&from=0&to=25`)
    .then((res) => res.json())
    .then(({ hits }) => hits.map(({ recipe }) => recipe));
}
