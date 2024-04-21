const params = window.location.search
const urlSearchParams = new URLSearchParams(params)
const pokemon = urlSearchParams.get("pokemon")
const index = urlSearchParams.get("index")

console.log(pokemon)
console.log(index)