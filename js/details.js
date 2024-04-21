import { fetchGenerationOne } from "./fetchAPI.js"

const heading = document.querySelector("h1")

const params = window.location.search
const urlSearchParams = new URLSearchParams(params)
const pokemon = urlSearchParams.get("pokemon")
const index = urlSearchParams.get("index")

// console.log(pokemon)
// console.log(index)

if(pokemon){
    heading.textContent = pokemon.toUpperCase()

    const details = await fetchGenerationOne(pokemon)

    console.log(details)
}