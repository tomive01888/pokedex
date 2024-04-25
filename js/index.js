import { fetchGenerationOne, getCardInfo } from "./fetchAPI.js"

const pokeFolder = document.querySelector("#pokelist")
const pokemon =  await fetchGenerationOne()

console.log("list of pokemon:", pokemon)

const allPokemons = pokemon.results

if(allPokemons.length > 0){
    for( let i = 0; i <allPokemons.length; i++){

        let pokemonURL = allPokemons[i].url

        const {sprite, type} = await getCardInfo(pokemonURL)

        console.log("res", type)

        pokeFolder.innerHTML += `<a class="pokecard" href="./pokemon/index.html?pokemon=${allPokemons[i].name}&index=${i}">
                                    <span class="index">${i+1} </span>
                                    <img src="${sprite}" alt="${allPokemons[i].name}">
                                    <p>${allPokemons[i].name}</p>
                                </a>`  

    }
}